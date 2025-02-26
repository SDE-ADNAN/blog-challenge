"use client"; // Enables client-side rendering for this component

import Link from "next/link";
import { formatString, getRandomBlogImage } from "@/lib/utils";

import { FALLBACK_IMAGE_URL } from "@/constants";

import ImageWithFallback from "@/components/ui/image-with-fallback";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Defines the props for the PostCard component
interface PostCardProps {
    post: {
        id: number;
        title: string;
        body: string;
        imageUrl?: string; // Optional image URL
    };
    index: number; // Index used to prioritize image loading
}

const PostCard = ({ post, index }: PostCardProps) => {
    // Use provided image URL or fallback to a random blog image
    const imgUrl = post.imageUrl || getRandomBlogImage();

    // Truncate the title if it's longer than 30 characters and format it
    const title = post.title.length > 30 ? `${formatString(post.title.substring(0, 27), 27)} ...` : post.title;

    // Truncate the body text if it's longer than 100 characters and format it
    const body = post.body.length > 100 ? `${formatString(post.body.substring(0, 100), 100)} ...` : post.body;

    return (
        // Wraps the entire card in a Link to navigate to the post details page
        <Link href={`/post/${post.id}`} className="w-full h-full">
            <Card className="backdrop-blur-[2px] flex flex-col h-full hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer">
                {/* Image container with a fixed height */}
                <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                        src={imgUrl} // The main image URL
                        alt={title} // Sets alt text for accessibility
                        fallbackSrc={FALLBACK_IMAGE_URL} // Provides a fallback image if loading fails
                        style={{ borderRadius: "0.7rem 0.7rem 0 0" }} // Adds rounded corners to the top
                        fill // Enables responsive image sizing
                        className="object-cover"
                        priority={index < 7} // Prioritize loading the first 6  post image
                        loading={index < 7 ? "eager" : "lazy"} // Lazy load images except for the first 6
                    />
                </div>

                {/* Card content section */}
                <CardHeader className="flex-grow flex flex-col">
                    {/* Displays the post title with a blue color and bold font */}
                    <CardTitle className="text-blue-400 font-bold text-xl">{title}</CardTitle>

                    {/* Displays the post body description */}
                    <CardDescription className="mt-auto text-gray-500">
                        {body}
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
    );
};

export default PostCard;