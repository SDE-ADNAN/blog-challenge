// Defines the structure of a blog post object
export interface Post {
  userId: number; // ID of the user who created the post
  id: number; // Unique identifier for the post
  title: string; // Title of the post
  body: string; // Content/body of the post
}

// Defines the structure of a comment object associated with a post
export interface Comment {
  postId: number; // ID of the post this comment belongs to
  id: number; // Unique identifier for the comment
  name: string; // Name of the commenter
  email: string; // Email of the commenter
  body: string; // Content/body of the comment
}
