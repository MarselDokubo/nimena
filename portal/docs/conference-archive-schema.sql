-- NIMENA Conference Archive: proposed production PostgreSQL schema
-- Design draft only. Confirm rights, storage and publishing authority before migrations.

create type archive_asset_kind as enum (
  'photo',
  'video',
  'audio',
  'programme',
  'presentation',
  'proceedings',
  'other_document'
);

create type archive_publication_status as enum (
  'draft',
  'rights_review',
  'approved',
  'published',
  'restricted',
  'withdrawn'
);

create table archive_collections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  edition text,
  theme text,
  starts_on date,
  ends_on date,
  location text,
  summary text,
  cover_asset_id uuid,
  source_reference text,
  status archive_publication_status not null default 'draft',
  published_at timestamptz,
  created_by uuid not null references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table archive_assets (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid not null references archive_collections(id) on delete cascade,
  kind archive_asset_kind not null,
  title text not null,
  caption text,
  captured_at timestamptz,
  source_name text,
  credit_line text,
  rights_basis text,
  external_source_url text,
  master_storage_key text unique,
  public_storage_key text unique,
  thumbnail_storage_key text unique,
  media_type text,
  byte_size bigint check (byte_size is null or byte_size > 0),
  width integer check (width is null or width > 0),
  height integer check (height is null or height > 0),
  duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
  sha256 text,
  status archive_publication_status not null default 'draft',
  sort_order integer not null default 0,
  published_at timestamptz,
  created_by uuid not null references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table archive_collections
  add constraint archive_collections_cover_asset_fk
  foreign key (cover_asset_id) references archive_assets(id) deferrable initially deferred;

create table archive_asset_people (
  asset_id uuid not null references archive_assets(id) on delete cascade,
  display_name text not null,
  role_or_affiliation text,
  sort_order integer not null default 0,
  primary key (asset_id, display_name)
);

create table archive_events (
  id bigint generated always as identity primary key,
  collection_id uuid references archive_collections(id) on delete cascade,
  asset_id uuid references archive_assets(id) on delete cascade,
  actor_user_id uuid references users(id),
  action text not null,
  reason text,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now(),
  check (num_nonnulls(collection_id, asset_id) >= 1)
);

create index archive_collections_public_idx
  on archive_collections (status, starts_on desc);
create index archive_assets_collection_idx
  on archive_assets (collection_id, status, sort_order, captured_at);
create index archive_events_collection_idx
  on archive_events (collection_id, occurred_at);
