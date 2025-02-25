import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

interface PostCardProps {
    post: {
        id: number;
        title: string;
        body: string;
    };
}

const PostCard = ({ post }: PostCardProps) => {
    return (
        <Link href={`/post/${post.id}`} className="w-full">
            <Card className="hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer">
                <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>
                        {post.body.substring(0, 150)}...
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
    );
};

export default PostCard;