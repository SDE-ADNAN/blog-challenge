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
      <div className="fixed top-0 left-0 z-10 p-3 border-b w-full backdrop-blur-[4px]">
        <h1 className="text-4xl font-bold">Blog Sphere</h1>
      </div>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 items-stretch pt-[2.063rem]">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}