'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useComments, usePost } from '@/hooks/usePosts';
import { Skeleton } from '@/components/ui/skeleton';
import { use } from "react";
import { formatString } from '@/lib/utils';
import PostDetailSkeleton from '@/components/ui/skeleton-loaders/post-detail-skeleton';

export default function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const postId = parseInt(slug);

    const { post, loading: postLoading } = usePost(postId);
    const { comments, loading } = useComments(postId);

    if (!post || loading || postLoading) return (
        <PostDetailSkeleton />
    );

    return (
        <Card className="
    mb-8 w-full rounded-xl border shadow-lg backdrop-blur-[1px]
    dark:bg-[rgba(20,30,48,0.6)] dark:border-gray-800 dark:shadow-black/50
    bg-[rgba(226,232,240,0.5)] border-gray-300 shadow-gray-400/50
">
            <CardHeader>
                <CardTitle className="font-bold text-2xl 
                    dark:text-[#3de537] text-gray-900">
                    {formatString(post.title, Infinity)}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg 
                    dark:text-gray-300 text-gray-700">
                    {post.body}
                </p>

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
                            {comments.map(comment => (
                                <Card key={comment.id} className="
                                    rounded-xl shadow-md border
                                    dark:bg-[#191919] dark:border-gray-700 dark:shadow-black/50
                                    bg-white border-gray-300 shadow-gray-300/50
                                ">
                                    <CardContent className="pt-6">
                                        <h3 className="font-semibold text-lg 
                                            dark:text-[#00FFA3] text-gray-900">
                                            {formatString(comment.name, Infinity)}
                                        </h3>
                                        <p className="text-sm 
                                            dark:text-gray-500 text-gray-600">
                                            {comment.email}
                                        </p>
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