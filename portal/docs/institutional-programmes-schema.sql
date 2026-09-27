-- Proposed production schema for NIMENA institutional programmes.
-- Review against the approved rules before migration.

create type programme_kind as enum (
  'accreditation',
  'innovation',
  'magazine',
  'partnerships'
);

create type programme_submission_status as enum (
  'draft',
  'submitted',
  'administrative_screening',
  'evidence_requested',
  'specialist_review',
  'decision_pending',
  'approved',
  'declined',
  'published',
  'suspended',
  'closed'
);

create table programme_submissions (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  programme programme_kind not null,
  applicant_user_id uuid not null,
  organisation_name text,
  title text not null,
  public_summary text,
  confidential_summary text,
  status programme_submission_status not null default 'draft',
  criteria_version text not null,
  submitted_at timestamptz,
  decided_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table programme_documents (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references programme_submissions(id) on delete cascade,
  storage_key text not null,
  document_type text not null,
  original_name text not null,
  mime_type text not null,
  size_bytes bigint not null,
  checksum text not null,
  uploaded_by uuid not null,
  created_at timestamptz not null default now()
);

create table programme_reviews (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references programme_submissions(id) on delete cascade,
  reviewer_user_id uuid not null,
  review_type text not null,
  outcome text,
  notes text,
  conflict_declared boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table programme_decisions (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references programme_submissions(id) on delete cascade,
  decision text not null,
  scope text,
  conditions text,
  valid_from date,
  valid_until date,
  decided_by uuid not null,
  created_at timestamptz not null default now()
);

create table public_programme_entries (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique references programme_submissions(id),
  slug text not null unique,
  public_title text not null,
  public_summary text,
  recognition_scope text,
  valid_from date,
  valid_until date,
  publication_status text not null default 'draft',
  published_at timestamptz
);

create table programme_audit_events (
  id bigserial primary key,
  submission_id uuid not null references programme_submissions(id) on delete cascade,
  actor_user_id uuid not null,
  event_type text not null,
  previous_value jsonb,
  new_value jsonb,
  reason text,
  created_at timestamptz not null default now()
);

create index programme_submissions_queue_idx on programme_submissions (programme, status, created_at desc);
create index programme_documents_submission_idx on programme_documents (submission_id);
create index programme_reviews_submission_idx on programme_reviews (submission_id);
create index programme_audit_submission_idx on programme_audit_events (submission_id, created_at);
