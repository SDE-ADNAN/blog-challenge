'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useComments, usePosts } from '@/hooks/usePosts';
import { Skeleton } from '@/components/ui/skeleton';
import { use } from "react";
import { formatString } from '@/lib/utils';

export default function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const postId = parseInt(slug)

    // Get all posts to find current one
    const { posts } = usePosts();
    const { comments, loading } = useComments(postId);

    const post = posts.find(p => p.id === postId);

    if (!post || loading) return (<>
        {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
            </div>
        ))}
    </>)

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>{formatString(post.title, Infinity)}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap">{post.body}</p>

                <Button
                    onClick={() => toast(
                        <CustomToast
                            message="Copied to clipboard!"
                            title="Success"
                        />,
                        {
                            duration: 3000,
                            position: "bottom-right"
                        }
                    )}
                    className="mt-4"
                >
                    Share Post
                </Button>

                {/* Comments Section */}
                <div className="mt-8 space-y-4">
                    <h2 className="text-2xl font-semibold">Comments</h2>

                    {loading ? (
                        <>
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="space-y-4">
                            {comments.map(comment => (
                                <Card key={comment.id}>
                                    <CardContent className="pt-6">
                                        <h3 className="font-semibold">{comment.name}</h3>
                                        <p className="text-sm text-muted-foreground">{comment.email}</p>
                                        <p className="mt-2">{comment.body}</p>
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


interface CustomToastProps {
    message?: string;
    onClose?: () => void;
    title?: string;
}

// Create a custom toast component with TypeScript
const CustomToast = ({
    message = "Operation completed successfully",
    onClose,
    title = "Success"
}: CustomToastProps) => {
    return (
        <Card className="bg-green-500 text-white w-full h-full border">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold">{title}</h3>
                        <p className="text-sm opacity-90">{message}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-white hover:bg-white/20"
                    >
                        ×
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
