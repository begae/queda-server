export class FindPostResDto {
  id: string;
  title: string;
  body: string;
  attachments: string[];
  likedUsers: string[];
  createdAt: string;
  updatedAt: string;
  publishedBy: string;
}