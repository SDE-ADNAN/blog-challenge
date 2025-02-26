import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Comment, Post } from "@/types/api";

const POSTS_API = "https://jsonplaceholder.typicode.com/posts";
const COMMENTS_API = "https://jsonplaceholder.typicode.com/comments";

/**
 * Custom hook to fetch a list of posts from an API.
 * Handles loading state, error state, and data retrieval.
 */
export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]); // State to store fetched posts
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to track error messages

  useEffect(() => {
    /**
     * Function to fetch posts asynchronously.
     */
    const fetchPosts = async () => {
      try {
        const response = await fetch(POSTS_API);

        // Check if API response is successful
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Validate that the API response is an array
        if (!Array.isArray(data)) {
          throw new Error("API returned invalid data format (expected array)");
        }

        setPosts(data); // Store posts in state
        setError(null); // Reset error state
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Unknown error fetching posts"
        );
        setPosts([]); // Reset posts to empty array in case of error
        toast.error(
          error instanceof Error ? error.message : "Failed to load posts"
        ); // Show error notification
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchPosts();
  }, []); // Runs only once when the component mounts

  return { posts, loading, error };
};

/**
 * Custom hook to fetch comments for a specific post ID.
 * Ensures valid post ID before making API calls.
 */
export const useComments = (postId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Validate postId before fetching data
    if (!postId || isNaN(postId)) {
      setLoading(false);
      setError("Invalid post ID");
      setComments([]);
      return;
    }

    /**
     * Function to fetch comments asynchronously for a given post.
     */
    const fetchComments = async () => {
      try {
        const response = await fetch(`${COMMENTS_API}?postId=${postId}`);

        // Check if API response is successful
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Validate that API response is an array
        if (!Array.isArray(data)) {
          throw new Error("API returned invalid data format (expected array)");
        }

        setComments(data); // Store comments in state
        setError(null); // Reset error state
      } catch (error) {
        console.error(`Error fetching comments for post ${postId}:`, error);
        setError(
          error instanceof Error
            ? error.message
            : "Unknown error fetching comments"
        );
        setComments([]); // Reset comments to empty array in case of error
        toast.error("Failed to load comments"); // Show error notification
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchComments();
  }, [postId]); // Runs whenever postId changes

  return { comments, loading, error };
};

/**
 * Custom hook to fetch details of a single post by ID.
 * Ensures valid post ID before making API calls.
 */
export const usePost = (postId: number) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Validate postId before fetching data
    if (!postId || isNaN(postId)) {
      setLoading(false);
      setError("Invalid post ID");
      setPost(null);
      return;
    }

    /**
     * Function to fetch a single post asynchronously.
     */
    const fetchPost = async () => {
      try {
        const response = await fetch(`${POSTS_API}/${postId}`);

        // Check if API response is successful
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Post not found");
          }
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Validate that API response contains expected data format
        if (!data || typeof data !== "object" || !("id" in data)) {
          throw new Error("API returned invalid data format");
        }

        setPost(data); // Store post data in state
        setError(null); // Reset error state
      } catch (error) {
        console.error(`Error fetching post ${postId}:`, error);
        setError(
          error instanceof Error ? error.message : "Unknown error fetching post"
        );
        setPost(null); // Reset post state in case of error
        toast.error(
          error instanceof Error ? error.message : "Failed to load post"
        ); // Show error notification
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchPost();
  }, [postId]); // Runs whenever postId changes

  return { post, loading, error };
};
