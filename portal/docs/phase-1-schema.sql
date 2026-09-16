-- NIMENA Member Services: proposed Phase 1 PostgreSQL schema
-- Design draft only. Confirm grade rules, fees, workflow authority and retention
-- before turning this into production migrations.

create extension if not exists citext;
create extension if not exists pgcrypto;

create type account_role as enum (
  'applicant',
  'member',
  'membership_officer',
  'committee_reviewer',
  'council_approver',
  'finance_officer',
  'system_admin'
);

create type application_status as enum (
  'draft',
  'submitted',
  'under_review',
  'corrections_requested',
  'committee_review',
  'council_consideration',
  'approved',
  'rejected',
  'withdrawn'
);

create type document_status as enum (
  'pending',
  'verified',
  'replacement_requested',
  'rejected'
);

create type membership_status as enum (
  'pending_activation',
  'active',
  'grace_period',
  'lapsed',
  'suspended',
  'resigned',
  'deceased'
);

create type invoice_status as enum (
  'draft',
  'issued',
  'part_paid',
  'paid',
  'void',
  'overdue'
);

create type payment_status as enum (
  'pending',
  'succeeded',
  'failed',
  'reversed',
  'refunded'
);

create table users (
  id uuid primary key default gen_random_uuid(),
  auth_subject text not null unique,
  email citext not null unique,
  display_name text not null,
  email_verified_at timestamptz,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table user_roles (
  user_id uuid not null references users(id) on delete cascade,
  role account_role not null,
  granted_by uuid references users(id),
  granted_at timestamptz not null default now(),
  revoked_at timestamptz,
  primary key (user_id, role)
);

create table chapters (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table membership_grades (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null unique,
  is_organization_grade boolean not null default false,
  eligibility_text text,
  required_documents jsonb not null default '[]'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table person_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  surname text not null,
  other_names text not null,
  telephone text,
  date_of_birth date,
  sex text,
  nationality text,
  permanent_address text,
  public_directory_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table organizations (
  id uuid primary key default gen_random_uuid(),
  legal_name text not null,
  registration_number text,
  email citext,
  telephone text,
  address text,
  representative_user_id uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create sequence membership_application_reference_seq start 1;

create table membership_applications (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default (
    'NIM-' || extract(year from now())::int || '-' ||
    lpad(nextval('membership_application_reference_seq')::text, 6, '0')
  ),
  applicant_user_id uuid not null references users(id),
  organization_id uuid references organizations(id),
  grade_id uuid not null references membership_grades(id),
  chapter_id uuid references chapters(id),
  status application_status not null default 'draft',
  version integer not null default 1 check (version > 0),
  assigned_to uuid references users(id),
  submitted_at timestamptz,
  decided_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- A deferred constraint trigger should enforce that organization_id is present
-- only when the selected grade has is_organization_grade = true.

create table engineering_registrations (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references membership_applications(id) on delete cascade,
  council_name text not null,
  registration_number text,
  created_at timestamptz not null default now()
);

create table professional_memberships (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references membership_applications(id) on delete cascade,
  body_name text not null,
  membership_type text,
  membership_number text,
  effective_date date,
  created_at timestamptz not null default now()
);

create table qualifications (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references membership_applications(id) on delete cascade,
  institution text not null,
  qualification text not null,
  course text,
  award_year integer check (award_year between 1900 and 2200),
  created_at timestamptz not null default now()
);

create table employment_history (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references membership_applications(id) on delete cascade,
  employer text not null,
  position_rank text,
  projects text,
  started_on date,
  ended_on date,
  created_at timestamptz not null default now(),
  check (ended_on is null or started_on is null or ended_on >= started_on)
);

create table application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references membership_applications(id) on delete cascade,
  purpose text not null,
  original_filename text not null,
  storage_key text not null unique,
  media_type text not null,
  byte_size bigint not null check (byte_size > 0),
  sha256 text not null,
  status document_status not null default 'pending',
  reviewed_by uuid references users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table application_declarations (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references membership_applications(id) on delete cascade,
  application_version integer not null,
  declaration_version text not null,
  declaration_text text not null,
  accepted_by uuid not null references users(id),
  accepted_at timestamptz not null,
  unique (application_id, application_version)
);

create table application_reviews (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references membership_applications(id) on delete cascade,
  stage application_status not null,
  reviewer_id uuid not null references users(id),
  recommendation text,
  checklist jsonb not null default '{}'::jsonb,
  internal_notes text,
  applicant_message text,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table application_events (
  id bigint generated always as identity primary key,
  application_id uuid not null references membership_applications(id) on delete cascade,
  actor_user_id uuid references users(id),
  event_type text not null,
  from_status application_status,
  to_status application_status,
  reason text,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table memberships (
  id uuid primary key default gen_random_uuid(),
  membership_number text not null unique,
  member_user_id uuid references users(id),
  organization_id uuid references organizations(id),
  source_application_id uuid not null unique references membership_applications(id),
  grade_id uuid not null references membership_grades(id),
  chapter_id uuid references chapters(id),
  status membership_status not null default 'pending_activation',
  admitted_on date not null,
  current_period_ends_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (num_nonnulls(member_user_id, organization_id) = 1)
);

create table invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  membership_id uuid references memberships(id),
  application_id uuid references membership_applications(id),
  purpose text not null,
  currency char(3) not null default 'NGN',
  amount_minor bigint not null check (amount_minor >= 0),
  status invoice_status not null default 'draft',
  due_on date,
  issued_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  check (num_nonnulls(membership_id, application_id) = 1)
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices(id),
  provider text not null,
  provider_reference text not null,
  idempotency_key text not null unique,
  currency char(3) not null,
  amount_minor bigint not null check (amount_minor >= 0),
  status payment_status not null default 'pending',
  provider_payload jsonb not null default '{}'::jsonb,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  unique (provider, provider_reference)
);

create table audit_events (
  id bigint generated always as identity primary key,
  actor_user_id uuid references users(id),
  action text not null,
  entity_type text not null,
  entity_id text not null,
  before_state jsonb,
  after_state jsonb,
  request_id text,
  ip_hash text,
  occurred_at timestamptz not null default now()
);

create index membership_applications_queue_idx
  on membership_applications (status, created_at);
create index membership_applications_applicant_idx
  on membership_applications (applicant_user_id, created_at desc);
create index application_documents_application_idx
  on application_documents (application_id, status);
create index application_events_timeline_idx
  on application_events (application_id, occurred_at);
create index memberships_status_idx
  on memberships (status, current_period_ends_on);
create index invoices_status_idx
  on invoices (status, due_on);
create index audit_events_entity_idx
  on audit_events (entity_type, entity_id, occurred_at);

-- Production migrations must add:
-- 1. an updated_at trigger;
-- 2. a deferred trigger for individual versus organization applications;
-- 3. transition guards for application and membership states;
-- 4. row-level security policies tied to the chosen authentication provider;
-- 5. protection preventing UPDATE or DELETE on audit_events;
-- 6. seed data only after NIMENA confirms grades, chapters and fee rules.
