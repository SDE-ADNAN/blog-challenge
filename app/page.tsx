'use client';

import { usePosts } from '@/hooks/usePosts';

import { AuroraText } from '@/components/magicui/aurora-text';
import PostCard from '@/components/ui/post-card';
import PostGridSkeleton from '@/components/ui/skeleton-loaders/post-grid-skeleton';

export default function Home() {
  const { posts, loading } = usePosts();

  if (loading) {
    return (
      <PostGridSkeleton />
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold md:text-5xl lg:text-7xl sm:my-20 lg:my-32 text-center">
        All <br></br><AuroraText>Top Curated</AuroraText> <br /> Blog Posts
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </>
  );
}