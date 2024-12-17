import { LocationDto } from 'src/common/dto/req.dto';

export class StoreListItemDto {
  id: string;
  name: string;
  profilePicture: string;
  location: LocationDto;
  latestPostId: string;
  latestPostTitle: string;
  latestPostCreatedAt: string;
}
