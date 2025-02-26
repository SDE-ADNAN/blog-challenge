import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Comment, Post } from "@/types/api";

const POSTS_API = "https://jsonplaceholder.typicode.com/posts";
const COMMENTS_API = "https://jsonplaceholder.typicode.com/comments";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(POSTS_API);

        // Check if response is OK
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Validate that data is an array
        if (!Array.isArray(data)) {
          throw new Error("API returned invalid data format (expected array)");
        }

        setPosts(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Unknown error fetching posts"
        );
        setPosts([]); // Reset posts to empty array on error
        toast.error(
          error instanceof Error ? error.message : "Failed to load posts"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

export const useComments = (postId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip API call if postId is invalid
    if (!postId || isNaN(postId)) {
      setLoading(false);
      setError("Invalid post ID");
      setComments([]);
      return;
    }

    const fetchComments = async () => {
      try {
        const response = await fetch(`${COMMENTS_API}?postId=${postId}`);

        // Check if response is OK
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Validate that data is an array
        if (!Array.isArray(data)) {
          throw new Error("API returned invalid data format (expected array)");
        }

        setComments(data);
        setError(null);
      } catch (error) {
        console.error(`Error fetching comments for post ${postId}:`, error);
        setError(
          error instanceof Error
            ? error.message
            : "Unknown error fetching comments"
        );
        setComments([]); // Reset comments to empty array on error
        toast.error("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  return { comments, loading, error };
};

// Add a helper hook for handling a single post
export const usePost = (postId: number) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip API call if postId is invalid
    if (!postId || isNaN(postId)) {
      setLoading(false);
      setError("Invalid post ID");
      setPost(null);
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await fetch(`${POSTS_API}/${postId}`);

        // Check if response is OK
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Post not found");
          }
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Validate that data has expected shape
        if (!data || typeof data !== "object" || !("id" in data)) {
          throw new Error("API returned invalid data format");
        }

        setPost(data);
        setError(null);
      } catch (error) {
        console.error(`Error fetching post ${postId}:`, error);
        setError(
          error instanceof Error ? error.message : "Unknown error fetching post"
        );
        setPost(null);
        toast.error(
          error instanceof Error ? error.message : "Failed to load post"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { post, loading, error };
};
