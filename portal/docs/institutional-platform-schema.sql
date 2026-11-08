-- NIMENA connected institutional platform
-- PostgreSQL blueprint. Apply only after NIMENA approves roles, fees, grades,
-- public-verification fields, retention rules and production identity controls.

create extension if not exists pgcrypto;

create type membership_standing as enum ('applicant', 'active', 'grace', 'inactive', 'suspended', 'retired', 'deceased');
create type workflow_state as enum ('draft', 'submitted', 'screening', 'review', 'correction_required', 'decision_pending', 'approved', 'declined', 'withdrawn', 'closed');
create type payment_state as enum ('pending', 'verified', 'failed', 'refunded', 'reversed');

create table if not exists membership_grades (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  rank_label text,
  annual_fee_minor bigint not null default 0 check (annual_fee_minor >= 0),
  currency char(3) not null default 'NGN',
  eligibility_rules jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists chapters (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  region text,
  status text not null default 'active',
  public_email text,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  user_id text unique,
  member_number text not null unique,
  full_name text not null,
  post_nominals text,
  grade_id uuid not null references membership_grades(id),
  chapter_id uuid references chapters(id),
  standing membership_standing not null default 'applicant',
  admitted_on date,
  valid_through date,
  public_profile_enabled boolean not null default false,
  public_degrees jsonb not null default '[]'::jsonb,
  public_disciplines jsonb not null default '[]'::jsonb,
  public_accomplishments jsonb not null default '[]'::jsonb,
  private_profile jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists members_verification_lookup on members (member_number, standing, public_profile_enabled);

create table if not exists member_verification_events (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references members(id),
  requested_member_number_hash text not null,
  result text not null check (result in ('verified', 'not_found', 'not_public', 'rate_limited')),
  request_ip_hash text,
  user_agent_hash text,
  created_at timestamptz not null default now()
);

create table if not exists renewal_cycles (
  id uuid primary key default gen_random_uuid(),
  label text not null unique,
  starts_on date not null,
  ends_on date not null,
  grace_ends_on date,
  active boolean not null default false
);

create table if not exists renewals (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id),
  cycle_id uuid not null references renewal_cycles(id),
  state workflow_state not null default 'draft',
  dues_minor bigint not null check (dues_minor >= 0),
  arrears_minor bigint not null default 0 check (arrears_minor >= 0),
  discount_minor bigint not null default 0 check (discount_minor >= 0),
  submitted_at timestamptz,
  verified_at timestamptz,
  unique (member_id, cycle_id)
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  payer_user_id text,
  purpose_type text not null,
  purpose_id uuid not null,
  provider text not null,
  provider_reference text not null unique,
  amount_minor bigint not null check (amount_minor >= 0),
  currency char(3) not null default 'NGN',
  state payment_state not null default 'pending',
  verified_payload jsonb,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists committees (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  committee_type text not null,
  mandate text,
  status text not null default 'active'
);

create table if not exists community_memberships (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id),
  community_type text not null check (community_type in ('chapter', 'student_chapter', 'young_professionals', 'committee')),
  community_id uuid not null,
  role text not null default 'member',
  starts_on date not null default current_date,
  ends_on date,
  unique (member_id, community_type, community_id, starts_on)
);

create table if not exists learning_offerings (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  delivery_format text not null,
  level text,
  starts_at timestamptz,
  ends_at timestamptz,
  cpd_hours numeric(6,2) not null default 0,
  member_fee_minor bigint not null default 0,
  non_member_fee_minor bigint not null default 0,
  state workflow_state not null default 'draft',
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists learning_enrolments (
  id uuid primary key default gen_random_uuid(),
  offering_id uuid not null references learning_offerings(id),
  member_id uuid references members(id),
  attendee_email text not null,
  payment_id uuid references payments(id),
  attendance_verified_at timestamptz,
  assessment_score numeric(5,2),
  cpd_hours_awarded numeric(6,2),
  certificate_number text unique,
  state workflow_state not null default 'submitted',
  created_at timestamptz not null default now()
);

create table if not exists conferences (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  venue text,
  state workflow_state not null default 'draft',
  submission_opens_at timestamptz,
  submission_closes_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists conference_submissions (
  id uuid primary key default gen_random_uuid(),
  conference_id uuid not null references conferences(id),
  submitter_user_id text,
  reference text not null unique,
  title text not null,
  track text not null,
  abstract text not null,
  authors jsonb not null default '[]'::jsonb,
  declarations jsonb not null default '{}'::jsonb,
  state workflow_state not null default 'submitted',
  created_at timestamptz not null default now()
);

create table if not exists conference_reviews (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references conference_submissions(id),
  reviewer_user_id text not null,
  conflict_declared boolean not null default false,
  scores jsonb not null default '{}'::jsonb,
  recommendation text,
  submitted_at timestamptz,
  unique (submission_id, reviewer_user_id)
);

create table if not exists technical_resources (
  id uuid primary key default gen_random_uuid(),
  document_number text unique,
  title text not null,
  resource_type text not null,
  topic text,
  publication_year integer,
  access_level text not null check (access_level in ('public', 'member', 'restricted')),
  external_url text,
  storage_key text,
  metadata jsonb not null default '{}'::jsonb,
  published_at timestamptz
);

create table if not exists recognition_programmes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  programme_type text not null,
  eligibility_rules jsonb not null default '{}'::jsonb,
  opens_at timestamptz,
  closes_at timestamptz,
  state workflow_state not null default 'draft'
);

create table if not exists recognition_applications (
  id uuid primary key default gen_random_uuid(),
  programme_id uuid not null references recognition_programmes(id),
  applicant_user_id text not null,
  nominee_member_id uuid references members(id),
  reference text not null unique,
  statement text not null,
  evidence jsonb not null default '[]'::jsonb,
  conflicts jsonb not null default '[]'::jsonb,
  state workflow_state not null default 'draft',
  created_at timestamptz not null default now()
);

create table if not exists career_opportunities (
  id uuid primary key default gen_random_uuid(),
  organisation text not null,
  title text not null,
  opportunity_type text not null,
  location text,
  description text not null,
  apply_url text,
  closes_at timestamptz,
  moderation_state workflow_state not null default 'screening',
  published_at timestamptz
);

create table if not exists mentoring_requests (
  id uuid primary key default gen_random_uuid(),
  mentee_member_id uuid not null references members(id),
  mentor_member_id uuid references members(id),
  goals jsonb not null default '[]'::jsonb,
  preferences jsonb not null default '{}'::jsonb,
  state workflow_state not null default 'submitted',
  created_at timestamptz not null default now()
);

create table if not exists partner_organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  affiliate_type text not null,
  tier text,
  public_profile jsonb not null default '{}'::jsonb,
  agreement_starts_on date,
  agreement_ends_on date,
  state workflow_state not null default 'screening'
);

create table if not exists sponsorship_proposals (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid references partner_organisations(id),
  reference text not null unique,
  objective text not null,
  contribution text not null,
  benefits jsonb not null default '[]'::jsonb,
  safeguards jsonb not null default '[]'::jsonb,
  state workflow_state not null default 'draft',
  created_at timestamptz not null default now()
);

create table if not exists governance_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  version text not null,
  effective_on date,
  approved_by text,
  storage_key text,
  public boolean not null default true,
  supersedes_id uuid references governance_documents(id),
  published_at timestamptz,
  unique (title, version)
);

create table if not exists secretariat_contacts (
  id uuid primary key default gen_random_uuid(),
  role_title text not null,
  responsibility text not null,
  public_email text not null,
  display_order integer not null default 0,
  active boolean not null default true
);

create table if not exists ojs_identity_links (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id),
  ojs_user_id text not null,
  orcid text,
  last_synced_at timestamptz,
  sync_state text not null default 'pending',
  unique (member_id, ojs_user_id)
);

create table if not exists audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_user_id text,
  actor_role text,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  before_state jsonb,
  after_state jsonb,
  request_id text,
  occurred_at timestamptz not null default now()
);

create index if not exists audit_entity_lookup on audit_events (entity_type, entity_id, occurred_at desc);

-- Production rules to enforce in the application and database policies:
-- 1. The public verification endpoint must read only consented public fields.
-- 2. Every protected mutation must re-check role and scope on the server.
-- 3. Payment state changes only after signed provider webhook verification.
-- 4. OJS remains authoritative for journal submissions and peer-review records.
-- 5. Files are private by default and delivered with expiring signed URLs.
