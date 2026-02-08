import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, Briefcase } from 'lucide-react';
import { AnimatedPage } from '../components/motion/AnimatedPage';
import { PageContainer } from '../components/layout/PageContainer';
import { SectionHeader } from '../components/layout/SectionHeader';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { TabsSegmented } from '../components/ui/TabsSegmented';
import { AnimatedTabContent } from '../components/motion/AnimatedTabContent';
import { EmptyStateCard } from '../components/ui/EmptyStateCard';
import { SkeletonCard } from '../components/ui/SkeletonCard';
import { discoverApi, type DiscoverClub } from '../services/discoverApi';

const filterTabs = [
  { key: 'all', label: 'All Clubs' },
  { key: 'recruiting', label: 'Recruiting' },
  { key: 'most_roles', label: 'Most Roles' },
];

export function Landing() {
  const [clubs, setClubs] = useState<DiscoverClub[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    discoverApi.listClubs()
      .then(setClubs)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = clubs
    .filter((club) => {
      const q = search.toLowerCase();
      const matchesSearch =
        club.name.toLowerCase().includes(q) ||
        club.description.toLowerCase().includes(q);
      if (filter === 'recruiting') return matchesSearch && club.isRecruiting;
      return matchesSearch;
    })
    .sort((a, b) => {
      if (filter === 'most_roles') return b.openRoleCount - a.openRoleCount;
      return 0;
    });

  return (
    <AnimatedPage>
      <PageContainer>
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-600 mb-4">
            <Sparkles size={14} />
            Discover your community at McGill
          </div>
          <h1 className="text-3xl font-bold text-warmGray-900 sm:text-4xl">
            Find clubs recruiting{' '}
            <span className="bg-gradient-to-r from-cozy-400 to-brand-400 bg-clip-text text-transparent">
              right now
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-warmGray-500">
            Browse McGill&apos;s tech clubs, explore open positions, and apply to join teams that match your interests.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-warmGray-400" />
            <Input
              placeholder="Search clubs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <TabsSegmented tabs={filterTabs} active={filter} onChange={setFilter} />
        </div>

        <SectionHeader
          title="Clubs"
          subtitle={loading ? 'Loading...' : `${filtered.length} club${filtered.length !== 1 ? 's' : ''} found`}
          className="mb-6"
        />

        <AnimatedTabContent activeKey={filter}>
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyStateCard emoji="🔍" title="No clubs found" description="Try adjusting your search or filters." />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((club) => (
                <Link key={club._id} to={`/clubs/${club._id}`}>
                  <Card hover className="h-full">
                    <CardContent>
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-calm-100 text-lg font-bold text-brand-600">
                          {club.name.charAt(0)}
                        </div>
                        {club.isRecruiting && <Badge variant="success">Recruiting</Badge>}
                      </div>
                      <h3 className="font-semibold text-warmGray-800">{club.name}</h3>
                      <p className="mt-1 text-sm text-warmGray-500 line-clamp-2">{club.description}</p>
                      {club.openRoleCount > 0 && (
                        <div className="mt-3 flex items-center gap-1 text-xs text-warmGray-400">
                          <Briefcase size={14} />
                          {club.openRoleCount} open role{club.openRoleCount !== 1 ? 's' : ''}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </AnimatedTabContent>
      </PageContainer>
    </AnimatedPage>
  );
}
