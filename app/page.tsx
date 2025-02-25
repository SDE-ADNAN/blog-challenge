'use client';

import PostCard from '@/components/ui/PostCard';
import PostGridSkeleton from '@/components/ui/skeleton-loaders/post-grid-skeleton';
import { usePosts } from '@/hooks/usePosts';

export default function Home() {
  const { posts, loading } = usePosts();

  if (loading) {
    return (
      <PostGridSkeleton />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-stretch">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}