'use client';

// Importing the custom hook to fetch posts
import { usePosts } from '@/hooks/usePosts';

// Importing components
import { AuroraText } from '@/components/magicui/aurora-text';
import PostCard from '@/components/ui/post-card';
import PostGridSkeleton from '@/components/ui/skeleton-loaders/post-grid-skeleton';
import { useEffect, useState } from 'react';

export default function Home() {
  // Fetch posts using the custom hook
  const { posts, loading } = usePosts();

  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setShowText(true);
  }, []);

  return (
    <>
      {/* Page title with dynamic styling using AuroraText */}
      <h1 className="text-4xl font-bold md:text-5xl lg:text-7xl sm:my-20 lg:my-32 text-center">
        All <br />
        {showText ? <AuroraText>Top Curated</AuroraText> : "Top Curated"}
        <br /> Blog Posts
      </h1>

      {/* Grid layout for displaying fetched blog posts */}
      {loading ? <PostGridSkeleton /> : <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {posts.map((post, index) => (
          // Rendering each post inside PostCard component
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </div>}

    </>
  );
}