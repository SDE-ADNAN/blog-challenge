import { renderHook, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import { useComments, usePost, usePosts } from "./usePosts";

// Mock the global fetch function
global.fetch = jest.fn();

// Mock the toast function
jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("usePosts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch posts successfully", async () => {
    const mockPosts = [{ id: 1, title: "Test Post" }];
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockPosts),
    });

    const { result } = renderHook(() => usePosts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.posts).toEqual(mockPosts);
    expect(result.current.error).toBeNull();
  });

  it("should handle API error", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => usePosts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toBe("API responded with status: 500");
    expect(toast.error).toHaveBeenCalledWith("API responded with status: 500");
  });

  it("should handle invalid data format", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue("invalid data"),
    });

    const { result } = renderHook(() => usePosts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toBe(
      "API returned invalid data format (expected array)"
    );
    expect(toast.error).toHaveBeenCalledWith(
      "API returned invalid data format (expected array)"
    );
  });

  it("should handle unknown error", async () => {
    (global.fetch as jest.Mock).mockRejectedValue("Unknown error");

    const { result } = renderHook(() => usePosts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toBe("Unknown error fetching posts");
    expect(toast.error).toHaveBeenCalledWith("Failed to load posts");
  });
});

describe("useComments", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch comments successfully", async () => {
    const mockComments = [{ id: 1, body: "Test Comment" }];
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockComments),
    });

    const { result } = renderHook(() => useComments(1));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.comments).toEqual(mockComments);
    expect(result.current.error).toBeNull();
  });

  it("should handle API error", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useComments(1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.comments).toEqual([]);
    expect(result.current.error).toBe("API responded with status: 500");
    expect(toast.error).toHaveBeenCalledWith("Failed to load comments");
  });

  it("should handle invalid data format", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue("invalid data"),
    });

    const { result } = renderHook(() => useComments(1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.comments).toEqual([]);
    expect(result.current.error).toBe(
      "API returned invalid data format (expected array)"
    );
    expect(toast.error).toHaveBeenCalledWith("Failed to load comments");
  });

  it("should handle invalid postId", () => {
    const { result } = renderHook(() => useComments(NaN));

    expect(result.current.loading).toBe(false);
    expect(result.current.comments).toEqual([]);
    expect(result.current.error).toBe("Invalid post ID");
  });

  it("should handle unknown error", async () => {
    (global.fetch as jest.Mock).mockRejectedValue("Unknown error");

    const { result } = renderHook(() => useComments(1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.comments).toEqual([]);
    expect(result.current.error).toBe("Unknown error fetching comments");
    expect(toast.error).toHaveBeenCalledWith("Failed to load comments");
  });
});

describe("usePost", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch a post successfully", async () => {
    const mockPost = { id: 1, title: "Test Post" };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockPost),
    });

    const { result } = renderHook(() => usePost(1));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.post).toEqual(mockPost);
    expect(result.current.error).toBeNull();
  });

  it("should handle API error", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => usePost(1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.post).toBeNull();
    expect(result.current.error).toBe("API responded with status: 500");
    expect(toast.error).toHaveBeenCalledWith("API responded with status: 500");
  });

  it("should handle 404 error", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => usePost(1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.post).toBeNull();
    expect(result.current.error).toBe("Post not found");
    expect(toast.error).toHaveBeenCalledWith("Post not found");
  });

  it("should handle invalid data format", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue("invalid data"),
    });

    const { result } = renderHook(() => usePost(1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.post).toBeNull();
    expect(result.current.error).toBe("API returned invalid data format");
    expect(toast.error).toHaveBeenCalledWith(
      "API returned invalid data format"
    );
  });

  it("should handle invalid postId", () => {
    const { result } = renderHook(() => usePost(NaN));

    expect(result.current.loading).toBe(false);
    expect(result.current.post).toBeNull();
    expect(result.current.error).toBe("Invalid post ID");
  });

  it("should handle network error", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => usePost(1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.post).toBeNull();
    expect(result.current.error).toBe("Network error");
    expect(toast.error).toHaveBeenCalledWith("Network error");
  });
});
