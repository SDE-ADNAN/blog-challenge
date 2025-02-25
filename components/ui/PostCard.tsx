"use client";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { formatString, getRandomBlogImage } from "@/lib/utils";
import ImageWithFallback from "./ImageWithFallback";
import { FALLBACK_IMAGE_URL } from "@/constants";

interface PostCardProps {
    post: {
        id: number;
        title: string;
        body: string;
        imageUrl?: string;
    };
}

const PostCard = ({ post }: PostCardProps) => {
    // Use post's image if available, otherwise get a random one
    const imgUrl = post.imageUrl || getRandomBlogImage();

    const title = formatString(post.title, 50);
    const body = post.body.length > 100 ? `${formatString(post.body.substring(0, 100), 100)} ...` : post.body;

    return (
        <Link href={`/post/${post.id}`} className="w-full h-full">
            <Card className="flex flex-col h-full hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer rounded-t-lg">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                        src={imgUrl}
                        alt={title}
                        fallbackSrc={FALLBACK_IMAGE_URL}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110 rounded-t-lg"
                        priority
                    />
                </div>
                <CardHeader className="flex-grow flex flex-col">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="mt-auto">
                        {body}
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
    );
};

export default PostCard;