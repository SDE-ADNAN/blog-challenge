"use client";
import Link from "next/link";
import { formatString, getRandomBlogImage } from "@/lib/utils";

import { FALLBACK_IMAGE_URL } from "@/constants";

import ImageWithFallback from "@/components/ui/image-with-fallback";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface PostCardProps {
    post: {
        id: number;
        title: string;
        body: string;
        imageUrl?: string;
    };
    index: number;
}

const PostCard = ({ post, index }: PostCardProps) => {
    const imgUrl = post.imageUrl || getRandomBlogImage();

    const title = post.title.length > 30 ? `${formatString(post.title.substring(0, 27), 27)} ...` : post.title;
    const body = post.body.length > 100 ? `${formatString(post.body.substring(0, 100), 100)} ...` : post.body;

    return (
        <Link href={`/post/${post.id}`} className="w-full h-full">
            <Card className="backdrop-blur-[2px] flex flex-col h-full hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer ">
                <div className="relative h-48 overflow-hidden ">
                    <ImageWithFallback
                        src={imgUrl}
                        alt={title}
                        fallbackSrc={FALLBACK_IMAGE_URL}
                        style={{ borderRadius: "0.7rem 0.7rem 0 0" }}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"} // ✅ Lazy load for rest
                    />
                </div>
                <CardHeader className="flex-grow flex flex-col">
                    <CardTitle className="text-blue-400 font-bold text-xl">{title}</CardTitle>
                    <CardDescription className="mt-auto text-gray-500">
                        {body}
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
    );
};

export default PostCard;