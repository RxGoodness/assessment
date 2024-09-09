import { DataSource } from 'typeorm';
import { User, Product, Cart } from '../entities/index';

describe('Cart Entity', () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [User, Product, Cart],
    });
    await dataSource.initialize();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should create a new cart entity with relations', async () => {
    const userRepository = dataSource.getRepository(User);
    const productRepository = dataSource.getRepository(Product);
    const cartRepository = dataSource.getRepository(Cart);

    const user = new User();
    user.email = 'user@example.com';
    user.password = 'password123';
    const savedUser = await userRepository.save(user);

    const product = new Product();
    product.name = 'Sample Product';
    product.size = 12.5;
    product.image = 'http://example.com/image.png';
    product.price = 99.99;
    product.discount = 10.00;
    product.description = 'A sample product for testing';
    const savedProduct = await productRepository.save(product);

    const cart = new Cart();
    cart.user = savedUser;
    cart.product = savedProduct;
    cart.quantity = 3;
    const savedCart = await cartRepository.save(cart);

    const foundCart = await cartRepository.findOne({
      where: { id: savedCart.id },
      relations: ['user', 'product'],
    });

    expect(foundCart).not.toBeNull();
    expect(foundCart!.user).toEqual(savedUser);
    expect(foundCart!.product).toEqual(savedProduct);
    expect(foundCart!.quantity).toBe(3);
  });
  
  it('should correctly set relationships and quantity', async () => {
    const userRepository = dataSource.getRepository(User);
    const productRepository = dataSource.getRepository(Product);
    const cartRepository = dataSource.getRepository(Cart);

    const user = new User();
    user.email = 'anotheruser@example.com';
    user.password = 'password456';
    const savedUser = await userRepository.save(user);

    const product = new Product();
    product.name = 'Another Product';
    product.size = 15.0;
    product.image = 'http://example.com/another.png';
    product.price = 49.99;
    product.discount = 5.00;
    product.description = 'Another sample product';
    const savedProduct = await productRepository.save(product);

    const cart = new Cart();
    cart.user = savedUser;
    cart.product = savedProduct;
    cart.quantity = 5;
    const savedCart = await cartRepository.save(cart);

    expect(savedCart.user).toEqual(savedUser);
    expect(savedCart.product).toEqual(savedProduct);
    expect(savedCart.quantity).toBe(5);
  });
});
