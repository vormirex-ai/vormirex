export interface NoteItem {
  id: string;
  type: "AI Answer" | "My Note" | "Lesson Note" | "Uploaded";
  title: string;
  description: string;
  category: string;
  subjectName: string;
  timeAgo: string;
  isBookmarked: boolean;
  fileUrl: string;
  isPrivate: boolean;
}

export interface ApiNote {
  _id: string;
  title: string;
  content: string;
  subjectName: string;
  subjectId: string;
  fileUrl: string;
  isBookmarked: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotesResponse {
  notes: ApiNote[];
  total: number;
  page: number;
  pages: number;
}