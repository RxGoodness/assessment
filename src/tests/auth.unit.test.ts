import { DataSource } from 'typeorm';
import { User } from '../entities/user';

describe('User Entity', () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [User],
    });
    await dataSource.initialize();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should create a new user entity', async () => {
    const userRepository = dataSource.getRepository(User);

    const user = new User();
    user.email = 'test@example.com';
    user.password = 'password123';

    const savedUser = await userRepository.save(user);

    const foundUser = await userRepository.findOneBy({
      id: savedUser.id,
    });

    expect(foundUser).not.toBeNull();
    expect(foundUser!.email).toBe('test@example.com');
    expect(foundUser!.password).toBe('password123');
  });

  it('should have a primary key of type uuid', async () => {
    const userRepository = dataSource.getRepository(User);

    const user = new User();
    user.email = 'uuid_test@example.com';
    user.password = 'password123';

    const savedUser = await userRepository.save(user);

    expect(savedUser.id).toBeDefined();
    expect(savedUser.id).toMatch(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);
  });
});
