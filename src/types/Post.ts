import { ReactNode } from "react";

export type Post = {
    title: ReactNode;
    id: number;
    content: string;
    scheduled_time: string;
    posted: boolean;
    media_url: string | null;
    created_at: string;
    user_id: number;
  };
  