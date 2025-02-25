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

    if (!post) return <div>Post not found</div>;

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>{formatString(post.title, Infinity)}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap">{post.body}</p>

                <Button
                    onClick={() => toast("Copied to clipboard!", {
                        description: "Post URL copied successfully",
                    })}
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