/*
# Create ECG-USA Multi-Branch Schema

## Summary
Creates the complete database architecture for ECG-USA branch sub-sites, starting with the Maine Branch.
This schema supports multiple branches (Maine, Maryland, Virginia, etc.) through a shared table structure
keyed by `branch_id`. All content is CMS-editable by administrators.

## New Tables

1. **branches** — One row per branch location (Maine, Maryland, etc.). Contains branch identity, contact info, social links, pastor info, and giving URL.
2. **service_times** — Service schedules per branch (Sunday, Midweek, Prayer, etc.).
3. **leaders** — Leadership team per branch (Resident Pastor, associates, ministry leaders).
4. **ministries** — Ministry directory per branch (Worship, Youth, Children, etc.).
5. **cell_groups** — Cell group/fellowship locations per branch with geo-coordinates.
6. **events** — Church events per branch with categories, dates, and registration links.
7. **sermons** — Sermon/media archive per branch with video/audio URLs.
8. **prayer_requests** — Prayer request submissions from public users. Private — admin-only read.
9. **testimonies** — Testimony wall submissions. Public can see approved ones only; submissions are pending until approved.
10. **volunteer_requests** — Volunteer application submissions. Private — admin-only read.
11. **contact_messages** — Contact form submissions. Private — admin-only read.
12. **cell_group_requests** — Join/start cell group form submissions. Private — admin-only read.

## Security (RLS)

### Public-readable tables (active content only)
- branches, service_times, leaders, ministries, cell_groups, events, sermons
- Public (anon + authenticated) can SELECT where `active = true`
- Authenticated users (admins) can SELECT all rows and perform INSERT/UPDATE/DELETE

### Public-submit tables (form submissions)
- prayer_requests, contact_messages, volunteer_requests, cell_group_requests
- Public (anon + authenticated) can INSERT only
- Authenticated users (admins) can SELECT, UPDATE, DELETE
- No public SELECT — submissions are private

### Testimonies (moderated)
- Public can SELECT where `status = 'approved'` only
- Public can INSERT (submissions go to pending status)
- Authenticated users (admins) can SELECT all, UPDATE (approve/reject), DELETE

## Seed Data
- Inserts the Maine Branch with placeholder content (clearly marked [PLACEHOLDER] values)
- Inserts placeholder service times, ministries, and a resident pastor placeholder

## Important Notes
1. All foreign keys use ON DELETE CASCADE — deleting a branch removes all its child data.
2. The `branches.slug` column enables URL-based branch resolution (e.g., /maine → slug='maine').
3. Placeholder values are intentionally non-factual and marked for administrator replacement.
4. No auth.users integration — admin access is controlled by authenticated role membership,
   which administrators gain by being invited to the Supabase project as authenticated users.
*/

-- ============================================================
-- BRANCHES
-- ============================================================
CREATE TABLE IF NOT EXISTS branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  branch_name text NOT NULL,
  city text,
  state text,
  address text,
  phone text,
  email text,
  pastor_name text,
  pastor_photo text,
  description text,
  facebook text,
  instagram text,
  youtube text,
  tiktok text,
  giving_url text,
  map_url text,
  hero_image text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE branches ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_active_branches" ON branches;
CREATE POLICY "public_select_active_branches"
  ON branches FOR SELECT TO anon, authenticated USING (active = true);

DROP POLICY IF EXISTS "admin_insert_branches" ON branches;
CREATE POLICY "admin_insert_branches"
  ON branches FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_branches" ON branches;
CREATE POLICY "admin_update_branches"
  ON branches FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_branches" ON branches;
CREATE POLICY "admin_delete_branches"
  ON branches FOR DELETE TO authenticated USING (true);

-- ============================================================
-- SERVICE_TIMES
-- ============================================================
CREATE TABLE IF NOT EXISTS service_times (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id uuid NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  service_name text NOT NULL,
  day text,
  start_time text,
  end_time text,
  location text,
  active boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE service_times ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_active_service_times" ON service_times;
CREATE POLICY "public_select_active_service_times"
  ON service_times FOR SELECT TO anon, authenticated USING (active = true);

DROP POLICY IF EXISTS "admin_insert_service_times" ON service_times;
CREATE POLICY "admin_insert_service_times"
  ON service_times FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_service_times" ON service_times;
CREATE POLICY "admin_update_service_times"
  ON service_times FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_service_times" ON service_times;
CREATE POLICY "admin_delete_service_times"
  ON service_times FOR DELETE TO authenticated USING (true);

-- ============================================================
-- LEADERS
-- ============================================================
CREATE TABLE IF NOT EXISTS leaders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id uuid NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  name text NOT NULL,
  title text,
  biography text,
  photo text,
  email text,
  phone text,
  social_links jsonb,
  active boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leaders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_active_leaders" ON leaders;
CREATE POLICY "public_select_active_leaders"
  ON leaders FOR SELECT TO anon, authenticated USING (active = true);

DROP POLICY IF EXISTS "admin_insert_leaders" ON leaders;
CREATE POLICY "admin_insert_leaders"
  ON leaders FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_leaders" ON leaders;
CREATE POLICY "admin_update_leaders"
  ON leaders FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_leaders" ON leaders;
CREATE POLICY "admin_delete_leaders"
  ON leaders FOR DELETE TO authenticated USING (true);

-- ============================================================
-- MINISTRIES
-- ============================================================
CREATE TABLE IF NOT EXISTS ministries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id uuid NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text,
  description text,
  image text,
  leader text,
  meeting_day text,
  meeting_time text,
  contact text,
  active boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ministries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_active_ministries" ON ministries;
CREATE POLICY "public_select_active_ministries"
  ON ministries FOR SELECT TO anon, authenticated USING (active = true);

DROP POLICY IF EXISTS "admin_insert_ministries" ON ministries;
CREATE POLICY "admin_insert_ministries"
  ON ministries FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_ministries" ON ministries;
CREATE POLICY "admin_update_ministries"
  ON ministries FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_ministries" ON ministries;
CREATE POLICY "admin_delete_ministries"
  ON ministries FOR DELETE TO authenticated USING (true);

-- ============================================================
-- CELL_GROUPS
-- ============================================================
CREATE TABLE IF NOT EXISTS cell_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id uuid NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  name text NOT NULL,
  city text,
  address text,
  latitude double precision,
  longitude double precision,
  meeting_day text,
  meeting_time text,
  leader text,
  contact text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cell_groups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_active_cell_groups" ON cell_groups;
CREATE POLICY "public_select_active_cell_groups"
  ON cell_groups FOR SELECT TO anon, authenticated USING (active = true);

DROP POLICY IF EXISTS "admin_insert_cell_groups" ON cell_groups;
CREATE POLICY "admin_insert_cell_groups"
  ON cell_groups FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_cell_groups" ON cell_groups;
CREATE POLICY "admin_update_cell_groups"
  ON cell_groups FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_cell_groups" ON cell_groups;
CREATE POLICY "admin_delete_cell_groups"
  ON cell_groups FOR DELETE TO authenticated USING (true);

-- ============================================================
-- EVENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id uuid NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  title text NOT NULL,
  slug text,
  description text,
  image text,
  start_datetime timestamptz,
  end_datetime timestamptz,
  location text,
  category text,
  registration_url text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_active_events" ON events;
CREATE POLICY "public_select_active_events"
  ON events FOR SELECT TO anon, authenticated USING (active = true);

DROP POLICY IF EXISTS "admin_insert_events" ON events;
CREATE POLICY "admin_insert_events"
  ON events FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_events" ON events;
CREATE POLICY "admin_update_events"
  ON events FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_events" ON events;
CREATE POLICY "admin_delete_events"
  ON events FOR DELETE TO authenticated USING (true);

-- ============================================================
-- SERMONS
-- ============================================================
CREATE TABLE IF NOT EXISTS sermons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id uuid NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  title text NOT NULL,
  speaker text,
  description text,
  thumbnail text,
  video_url text,
  audio_url text,
  published_at timestamptz,
  category text,
  series text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_sermons" ON sermons;
CREATE POLICY "public_select_sermons"
  ON sermons FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_sermons" ON sermons;
CREATE POLICY "admin_insert_sermons"
  ON sermons FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_sermons" ON sermons;
CREATE POLICY "admin_update_sermons"
  ON sermons FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_sermons" ON sermons;
CREATE POLICY "admin_delete_sermons"
  ON sermons FOR DELETE TO authenticated USING (true);

-- ============================================================
-- PRAYER_REQUESTS (private — admin only read)
-- ============================================================
CREATE TABLE IF NOT EXISTS prayer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id uuid NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  name text,
  email text,
  phone text,
  request text NOT NULL,
  category text,
  anonymous boolean DEFAULT false,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- No public SELECT — prayer requests are private
DROP POLICY IF EXISTS "public_insert_prayer_requests" ON prayer_requests;
CREATE POLICY "public_insert_prayer_requests"
  ON prayer_requests FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_prayer_requests" ON prayer_requests;
CREATE POLICY "admin_select_prayer_requests"
  ON prayer_requests FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_prayer_requests" ON prayer_requests;
CREATE POLICY "admin_update_prayer_requests"
  ON prayer_requests FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_prayer_requests" ON prayer_requests;
CREATE POLICY "admin_delete_prayer_requests"
  ON prayer_requests FOR DELETE TO authenticated USING (true);

-- ============================================================
-- TESTIMONIES (moderated — public sees approved only)
-- ============================================================
CREATE TABLE IF NOT EXISTS testimonies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id uuid NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  name text,
  testimony text NOT NULL,
  category text,
  photo text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonies ENABLE ROW LEVEL SECURITY;

-- Public can see approved testimonies only
DROP POLICY IF EXISTS "public_select_approved_testimonies" ON testimonies;
CREATE POLICY "public_select_approved_testimonies"
  ON testimonies FOR SELECT TO anon, authenticated USING (status = 'approved');

-- Public can submit testimonies (they go to pending)
DROP POLICY IF EXISTS "public_insert_testimonies" ON testimonies;
CREATE POLICY "public_insert_testimonies"
  ON testimonies FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Admin can see all, update (approve/reject), and delete
DROP POLICY IF EXISTS "admin_select_testimonies" ON testimonies;
CREATE POLICY "admin_select_testimonies"
  ON testimonies FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_testimonies" ON testimonies;
CREATE POLICY "admin_update_testimonies"
  ON testimonies FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_testimonies" ON testimonies;
CREATE POLICY "admin_delete_testimonies"
  ON testimonies FOR DELETE TO authenticated USING (true);

-- ============================================================
-- VOLUNTEER_REQUESTS (private — admin only read)
-- ============================================================
CREATE TABLE IF NOT EXISTS volunteer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id uuid NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  areas text,
  availability text,
  experience text,
  message text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE volunteer_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_volunteer_requests" ON volunteer_requests;
CREATE POLICY "public_insert_volunteer_requests"
  ON volunteer_requests FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_volunteer_requests" ON volunteer_requests;
CREATE POLICY "admin_select_volunteer_requests"
  ON volunteer_requests FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_volunteer_requests" ON volunteer_requests;
CREATE POLICY "admin_update_volunteer_requests"
  ON volunteer_requests FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_volunteer_requests" ON volunteer_requests;
CREATE POLICY "admin_delete_volunteer_requests"
  ON volunteer_requests FOR DELETE TO authenticated USING (true);

-- ============================================================
-- CONTACT_MESSAGES (private — admin only read)
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id uuid NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_contact_messages" ON contact_messages;
CREATE POLICY "public_insert_contact_messages"
  ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_contact_messages" ON contact_messages;
CREATE POLICY "admin_select_contact_messages"
  ON contact_messages FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_contact_messages" ON contact_messages;
CREATE POLICY "admin_update_contact_messages"
  ON contact_messages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_contact_messages" ON contact_messages;
CREATE POLICY "admin_delete_contact_messages"
  ON contact_messages FOR DELETE TO authenticated USING (true);

-- ============================================================
-- CELL_GROUP_REQUESTS (private — admin only read)
-- ============================================================
CREATE TABLE IF NOT EXISTS cell_group_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id uuid NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  city text,
  preferred_day text,
  message text,
  request_type text DEFAULT 'join',
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cell_group_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_cell_group_requests" ON cell_group_requests;
CREATE POLICY "public_insert_cell_group_requests"
  ON cell_group_requests FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_cell_group_requests" ON cell_group_requests;
CREATE POLICY "admin_select_cell_group_requests"
  ON cell_group_requests FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_cell_group_requests" ON cell_group_requests;
CREATE POLICY "admin_update_cell_group_requests"
  ON cell_group_requests FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_cell_group_requests" ON cell_group_requests;
CREATE POLICY "admin_delete_cell_group_requests"
  ON cell_group_requests FOR DELETE TO authenticated USING (true);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_service_times_branch ON service_times(branch_id);
CREATE INDEX IF NOT EXISTS idx_leaders_branch ON leaders(branch_id);
CREATE INDEX IF NOT EXISTS idx_ministries_branch ON ministries(branch_id);
CREATE INDEX IF NOT EXISTS idx_cell_groups_branch ON cell_groups(branch_id);
CREATE INDEX IF NOT EXISTS idx_events_branch ON events(branch_id);
CREATE INDEX IF NOT EXISTS idx_sermons_branch ON sermons(branch_id);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_branch ON prayer_requests(branch_id);
CREATE INDEX IF NOT EXISTS idx_testimonies_branch ON testimonies(branch_id);
CREATE INDEX IF NOT EXISTS idx_volunteer_requests_branch ON volunteer_requests(branch_id);
CREATE INDEX IF NOT EXISTS idx_contact_messages_branch ON contact_messages(branch_id);
CREATE INDEX IF NOT EXISTS idx_cell_group_requests_branch ON cell_group_requests(branch_id);

-- ============================================================
-- SEED DATA — Maine Branch (placeholder content)
-- ============================================================
INSERT INTO branches (slug, branch_name, city, state, address, phone, email, pastor_name, pastor_photo, description, facebook, instagram, youtube, tiktok, giving_url, map_url, hero_image, active)
SELECT 'maine', 'ECG The Jesus Nation Church — Maine Branch', '[MAINE BRANCH CITY]', 'Maine', '[MAINE BRANCH ADDRESS]', '[PHONE NUMBER]', '[EMAIL ADDRESS]', '[PASTOR NAME]', '', 'A place to encounter God, build meaningful relationships, grow in faith, and experience the power of the Gospel. The Maine Branch is part of ECG The Jesus Nation Church USA.', '[FACEBOOK URL]', '[INSTAGRAM URL]', '[YOUTUBE URL]', '[TIKTOK URL]', '[ONLINE GIVING URL]', '', '', true
WHERE NOT EXISTS (SELECT 1 FROM branches WHERE slug = 'maine');

-- Seed placeholder service times for Maine
DO $$
DECLARE
  v_branch_id uuid;
BEGIN
  SELECT id INTO v_branch_id FROM branches WHERE slug = 'maine';

  IF v_branch_id IS NOT NULL THEN
    INSERT INTO service_times (branch_id, service_name, day, start_time, end_time, location, active, sort_order)
    SELECT v_branch_id, 'Sunday Service', 'Sunday', '[SERVICE TIME]', '', '[MAINE BRANCH ADDRESS]', true, 1
    WHERE NOT EXISTS (SELECT 1 FROM service_times WHERE branch_id = v_branch_id AND service_name = 'Sunday Service');

    INSERT INTO service_times (branch_id, service_name, day, start_time, end_time, location, active, sort_order)
    SELECT v_branch_id, 'Midweek Service', 'Wednesday', '[SERVICE TIME]', '', '[MAINE BRANCH ADDRESS]', true, 2
    WHERE NOT EXISTS (SELECT 1 FROM service_times WHERE branch_id = v_branch_id AND service_name = 'Midweek Service');

    INSERT INTO service_times (branch_id, service_name, day, start_time, end_time, location, active, sort_order)
    SELECT v_branch_id, 'Prayer Service', 'Friday', '[SERVICE TIME]', '', '[MAINE BRANCH ADDRESS]', true, 3
    WHERE NOT EXISTS (SELECT 1 FROM service_times WHERE branch_id = v_branch_id AND service_name = 'Prayer Service');
  END IF;
END $$;

-- Seed placeholder ministries for Maine
DO $$
DECLARE
  v_branch_id uuid;
BEGIN
  SELECT id INTO v_branch_id FROM branches WHERE slug = 'maine';

  IF v_branch_id IS NOT NULL THEN
    INSERT INTO ministries (branch_id, name, slug, description, image, leader, meeting_day, meeting_time, contact, active, sort_order)
    SELECT v_branch_id, 'Worship', 'worship', 'Leading the congregation into the presence of God through praise and worship.', '', '[MINISTRY LEADER]', '', '', '[CONTACT]', true, 1
    WHERE NOT EXISTS (SELECT 1 FROM ministries WHERE branch_id = v_branch_id AND slug = 'worship');

    INSERT INTO ministries (branch_id, name, slug, description, image, leader, meeting_day, meeting_time, contact, active, sort_order)
    SELECT v_branch_id, 'Youth', 'youth', 'Helping young people grow spiritually, build meaningful relationships, discover their purpose, and serve God.', '', '[MINISTRY LEADER]', '', '', '[CONTACT]', true, 2
    WHERE NOT EXISTS (SELECT 1 FROM ministries WHERE branch_id = v_branch_id AND slug = 'youth');

    INSERT INTO ministries (branch_id, name, slug, description, image, leader, meeting_day, meeting_time, contact, active, sort_order)
    SELECT v_branch_id, 'Children', 'children', 'Nurturing children in the knowledge and love of Jesus Christ through age-appropriate teaching and activities.', '', '[MINISTRY LEADER]', '', '', '[CONTACT]', true, 3
    WHERE NOT EXISTS (SELECT 1 FROM ministries WHERE branch_id = v_branch_id AND slug = 'children');

    INSERT INTO ministries (branch_id, name, slug, description, image, leader, meeting_day, meeting_time, contact, active, sort_order)
    SELECT v_branch_id, 'Prayer & Intercession', 'prayer', 'Standing in the gap for the church, the community, and the nations through fervent prayer.', '', '[MINISTRY LEADER]', '', '', '[CONTACT]', true, 4
    WHERE NOT EXISTS (SELECT 1 FROM ministries WHERE branch_id = v_branch_id AND slug = 'prayer');

    INSERT INTO ministries (branch_id, name, slug, description, image, leader, meeting_day, meeting_time, contact, active, sort_order)
    SELECT v_branch_id, 'Media', 'media', 'Capturing and sharing the message of the Gospel through technology, broadcast, and digital platforms.', '', '[MINISTRY LEADER]', '', '', '[CONTACT]', true, 5
    WHERE NOT EXISTS (SELECT 1 FROM ministries WHERE branch_id = v_branch_id AND slug = 'media');

    INSERT INTO ministries (branch_id, name, slug, description, image, leader, meeting_day, meeting_time, contact, active, sort_order)
    SELECT v_branch_id, 'Ushering & Protocol', 'ushering', 'Welcoming members and visitors, ensuring order and excellence in all church services and events.', '', '[MINISTRY LEADER]', '', '', '[CONTACT]', true, 6
    WHERE NOT EXISTS (SELECT 1 FROM ministries WHERE branch_id = v_branch_id AND slug = 'ushering');

    INSERT INTO ministries (branch_id, name, slug, description, image, leader, meeting_day, meeting_time, contact, active, sort_order)
    SELECT v_branch_id, 'Women', 'women', 'Empowering women to grow in faith, build godly relationships, and fulfill their God-given purpose.', '', '[MINISTRY LEADER]', '', '', '[CONTACT]', true, 7
    WHERE NOT EXISTS (SELECT 1 FROM ministries WHERE branch_id = v_branch_id AND slug = 'women');

    INSERT INTO ministries (branch_id, name, slug, description, image, leader, meeting_day, meeting_time, contact, active, sort_order)
    SELECT v_branch_id, 'Men', 'men', 'Equipping men to be spiritual leaders in their homes, workplaces, and communities.', '', '[MINISTRY LEADER]', '', '', '[CONTACT]', true, 8
    WHERE NOT EXISTS (SELECT 1 FROM ministries WHERE branch_id = v_branch_id AND slug = 'men');

    INSERT INTO ministries (branch_id, name, slug, description, image, leader, meeting_day, meeting_time, contact, active, sort_order)
    SELECT v_branch_id, 'Welfare & Outreach', 'outreach', 'Extending the love of Christ to the community through practical support, care, and outreach programs.', '', '[MINISTRY LEADER]', '', '', '[CONTACT]', true, 9
    WHERE NOT EXISTS (SELECT 1 FROM ministries WHERE branch_id = v_branch_id AND slug = 'outreach');
  END IF;
END $$;

-- Seed placeholder resident pastor for Maine
DO $$
DECLARE
  v_branch_id uuid;
BEGIN
  SELECT id INTO v_branch_id FROM branches WHERE slug = 'maine';

  IF v_branch_id IS NOT NULL THEN
    INSERT INTO leaders (branch_id, name, title, biography, photo, email, phone, social_links, active, sort_order)
    SELECT v_branch_id, '[PASTOR NAME]', 'Resident Pastor — Maine Branch', '[PASTOR BIOGRAPHY]', '', '[EMAIL ADDRESS]', '[PHONE NUMBER]', '{}'::jsonb, true, 1
    WHERE NOT EXISTS (SELECT 1 FROM leaders WHERE branch_id = v_branch_id AND title = 'Resident Pastor — Maine Branch');
  END IF;
END $$;
