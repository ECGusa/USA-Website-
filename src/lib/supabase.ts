import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Database features will not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// ---- Types ----

export interface Branch {
  id: string;
  slug: string;
  branch_name: string;
  city: string | null;
  state: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  pastor_name: string | null;
  pastor_photo: string | null;
  description: string | null;
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
  tiktok: string | null;
  giving_url: string | null;
  map_url: string | null;
  hero_image: string | null;
  active: boolean;
}

export interface ServiceTime {
  id: string;
  branch_id: string;
  service_name: string;
  day: string | null;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  active: boolean;
  sort_order: number;
}

export interface Leader {
  id: string;
  branch_id: string;
  name: string;
  title: string | null;
  biography: string | null;
  photo: string | null;
  email: string | null;
  phone: string | null;
  social_links: Record<string, string> | null;
  active: boolean;
  sort_order: number;
}

export interface Ministry {
  id: string;
  branch_id: string;
  name: string;
  slug: string | null;
  description: string | null;
  image: string | null;
  leader: string | null;
  meeting_day: string | null;
  meeting_time: string | null;
  contact: string | null;
  active: boolean;
  sort_order: number;
}

export interface CellGroup {
  id: string;
  branch_id: string;
  name: string;
  city: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  meeting_day: string | null;
  meeting_time: string | null;
  leader: string | null;
  contact: string | null;
  active: boolean;
}

export interface ChurchEvent {
  id: string;
  branch_id: string;
  title: string;
  slug: string | null;
  description: string | null;
  image: string | null;
  start_datetime: string | null;
  end_datetime: string | null;
  location: string | null;
  category: string | null;
  registration_url: string | null;
  active: boolean;
}

export interface Sermon {
  id: string;
  branch_id: string;
  title: string;
  speaker: string | null;
  description: string | null;
  thumbnail: string | null;
  video_url: string | null;
  audio_url: string | null;
  published_at: string | null;
  category: string | null;
  series: string | null;
}

export interface Testimony {
  id: string;
  branch_id: string;
  name: string | null;
  testimony: string;
  category: string | null;
  photo: string | null;
  status: string;
  created_at: string;
}

// ---- Data Fetching Helpers ----

export async function fetchBranch(slug: string): Promise<Branch | null> {
  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .maybeSingle();
  if (error) {
    console.error('Error fetching branch:', error);
    return null;
  }
  return data as Branch | null;
}

export async function fetchServiceTimes(branchId: string): Promise<ServiceTime[]> {
  const { data, error } = await supabase
    .from('service_times')
    .select('*')
    .eq('branch_id', branchId)
    .eq('active', true)
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('Error fetching service times:', error);
    return [];
  }
  return (data as ServiceTime[]) || [];
}

export async function fetchLeaders(branchId: string): Promise<Leader[]> {
  const { data, error } = await supabase
    .from('leaders')
    .select('*')
    .eq('branch_id', branchId)
    .eq('active', true)
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('Error fetching leaders:', error);
    return [];
  }
  return (data as Leader[]) || [];
}

export async function fetchMinistries(branchId: string): Promise<Ministry[]> {
  const { data, error } = await supabase
    .from('ministries')
    .select('*')
    .eq('branch_id', branchId)
    .eq('active', true)
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('Error fetching ministries:', error);
    return [];
  }
  return (data as Ministry[]) || [];
}

export async function fetchCellGroups(branchId: string): Promise<CellGroup[]> {
  const { data, error } = await supabase
    .from('cell_groups')
    .select('*')
    .eq('branch_id', branchId)
    .eq('active', true)
    .order('name', { ascending: true });
  if (error) {
    console.error('Error fetching cell groups:', error);
    return [];
  }
  return (data as CellGroup[]) || [];
}

export async function fetchEvents(branchId: string): Promise<ChurchEvent[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('branch_id', branchId)
    .eq('active', true)
    .order('start_datetime', { ascending: true });
  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  return (data as ChurchEvent[]) || [];
}

export async function fetchSermons(branchId: string, limit?: number): Promise<Sermon[]> {
  let query = supabase
    .from('sermons')
    .select('*')
    .eq('branch_id', branchId)
    .order('published_at', { ascending: false });
  if (limit) {
    query = query.limit(limit);
  }
  const { data, error } = await query;
  if (error) {
    console.error('Error fetching sermons:', error);
    return [];
  }
  return (data as Sermon[]) || [];
}

export async function fetchTestimonies(branchId: string): Promise<Testimony[]> {
  const { data, error } = await supabase
    .from('testimonies')
    .select('*')
    .eq('branch_id', branchId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching testimonies:', error);
    return [];
  }
  return (data as Testimony[]) || [];
}

// ---- Default/Fallback Branch Data ----
// Used when Supabase is unreachable or no data exists yet.

export const DEFAULT_BRANCH: Branch = {
  id: 'maine-default',
  slug: 'maine',
  branch_name: 'ECG The Jesus Nation Church — Maine Branch',
  city: '[MAINE BRANCH CITY]',
  state: 'Maine',
  address: '[MAINE BRANCH ADDRESS]',
  phone: '[PHONE NUMBER]',
  email: '[EMAIL ADDRESS]',
  pastor_name: '[PASTOR NAME]',
  pastor_photo: '',
  description:
    'A place to encounter God, build meaningful relationships, grow in faith, and experience the power of the Gospel. The Maine Branch is part of ECG The Jesus Nation Church USA.',
  facebook: '[FACEBOOK URL]',
  instagram: '[INSTAGRAM URL]',
  youtube: '[YOUTUBE URL]',
  tiktok: '[TIKTOK URL]',
  giving_url: '[ONLINE GIVING URL]',
  map_url: '',
  hero_image: '',
  active: true,
};

export const DEFAULT_SERVICE_TIMES: ServiceTime[] = [
  { id: 'st1', branch_id: 'maine-default', service_name: 'Sunday Service', day: 'Sunday', start_time: '[SERVICE TIME]', end_time: '', location: '[MAINE BRANCH ADDRESS]', active: true, sort_order: 1 },
  { id: 'st2', branch_id: 'maine-default', service_name: 'Midweek Service', day: 'Wednesday', start_time: '[SERVICE TIME]', end_time: '', location: '[MAINE BRANCH ADDRESS]', active: true, sort_order: 2 },
  { id: 'st3', branch_id: 'maine-default', service_name: 'Prayer Service', day: 'Friday', start_time: '[SERVICE TIME]', end_time: '', location: '[MAINE BRANCH ADDRESS]', active: true, sort_order: 3 },
];

export const DEFAULT_MINISTRIES: Ministry[] = [
  { id: 'm1', branch_id: 'maine-default', name: 'Worship', slug: 'worship', description: 'Leading the congregation into the presence of God through praise and worship.', image: '', leader: '[MINISTRY LEADER]', meeting_day: '', meeting_time: '', contact: '[CONTACT]', active: true, sort_order: 1 },
  { id: 'm2', branch_id: 'maine-default', name: 'Youth', slug: 'youth', description: 'Helping young people grow spiritually, build meaningful relationships, discover their purpose, and serve God.', image: '', leader: '[MINISTRY LEADER]', meeting_day: '', meeting_time: '', contact: '[CONTACT]', active: true, sort_order: 2 },
  { id: 'm3', branch_id: 'maine-default', name: 'Children', slug: 'children', description: 'Nurturing children in the knowledge and love of Jesus Christ through age-appropriate teaching and activities.', image: '', leader: '[MINISTRY LEADER]', meeting_day: '', meeting_time: '', contact: '[CONTACT]', active: true, sort_order: 3 },
  { id: 'm4', branch_id: 'maine-default', name: 'Prayer & Intercession', slug: 'prayer', description: 'Standing in the gap for the church, the community, and the nations through fervent prayer.', image: '', leader: '[MINISTRY LEADER]', meeting_day: '', meeting_time: '', contact: '[CONTACT]', active: true, sort_order: 4 },
  { id: 'm5', branch_id: 'maine-default', name: 'Media', slug: 'media', description: 'Capturing and sharing the message of the Gospel through technology, broadcast, and digital platforms.', image: '', leader: '[MINISTRY LEADER]', meeting_day: '', meeting_time: '', contact: '[CONTACT]', active: true, sort_order: 5 },
  { id: 'm6', branch_id: 'maine-default', name: 'Ushering & Protocol', slug: 'ushering', description: 'Welcoming members and visitors, ensuring order and excellence in all church services and events.', image: '', leader: '[MINISTRY LEADER]', meeting_day: '', meeting_time: '', contact: '[CONTACT]', active: true, sort_order: 6 },
  { id: 'm7', branch_id: 'maine-default', name: 'Women', slug: 'women', description: 'Empowering women to grow in faith, build godly relationships, and fulfill their God-given purpose.', image: '', leader: '[MINISTRY LEADER]', meeting_day: '', meeting_time: '', contact: '[CONTACT]', active: true, sort_order: 7 },
  { id: 'm8', branch_id: 'maine-default', name: 'Men', slug: 'men', description: 'Equipping men to be spiritual leaders in their homes, workplaces, and communities.', image: '', leader: '[MINISTRY LEADER]', meeting_day: '', meeting_time: '', contact: '[CONTACT]', active: true, sort_order: 8 },
  { id: 'm9', branch_id: 'maine-default', name: 'Welfare & Outreach', slug: 'outreach', description: 'Extending the love of Christ to the community through practical support, care, and outreach programs.', image: '', leader: '[MINISTRY LEADER]', meeting_day: '', meeting_time: '', contact: '[CONTACT]', active: true, sort_order: 9 },
];

export const DEFAULT_LEADERS: Leader[] = [
  { id: 'l1', branch_id: 'maine-default', name: '[PASTOR NAME]', title: 'Resident Pastor — Maine Branch', biography: '[PASTOR BIOGRAPHY]', photo: '', email: '[EMAIL ADDRESS]', phone: '[PHONE NUMBER]', social_links: null, active: true, sort_order: 1 },
];
