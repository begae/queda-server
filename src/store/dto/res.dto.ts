import { LocationDto } from 'src/common/dto/req.dto';
import { Store } from 'src/entity/store.entity';
import { mapPostToListItemDto, PostListItemDto } from 'src/post/dto/res.dto';

export class StoreListItemDto {
  id: string;
  name: string;
  profilePicture: string;
  location: LocationDto;
  latestPostId: string;
  latestPostTitle: string;
  latestPostCreatedAt: string;
}

export class FindStoreResDto {
  id: string;
  name: string;
  coverPicture: string;
  profilePicture: string;
  registred: boolean;
  location: LocationDto;
  subscribers: number;
  posts: PostListItemDto[];
  tags: string[];
  featuredPost: PostListItemDto;
}

export function mapStoreToListItemDto(store: Store): StoreListItemDto {
  return {
    id: store.id,
    name: store.name,
    profilePicture: store.profilePicture,
    location: store.location,
    latestPostId: store.latestPost.id,
    latestPostTitle: store.latestPost.title,
    latestPostCreatedAt: store.latestPost.createdAt.toISOString(),
  };
}

export function mapStoreToResponseDto(store: Store): FindStoreResDto {
  return {
    id: store.id,
    name: store.name,
    coverPicture: store.coverPicture,
    profilePicture: store.profilePicture,
    registred: store.registration !== null,
    location: store.location,
    subscribers: store.subscribers.length,
    posts: store.posts.map(mapPostToListItemDto),
    tags: store.tags.map(({ value }) => value),
    featuredPost: mapPostToListItemDto(store.featuredPost),
  };
}
