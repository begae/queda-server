import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { TestingModule, Test } from '@nestjs/testing';
import { User } from 'src/entity/user.entity';

// fake database that returns a user with the same email as query email
class MockRepository {
  async findOneBy(query) {
    const user: User = new User();
    user.email = query.email;
    return user;
  }
}

describe('User', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        // custom provider that looks like UserRepository but actually is MockRepository
        { provide: getRepositoryToken(User), useClass: MockRepository },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
  });

  it('should', async () => {
    const email = 'helloalo@somewhere.com';
    const result = await userService.findOneByEmail(email);
    expect(result.email).toBe(email);
  });
});
