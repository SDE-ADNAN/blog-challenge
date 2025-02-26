'use client';

import { use } from "react";
import { toast } from 'sonner';

import { useComments, usePost } from '@/hooks/usePosts';
import { formatString } from '@/lib/utils';

import PostDetailSkeleton from '@/components/ui/skeleton-loaders/post-detail-skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function PostDetail({ params }: { params: Promise<{ slug: string }> }) {

    // Extracts the 'slug' parameter from the promise using the 'use' hook
    const { slug } = use(params);
    // Converts the slug (which is a string) into an integer representing the post ID
    const postId = parseInt(slug);

    // Fetches the post data and its loading state
    const { post, loading: postLoading } = usePost(postId);
    // Fetches the comments data and its loading state
    const { comments, loading } = useComments(postId);

    // Displays a loading skeleton if the post data or comments are still loading
    if (!post || loading || postLoading) return (
        <PostDetailSkeleton />
    );

    return (
        <Card className="
    mb-8 w-full rounded-xl border shadow-lg backdrop-blur-[1px]
    dark:bg-[rgba(20,30,48,0.6)] dark:border-gray-800 dark:shadow-black/50
    bg-[rgba(226,232,240,0.5)] border-gray-300 shadow-gray-400/50
">
            {/* Post Title */}
            <CardHeader>
                <CardTitle className="font-bold text-2xl 
                    dark:text-[#3de537] text-gray-900">
                    {formatString(post.title, Infinity)}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Post Content */}
                <p className="text-lg 
                    dark:text-gray-300 text-gray-700">
                    {post.body}
                </p>

                {/* Share Post Button */}
                <Button
                    onClick={() => toast("✅ Copied to clipboard! 🎉")}
                    className="mt-4 transition-all px-6 rounded-[4px] py-2
                        dark:bg-[#FF4C29] dark:hover:bg-[#FF6A3D] dark:text-white
                        bg-[#1E88E5] hover:bg-[#1976D2] text-white"
                >
                    Share Post
                </Button>

                {/* Comments Section */}
                <div className="mt-8 space-y-6">
                    <h2 className="text-2xl font-semibold 
                        dark:text-[#FFB400] text-[#E65100]">
                        Comments
                    </h2>

                    {/* Loading State for Comments */}
                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-4 w-1/2 dark:bg-gray-700 bg-gray-200" />
                                    <Skeleton className="h-4 w-full dark:bg-gray-700 bg-gray-200" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6" data-testid="comments-section'">
                            {/* Renders a list of comments */}
                            {comments.map(comment => (
                                <Card key={comment.id} className="
                                    rounded-xl shadow-md border
                                    dark:bg-[#191919] dark:border-gray-700 dark:shadow-black/50
                                    bg-white border-gray-300 shadow-gray-300/50
                                ">
                                    <CardContent className="pt-6">
                                        {/* Commenter Name */}
                                        <h3 className="font-semibold text-lg 
                                            dark:text-[#00FFA3] text-gray-900">
                                            {formatString(comment.name, Infinity)}
                                        </h3>
                                        {/* Commenter Email */}
                                        <p className="text-sm 
                                            dark:text-gray-500 text-gray-600">
                                            {comment.email}
                                        </p>
                                        {/* Comment Body */}
                                        <p className="mt-2 
                                            dark:text-gray-300 text-gray-700 ml-3">
                                            {comment.body}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
