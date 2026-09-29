-- NIMENA scholarly services: proposed PostgreSQL extension.
-- Apply after phase-1-schema.sql. This portal schema references OJS records
-- but deliberately does not store journal manuscripts or peer-review reports.

create type conference_status as enum (
  'draft', 'announced', 'registration_open', 'registration_closed',
  'in_progress', 'completed', 'cancelled', 'archived'
);

create type conference_submission_status as enum (
  'draft', 'submitted', 'administrative_screening', 'corrections_requested',
  'reviewer_assignment', 'under_review', 'revision_requested',
  'decision_pending', 'accepted_presentation', 'accepted_poster',
  'rejected', 'withdrawn'
);

create type conference_registration_status as enum (
  'pending_payment', 'registered', 'cancelled', 'refunded', 'attended', 'no_show'
);

create table research_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  orcid text unique,
  primary_affiliation text,
  position_title text,
  biography text,
  research_interests text[] not null default '{}',
  reviewer_available boolean not null default false,
  profile_visibility text not null default 'private',
  updated_at timestamptz not null default now()
);

create table ojs_account_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  ojs_base_url text not null,
  ojs_user_id text not null,
  matched_email citext,
  matched_orcid text,
  verification_method text not null,
  verified_at timestamptz not null,
  revoked_at timestamptz,
  unique (ojs_base_url, ojs_user_id),
  unique (user_id, ojs_base_url)
);

create table ojs_submission_summaries (
  id uuid primary key default gen_random_uuid(),
  ojs_account_link_id uuid not null references ojs_account_links(id) on delete cascade,
  ojs_submission_id text not null,
  journal_code text not null,
  title text not null,
  public_status_label text not null,
  ojs_record_url text not null,
  source_updated_at timestamptz,
  synced_at timestamptz not null default now(),
  unique (ojs_account_link_id, ojs_submission_id)
);

create table reviewer_activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  source_system text not null,
  source_reference text not null,
  activity_date date not null,
  activity_type text not null,
  verified_hours numeric(5,2) check (verified_hours >= 0),
  verification_state text not null default 'pending',
  verified_by uuid references users(id),
  verified_at timestamptz,
  unique (source_system, source_reference, user_id)
);

create table conference_events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  public_summary text,
  status conference_status not null default 'draft',
  timezone text not null default 'Africa/Lagos',
  starts_at timestamptz,
  ends_at timestamptz,
  venue_name text,
  venue_address text,
  delivery_mode text not null,
  registration_opens_at timestamptz,
  registration_closes_at timestamptz,
  cfp_opens_at timestamptz,
  cfp_closes_at timestamptz,
  created_by uuid not null references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or starts_at is null or ends_at >= starts_at)
);

create table conference_tracks (
  id uuid primary key default gen_random_uuid(),
  conference_id uuid not null references conference_events(id) on delete cascade,
  code text not null,
  name text not null,
  description text,
  chair_user_id uuid references users(id),
  review_rubric jsonb not null default '{}'::jsonb,
  unique (conference_id, code)
);

create table conference_fee_rules (
  id uuid primary key default gen_random_uuid(),
  conference_id uuid not null references conference_events(id) on delete cascade,
  category text not null,
  currency char(3) not null default 'NGN',
  amount_minor bigint not null check (amount_minor >= 0),
  starts_at timestamptz,
  ends_at timestamptz,
  eligibility_rule jsonb not null default '{}'::jsonb,
  unique (conference_id, category, starts_at)
);

create table conference_registrations (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  conference_id uuid not null references conference_events(id),
  user_id uuid references users(id),
  attendee_name text not null,
  attendee_email citext not null,
  organization text,
  category text not null,
  status conference_registration_status not null default 'pending_payment',
  fee_rule_id uuid references conference_fee_rules(id),
  consent_version text not null,
  consented_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (conference_id, attendee_email)
);

create table conference_payments (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null references conference_registrations(id),
  provider text not null,
  provider_reference text not null unique,
  currency char(3) not null,
  amount_minor bigint not null check (amount_minor >= 0),
  status payment_status not null default 'pending',
  provider_event_id text unique,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table conference_submissions (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  conference_id uuid not null references conference_events(id),
  track_id uuid not null references conference_tracks(id),
  submitting_user_id uuid references users(id),
  corresponding_email citext not null,
  submission_type text not null,
  title text not null,
  abstract_text text not null,
  keywords text[] not null default '{}',
  status conference_submission_status not null default 'draft',
  current_version integer not null default 1 check (current_version > 0),
  originality_declared_at timestamptz,
  conflicts_text text,
  ai_use_text text,
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table conference_submission_authors (
  submission_id uuid not null references conference_submissions(id) on delete cascade,
  author_order smallint not null check (author_order > 0),
  full_name text not null,
  email citext,
  affiliation text,
  orcid text,
  is_corresponding boolean not null default false,
  primary key (submission_id, author_order)
);

create table conference_submission_files (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references conference_submissions(id) on delete cascade,
  version integer not null,
  purpose text not null,
  storage_key text not null unique,
  original_filename text not null,
  media_type text not null,
  byte_size bigint not null check (byte_size > 0),
  sha256 text not null,
  uploaded_at timestamptz not null default now()
);

create table conference_reviews (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references conference_submissions(id) on delete cascade,
  reviewer_user_id uuid not null references users(id),
  assigned_by uuid not null references users(id),
  rubric_version text not null,
  conflict_declared boolean not null default false,
  scores jsonb not null default '{}'::jsonb,
  confidential_comments text,
  author_comments text,
  recommendation text,
  due_at timestamptz,
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  unique (submission_id, reviewer_user_id)
);

create table conference_decisions (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references conference_submissions(id),
  decision conference_submission_status not null,
  decision_letter text not null,
  decided_by uuid not null references users(id),
  decided_at timestamptz not null default now()
);

create table conference_sessions (
  id uuid primary key default gen_random_uuid(),
  conference_id uuid not null references conference_events(id) on delete cascade,
  track_id uuid references conference_tracks(id),
  title text not null,
  room text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  chair_user_id uuid references users(id),
  check (ends_at > starts_at)
);

create table conference_presentations (
  session_id uuid not null references conference_sessions(id) on delete cascade,
  submission_id uuid not null unique references conference_submissions(id),
  presentation_order smallint not null check (presentation_order > 0),
  primary key (session_id, presentation_order)
);

create table conference_checkins (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null references conference_registrations(id) on delete cascade,
  session_id uuid references conference_sessions(id),
  token_hash text not null unique,
  checked_in_at timestamptz not null default now(),
  checked_in_by uuid references users(id),
  unique (registration_id, session_id)
);

create table conference_certificates (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null unique references conference_registrations(id),
  certificate_number text not null unique,
  certificate_type text not null,
  approved_hours numeric(5,2) check (approved_hours >= 0),
  issued_by uuid not null references users(id),
  issued_at timestamptz not null default now(),
  revoked_at timestamptz,
  revocation_reason text
);

create table scholarly_audit_events (
  id bigint generated always as identity primary key,
  actor_user_id uuid references users(id),
  entity_type text not null,
  entity_id uuid not null,
  event_type text not null,
  previous_value jsonb,
  new_value jsonb,
  reason text,
  occurred_at timestamptz not null default now()
);

create index ojs_submission_user_idx on ojs_submission_summaries (ojs_account_link_id, synced_at desc);
create index reviewer_activity_user_idx on reviewer_activity (user_id, activity_date desc);
create index conference_registration_queue_idx on conference_registrations (conference_id, status, created_at desc);
create index conference_submission_queue_idx on conference_submissions (conference_id, status, updated_at desc);
create index conference_review_queue_idx on conference_reviews (reviewer_user_id, submitted_at, due_at);
create index scholarly_audit_entity_idx on scholarly_audit_events (entity_type, entity_id, occurred_at);
