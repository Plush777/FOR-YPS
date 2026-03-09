export type Letter = {
  id: number;
  user_id?: string; // uuid (필요하면 필수로 바꿔도 됨)
  username: string;
  content: string;
  created_at: string;
  author_avatar_url?: string | null; // ✅ 작성 시점 프로필 스냅샷
};
