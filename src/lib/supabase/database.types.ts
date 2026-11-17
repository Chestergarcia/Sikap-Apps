export type AccountStatus = "active" | "warned" | "suspended";
export type PostStatus = "pending" | "approved" | "rejected";
export type NotificationType = "moderation" | "report" | "member" | "security" | "reward";

export type Profile = {
  id: string;
  display_name: string;
  avatar_url: string | null;
  status: AccountStatus;
  created_at: string;
  updated_at: string;
};

export type Post = {
  id: string;
  author_id: string;
  title: string;
  body: string;
  category: string;
  status: PostStatus;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile> & Pick<Profile, "id" | "display_name">; Update: Partial<Profile> };
      posts: { Row: Post; Insert: Omit<Post, "id" | "created_at" | "updated_at">; Update: Partial<Post> };
    };
  };
};
