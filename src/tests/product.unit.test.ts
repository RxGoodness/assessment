import { DataSource } from 'typeorm';
import { Product } from '../entities/product';

describe('Product Entity', () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [Product],
    });
    await dataSource.initialize();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should create a new product entity', async () => {
    const productRepository = dataSource.getRepository(Product);

    const product = new Product();
    product.name = 'Sample Product';
    product.size = 12.5;
    product.image = 'http://example.com/image.png';
    product.price = 99.99;
    product.discount = 10.00;
    product.description = 'A sample product for testing';

    const savedProduct = await productRepository.save(product);

    const foundProduct = await productRepository.findOneBy({
      id: savedProduct.id,
    });

    expect(foundProduct).not.toBeNull();
    expect(foundProduct!.name).toBe('Sample Product');
    expect(foundProduct!.size).toBe(12.5);
    expect(foundProduct!.image).toBe('http://example.com/image.png');
    expect(foundProduct!.price).toBe(99.99);
    expect(foundProduct!.discount).toBe(10.00);
    expect(foundProduct!.description).toBe('A sample product for testing');
  });

  it('should have default discount value of 0 when not provided', async () => {
    const productRepository = dataSource.getRepository(Product);

    const product = new Product();
    product.name = 'Discount Test Product';
    product.size = 15.0;
    product.image = 'http://example.com/discount.png';
    product.price = 49.99;

    const savedProduct = await productRepository.save(product);

    expect(savedProduct.discount).toBe(0);
  });

  it('should allow null description', async () => {
    const productRepository = dataSource.getRepository(Product);
  
    const product = new Product();
    product.name = 'No Description Product';
    product.size = 10.0;
    product.image = 'http://example.com/no-description.png';
    product.price = 29.99;
    product.discount = 5.00;
  
    const savedProduct = await productRepository.save(product);
  
    expect(savedProduct.description).toBeNull();
  });
  
});
