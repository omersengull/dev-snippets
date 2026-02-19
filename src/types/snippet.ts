export interface Snippet{
    id:string;
    user_id:string;
    title:string;
    description?:string;
    code:string;
    language:string;
    created_at:string;
    file_name:string;
    views:number;
    saved:number;
    lines:number;
    visibility: 'Public' | 'Private';
    profiles: Profile;
    comments:Comment[];
}
export interface Comment {
  id: string;
  content: string;
  created_at:string;
  snippet_id:string;
  user_id:string;
  likes:number;
  parent_id:string | null;
  profiles: Profile;
  replies?:Comment[];
}
export interface Profile{
  full_name: string;
  avatar_url:string;
}