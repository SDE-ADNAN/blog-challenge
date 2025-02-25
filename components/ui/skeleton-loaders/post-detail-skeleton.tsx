'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function PostDetailSkeleton() {
    return (
        <Card className="
      mb-8 w-full rounded-xl border shadow-lg backdrop-blur-xl
      dark:bg-gradient-to-b dark:from-[#141E30] dark:via-[#243B55] dark:to-[#101010] dark:border-gray-800 dark:shadow-black/50
      bg-gradient-to-b from-[#E2E8F0] via-[#CBD5E1] to-[#F1F5F9] border-gray-300 shadow-gray-400/50
    ">
            <CardHeader>
                {/* Post Title Skeleton */}
                <Skeleton className="h-8 w-3/4 dark:bg-gray-700 bg-gray-200" />
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Post Body Skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full dark:bg-gray-700 bg-gray-200" />
                    <Skeleton className="h-4 w-full dark:bg-gray-700 bg-gray-200" />
                    <Skeleton className="h-4 w-5/6 dark:bg-gray-700 bg-gray-200" />
                    <Skeleton className="h-4 w-4/6 dark:bg-gray-700 bg-gray-200" />
                </div>

                {/* Share Button Skeleton */}
                <Skeleton className="h-10 w-32 dark:bg-gray-700 bg-gray-200 rounded-[4px]" />

                {/* Comments Section */}
                <div className="mt-8 space-y-6">
                    {/* Comments Title Skeleton */}
                    <Skeleton className="h-7 w-40 dark:bg-gray-700 bg-gray-200" />

                    {/* Comments List */}
                    <div className="space-y-6">
                        {[...Array(5)].map((_, i) => (
                            <Card key={i} className="
                rounded-xl shadow-md border
                dark:bg-[#191919] dark:border-gray-700 dark:shadow-black/50
                bg-white border-gray-300 shadow-gray-300/50
              ">
                                <CardContent className="pt-6 space-y-4">
                                    {/* Comment Name */}
                                    <Skeleton className="h-5 w-1/3 dark:bg-gray-700 bg-gray-200" />

                                    {/* Comment Email */}
                                    <Skeleton className="h-4 w-1/4 dark:bg-gray-700 bg-gray-200" />

                                    {/* Comment Body */}
                                    <div className="space-y-2 ml-3">
                                        <Skeleton className="h-4 w-full dark:bg-gray-700 bg-gray-200" />
                                        <Skeleton className="h-4 w-5/6 dark:bg-gray-700 bg-gray-200" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}