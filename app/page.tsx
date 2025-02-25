'use client';

import PostCard from '@/components/ui/PostCard';
import { Skeleton } from '@/components/ui/skeleton';
import { usePosts } from '@/hooks/usePosts';

export default function Home() {
  const { posts, loading } = usePosts();

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Blog Sphere</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}