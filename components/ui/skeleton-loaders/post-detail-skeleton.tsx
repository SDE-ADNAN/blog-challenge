'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function PostDetailSkeleton() {
    return (
        // Main container for the post skeleton structure
        <div role="article" data-testid="post-detail-skeleton">
            <Card
                className="
                    mb-8 w-full rounded-xl border shadow-lg backdrop-blur-xl
                    dark:bg-gradient-to-b dark:from-[#141E30] dark:via-[#243B55] dark:to-[#101010] dark:border-gray-800 dark:shadow-black/50
                    bg-gradient-to-b from-[#E2E8F0] via-[#CBD5E1] to-[#F1F5F9] border-gray-300 shadow-gray-400/50
                "
            >
                <CardHeader>
                    {/* Post Title Skeleton */}
                    <Skeleton data-testid="skeleton" className="h-8 w-3/4 dark:bg-gray-700 bg-gray-200" />
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Post Body Skeleton - Simulating multiple lines of text */}
                    <div className="space-y-2">
                        <Skeleton data-testid="skeleton" className="h-4 w-full dark:bg-gray-700 bg-gray-200" />
                        <Skeleton data-testid="skeleton" className="h-4 w-full dark:bg-gray-700 bg-gray-200" />
                        <Skeleton data-testid="skeleton" className="h-4 w-5/6 dark:bg-gray-700 bg-gray-200" />
                        <Skeleton data-testid="skeleton" className="h-4 w-4/6 dark:bg-gray-700 bg-gray-200" />
                    </div>

                    {/* Share Button Skeleton - Simulating a button */}
                    <Skeleton data-testid="skeleton" className="h-10 w-32 dark:bg-gray-700 bg-gray-200 rounded-[4px]" />

                    {/* Comments Section Skeleton */}
                    <div className="mt-8 space-y-6" data-testid="comments-section">
                        {/* Comments Title Skeleton */}
                        <Skeleton data-testid="skeleton" className="h-7 w-40 dark:bg-gray-700 bg-gray-200" />

                        {/* List of Comment Skeletons */}
                        <div className="space-y-6">
                            {[...Array(5)].map((_, i) => (
                                <Card
                                    key={i}
                                    className="
                                        rounded-xl shadow-md border
                                        dark:bg-[#191919] dark:border-gray-700 dark:shadow-black/50
                                        bg-white border-gray-300 shadow-gray-300/50
                                    "
                                    role="article"
                                    data-testid="comment-skeleton"
                                >
                                    <CardContent className="pt-6 space-y-4">
                                        {/* Comment Author Name Skeleton */}
                                        <Skeleton data-testid="skeleton" className="h-5 w-1/3 dark:bg-gray-700 bg-gray-200" />

                                        {/* Comment Email Skeleton */}
                                        <Skeleton data-testid="skeleton" className="h-4 w-1/4 dark:bg-gray-700 bg-gray-200" />

                                        {/* Comment Body Skeleton - Simulating multiple lines of text */}
                                        <div className="space-y-2 ml-3">
                                            <Skeleton data-testid="skeleton" className="h-4 w-full dark:bg-gray-700 bg-gray-200" />
                                            <Skeleton data-testid="skeleton" className="h-4 w-5/6 dark:bg-gray-700 bg-gray-200" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}