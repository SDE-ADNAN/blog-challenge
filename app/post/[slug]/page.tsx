'use server';

import { formatString } from '@/lib/utils';

import { fetchComments, fetchPost } from '@/actions';

import PostDetailSkeleton from '@/components/ui/skeleton-loaders/post-detail-skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SharePostBtn from '@/components/ui/share-post-btn';

interface PostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const postId = parseInt(slug);

    // Fetch post and comments data from server actions
    const { post, error: postError } = await fetchPost(postId);
    const { comments, error: commentsError } = await fetchComments(postId);

    if (postError || commentsError) {
        return <p className="text-red-500">Error fetching data.</p>;
    }

    if (!post) {
        return <PostDetailSkeleton />;
    }

    return (
        <>
            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl sm:my-2 lg:my-3 text-center">
                Post <span className='text-blue-400'>Details</span>
            </h1>

            <Card className="mb-8 w-full rounded-xl border shadow-lg backdrop-blur-[1px]
                dark:bg-[rgba(20,30,48,0.6)] dark:border-gray-800 dark:shadow-black/50
                bg-[rgba(226,232,240,0.5)] border-gray-300 shadow-gray-400/50">
                <CardHeader>
                    <CardTitle className="font-bold text-2xl dark:text-[#3de537] text-gray-900">
                        {formatString(post.title, Infinity)}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg dark:text-gray-300 text-gray-700">
                        {formatString(post.body, Infinity)}
                    </p>

                    <SharePostBtn />

                    {/* Comments Section */}
                    <div className="mt-8 space-y-6">
                        <h2 className="text-2xl font-semibold dark:text-[#FFB400] text-[#E65100]">
                            Comments
                        </h2>

                        {comments.length === 0 ? (
                            <p className="text-gray-500">No comments yet.</p>
                        ) : (
                            <div className="space-y-6" data-testid="comments-section">
                                {comments.map(comment => (
                                    <Card key={comment.id} className="
                                        rounded-xl shadow-md border
                                        dark:bg-[#191919] dark:border-gray-700 dark:shadow-black/50
                                        bg-white border-gray-300 shadow-gray-300/50">
                                        <CardContent className="pt-6">
                                            <h3 className="font-semibold text-lg dark:text-[#00FFA3] text-gray-900">
                                                {formatString(comment.name, Infinity)}
                                            </h3>
                                            <p className="text-sm dark:text-gray-500 text-gray-600">
                                                {comment.email}
                                            </p>
                                            <p className="mt-2 dark:text-gray-300 text-gray-700 ml-3">
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
        </>
    );
}