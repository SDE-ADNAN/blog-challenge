"use server";

import { toast } from "sonner";
import { Comment, Post } from "@/types/api";
import { COMMENTS_API, POSTS_API } from "@/constants";

/**
 * Server Action to fetch all posts from the API.
 */
export const fetchPosts = async (): Promise<{
  posts: Post[];
  error: string | null;
}> => {
  try {
    const response = await fetch(POSTS_API, {
      method: "GET",
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("API returned invalid data format (expected array)");
    }

    return { posts: data, error: null };
  } catch (error) {
    console.error("Error fetching posts:", error);
    toast.error(
      error instanceof Error ? error.message : "Failed to load posts"
    );
    return {
      posts: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Server Action to fetch a single post by ID.
 */
export const fetchPost = async (
  postId: number
): Promise<{ post: Post | null; error: string | null }> => {
  if (!postId || isNaN(postId)) {
    return { post: null, error: "Invalid post ID" };
  }

  try {
    const response = await fetch(`${POSTS_API}/${postId}`, {
      method: "GET",
      cache: "force-cache",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Post not found");
      }
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    if (!data || typeof data !== "object" || !("id" in data)) {
      throw new Error("API returned invalid data format");
    }

    return { post: data, error: null };
  } catch (error) {
    console.error(`Error fetching post ${postId}:`, error);
    toast.error(error instanceof Error ? error.message : "Failed to load post");
    return {
      post: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Server Action to fetch comments for a specific post ID.
 */
export const fetchComments = async (
  postId: number
): Promise<{ comments: Comment[]; error: string | null }> => {
  if (!postId || isNaN(postId)) {
    return { comments: [], error: "Invalid post ID" };
  }

  try {
    const response = await fetch(`${COMMENTS_API}?postId=${postId}`, {
      method: "GET",
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("API returned invalid data format (expected array)");
    }

    return { comments: data, error: null };
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    toast.error("Failed to load comments");
    return {
      comments: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
