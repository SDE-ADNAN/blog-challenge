'use server';

import { fetchPosts } from '@/actions';
import PostCard from '@/components/ui/post-card';
import PostGridSkeleton from '@/components/ui/skeleton-loaders/post-grid-skeleton';

export default async function Home() {
  // Fetch posts from the server
  const { posts, error } = await fetchPosts();

  if (error) {
    return <p className="text-red-500">Error fetching posts.</p>;
  }

  return (
    <>
      {/* Page title with AuroraText */}
      <h1 className="text-4xl font-bold md:text-5xl lg:text-7xl sm:my-20 lg:my-32 text-center">
        All <br />
        <span className='text-blue-400'>Top Curated</span>
        <br /> Blog Posts
      </h1>

      {/* Grid layout for displaying fetched blog posts */}
      {posts.length === 0 ? (
        <PostGridSkeleton />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      )}
    </>
  );
}
