import { LocationDto } from 'src/common/dto/req.dto';

export class FindProfileResDto {
  id: string;
  handle: string;
  profilePicture: string;
  location: LocationDto;
}
