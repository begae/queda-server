import { Post } from 'src/entity/post.entity';

export class FindPostResDto {
  id: string;
  title: string;
  body: string;
  attachments: string[];
  likes: number;
  createdAt: string;
  updatedAt: string;
  storeId: string;
  storeName: string;
  storeProfilePicture: string;
}

export class PostListItemDto {
  id: string;
  title: string;
  mainAttachment: string;
  createdAt: string;
}

export function mapPostToResDto(post: Post): FindPostResDto {
  return {
    id: post.id,
    title: post.title,
    body: post.body,
    attachments: post.attachments ?? [],
    likes: post.likedUsers.length,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    storeId: post.publishedBy.id,
    storeName: post.publishedBy.name,
    storeProfilePicture: post.publishedBy.profilePicture,
  };
}

export function mapPostToListItemDto(post: Post): PostListItemDto {
  return {
    id: post.id,
    title: post.title,
    mainAttachment: post.attachments[0],
    createdAt: post.createdAt.toISOString(),
  };
}
