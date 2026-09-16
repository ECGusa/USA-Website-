import { useState, useEffect, useCallback } from 'react';
import {
  Branch,
  ServiceTime,
  Leader,
  Ministry,
  CellGroup,
  ChurchEvent,
  Sermon,
  Testimony,
  fetchBranch,
  fetchServiceTimes,
  fetchLeaders,
  fetchMinistries,
  fetchCellGroups,
  fetchEvents,
  fetchSermons,
  fetchTestimonies,
  DEFAULT_BRANCH,
  DEFAULT_SERVICE_TIMES,
  DEFAULT_LEADERS,
  DEFAULT_MINISTRIES,
} from '../lib/supabase';

export interface BranchData {
  branch: Branch;
  serviceTimes: ServiceTime[];
  leaders: Leader[];
  ministries: Ministry[];
  cellGroups: CellGroup[];
  events: ChurchEvent[];
  sermons: Sermon[];
  testimonies: Testimony[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useBranchData(slug: string): BranchData {
  const [branch, setBranch] = useState<Branch>(DEFAULT_BRANCH);
  const [serviceTimes, setServiceTimes] = useState<ServiceTime[]>(DEFAULT_SERVICE_TIMES);
  const [leaders, setLeaders] = useState<Leader[]>(DEFAULT_LEADERS);
  const [ministries, setMinistries] = useState<Ministry[]>(DEFAULT_MINISTRIES);
  const [cellGroups, setCellGroups] = useState<CellGroup[]>([]);
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadCounter, setReloadCounter] = useState(0);

  const refetch = useCallback(() => setReloadCounter((c) => c + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      setLoading(true);
      setError(null);

      try {
        const branchData = await fetchBranch(slug);
        if (cancelled) return;

        if (!branchData) {
          setError('Branch not found');
          setLoading(false);
          return;
        }

        setBranch(branchData);

        const [st, ld, mn, cg, ev, sr, ts] = await Promise.all([
          fetchServiceTimes(branchData.id),
          fetchLeaders(branchData.id),
          fetchMinistries(branchData.id),
          fetchCellGroups(branchData.id),
          fetchEvents(branchData.id),
          fetchSermons(branchData.id),
          fetchTestimonies(branchData.id),
        ]);

        if (cancelled) return;

        if (st.length > 0) setServiceTimes(st);
        if (ld.length > 0) setLeaders(ld);
        if (mn.length > 0) setMinistries(mn);
        setCellGroups(cg);
        setEvents(ev);
        setSermons(sr);
        setTestimonies(ts);
      } catch (err) {
        if (!cancelled) {
          setError('Unable to load branch data');
          console.error('Branch data load error:', err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadAll();

    return () => {
      cancelled = true;
    };
  }, [slug, reloadCounter]);

  return {
    branch,
    serviceTimes,
    leaders,
    ministries,
    cellGroups,
    events,
    sermons,
    testimonies,
    loading,
    error,
    refetch,
  };
}
