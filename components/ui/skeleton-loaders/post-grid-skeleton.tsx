'use client';

import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const PostCardSkeleton = () => {
    return (
        <Card className="backdrop-blur-[2px] flex flex-col h-full">
            {/* Image placeholder */}
            <div className="relative h-48 overflow-hidden">
                <Skeleton className="absolute inset-0 w-full h-full rounded-t-lg dark:bg-gray-700 bg-gray-200" />
            </div>

            <CardHeader className="flex-grow flex flex-col">
                {/* Title placeholder */}
                <Skeleton className="h-6 w-3/4 dark:bg-gray-700 bg-gray-200 mb-2" />

                {/* Description placeholder - multiple lines */}
                <div className="mt-auto space-y-2">
                    <Skeleton className="h-4 w-full dark:bg-gray-700 bg-gray-200" />
                    <Skeleton className="h-4 w-full dark:bg-gray-700 bg-gray-200" />
                    <Skeleton className="h-4 w-4/5 dark:bg-gray-700 bg-gray-200" />
                </div>
            </CardHeader>
        </Card>
    );
};

export default function PostGridSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            {[...Array(6)].map((_, i) => (
                <PostCardSkeleton key={i} />
            ))}
        </div>
    );
}