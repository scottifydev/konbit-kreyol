-- KÒD LA — initial schema (06-engineering.md §2)
-- Ready to apply when the Supabase project exists (open gate: Scott,
-- 00-START-HERE.md §5). Law-level contracts encoded here:
--   * RLS scoped to the family; a boy writes only his own rows
--   * gm_queue has NO write path into ledger tables (GM law 1)
--   * audio buckets are private — signed access only (voice law 6)

-- ---------- profiles ----------
create table profiles (
  id text primary key,                -- 'leo' | 'isaac' | 'manman' | 'gm' | ...
  auth_user uuid references auth.users (id),
  name text not null,
  role text not null,                 -- kid-facing role label only (copy law 3)
  kind text not null check (kind in ('boy', 'adult')),
  color text not null,
  band text,                          -- course size; renders only in the boy's own settings
  diag_done boolean not null default false,
  pwo_mode boolean not null default false,
  xp integer not null default 0,
  streak integer not null default 0,
  last_day integer not null default 0
);

-- ---------- scope ----------
create table scope_items (
  id text primary key,                -- the Kreyòl form
  en text not null,
  unit integer not null,
  kle boolean not null default false,
  productive_core boolean not null default false,
  cat text not null default 'word',
  pending boolean not null default false  -- amendment batch awaiting Manman
);

create table tiers (
  profile_id text references profiles (id),
  item_id text references scope_items (id),
  tier text not null check (tier in ('A', 'B', 'C')),
  primary key (profile_id, item_id)
);

-- ---------- the two ledgers (mastery is DERIVED, never stored) ----------
create table ledger_events (
  id bigint generated always as identity primary key,
  profile_id text not null references profiles (id),
  item_id text not null references scope_items (id),
  mode text not null check (mode in ('rec', 'prod')),
  ok boolean not null,
  day integer not null,
  source text not null,               -- 'feed' | 'fokis' | 'mon' | 'dispatch' | ...
  dispatch_id text                    -- set when source = 'dispatch' (idempotency)
);
create unique index ledger_dispatch_once
  on ledger_events (dispatch_id, profile_id, item_id, mode)
  where dispatch_id is not null;      -- one dispatch credits once per direction

create table ledger_state (
  profile_id text not null references profiles (id),
  item_id text not null references scope_items (id),
  mode text not null check (mode in ('rec', 'prod')),
  box integer not null default 0 check (box between 0 and 3),
  due integer not null default 1,
  primary key (profile_id, item_id, mode)
);

-- ---------- ui strings + certification (the Cipher Office) ----------
create table ui_strings (
  key text primary key,
  en text not null,
  ht text,                            -- null = open Manman ticket
  tw integer not null,                -- computed taught-unit; 0 = logo; 8 = immersion
  needs_review boolean not null default true
);

create table certifications (
  key text primary key,               -- namespaced: ui:*, post:*, kanpay:*, unit:*
  certified boolean not null default true,
  certified_by text references profiles (id),
  certified_at timestamptz not null default now()
);

-- ---------- content ----------
create table posts (
  id text primary key,
  data jsonb not null,                -- segments, glosses, items[], tag, unit
  needs_review boolean not null default true,
  author text references profiles (id)
);

create table kanpay (
  chapter integer primary key,
  data jsonb not null                 -- scenes, checks, anthem slot, intel beats
);

create table memwa (
  id text primary key,
  data jsonb not null,
  opt_in_required boolean not null default true,
  facts_verified boolean not null default false
);

-- ---------- dispatches (the spine) ----------
create table dispatches (
  id text primary key,
  sender text not null references profiles (id),
  receiver text not null references profiles (id),
  prompt_id text not null,
  target_items text[] not null,
  audio_path text not null,           -- storage: dispatches/ bucket (private)
  status text not null default 'sent'
    check (status in ('sent', 'delivered', 'acted', 'garbled')),
  credited boolean not null default false,
  created_day integer not null,
  check_data jsonb not null,          -- question/options/answer; answer NEVER sent to clients
  commendation text
);

create table dispatch_replies (
  id bigint generated always as identity primary key,
  dispatch_id text not null references dispatches (id),
  from_profile text not null references profiles (id),
  audio_path text not null            -- adult voice reply, recast style
);

-- ---------- GM queue: narrative only, NO ledger references (GM law 1) ----------
create table gm_queue (
  id bigint generated always as identity primary key,
  kind text not null check (kind in ('dispatch', 'intel', 'event', 'commendation', 'anthem_drop')),
  payload jsonb not null,
  author text not null references profiles (id),
  needs_review boolean not null default true,   -- adult Kreyòl != Manman queues too
  fire_at_boundary text,              -- async only: 'session' | 'scene' | 'milestone'
  fired boolean not null default false
);
-- GM LAW 1, enforced structurally: gm_queue carries no foreign keys into
-- ledger_events/ledger_state, and no trigger may bridge them. Reviewers:
-- reject any migration that adds one.

-- ---------- konbit (shared state) ----------
create table konbit (
  id integer primary key default 1 check (id = 1),
  streak integer not null default 0,
  last_day integer not null default 0,
  stars integer not null default 0,
  padon integer not null default 1,
  mon jsonb not null                  -- unit, threshold, legs {done,score,tip}, summited
);

create table missions (
  unit integer primary key,
  data jsonb not null,
  stars integer,
  done boolean not null default false
);

create table media (
  id text primary key,
  data jsonb not null,                -- link (never hosted), rung, story keys
  vetted boolean not null default false
);

-- ---------- RLS: the family boundary ----------
alter table profiles enable row level security;
alter table scope_items enable row level security;
alter table tiers enable row level security;
alter table ledger_events enable row level security;
alter table ledger_state enable row level security;
alter table ui_strings enable row level security;
alter table certifications enable row level security;
alter table posts enable row level security;
alter table kanpay enable row level security;
alter table memwa enable row level security;
alter table dispatches enable row level security;
alter table dispatch_replies enable row level security;
alter table gm_queue enable row level security;
alter table konbit enable row level security;
alter table missions enable row level security;
alter table media enable row level security;

create function my_profile() returns text language sql stable as $$
  select id from profiles where auth_user = auth.uid()
$$;

create function is_adult() returns boolean language sql stable as $$
  select exists (
    select 1 from profiles where auth_user = auth.uid() and kind = 'adult'
  )
$$;

-- everyone in the family reads shared surfaces
create policy family_read on profiles for select using (auth.uid() is not null);
create policy family_read on scope_items for select using (auth.uid() is not null);
create policy family_read on ui_strings for select using (auth.uid() is not null);
create policy family_read on certifications for select using (auth.uid() is not null);
create policy family_read on posts for select using (auth.uid() is not null);
create policy family_read on kanpay for select using (auth.uid() is not null);
create policy family_read on konbit for select using (auth.uid() is not null);
create policy family_read on missions for select using (auth.uid() is not null);
create policy family_read on media for select using (auth.uid() is not null);
create policy family_read on dispatches for select using (auth.uid() is not null);
create policy family_read on dispatch_replies for select using (auth.uid() is not null);

-- a boy writes only his own ledger rows and his own dispatches
create policy own_ledger_events on ledger_events
  for insert with check (profile_id = my_profile());
create policy own_ledger_state on ledger_state
  for all using (profile_id = my_profile()) with check (profile_id = my_profile());
create policy own_tiers_read on tiers for select using (auth.uid() is not null);
create policy send_own_dispatch on dispatches
  for insert with check (sender = my_profile());

-- adults only: certification, GM queue, replies, media vetting, mission stars
create policy adults_certify on certifications
  for all using (is_adult()) with check (is_adult());
create policy adults_gm on gm_queue
  for all using (is_adult()) with check (is_adult());
create policy adults_reply on dispatch_replies
  for insert with check (is_adult() and from_profile = my_profile());
create policy adults_media on media
  for all using (is_adult()) with check (is_adult());
create policy adults_missions on missions
  for all using (is_adult()) with check (is_adult());
create policy adults_memwa on memwa for select using (auth.uid() is not null);

-- storage buckets (created via dashboard/CLI): 'dispatches', 'family-audio'
-- both PRIVATE; access via signed URLs only; family export + delete
-- supported ("stays in the family" — voice law 6).
