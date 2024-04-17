import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user',()=>{
    const newUser = service.create({
      username: 'test',
      phone_number: '1234567890',

    });
    expect(newUser).toEqual({
      username: 'test',
      phone_number: '1234567890',
    });
  });
});
