import faker from "@faker-js/faker";
import Product from "../../models/Product";

const products: any[] = [];

// Generate products

const generateProduct = () => {
  const product = new Product({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
  });

  products.push(product);
};

const generateSpecificProduct = () => {
  const product = new Product({
    _id: "62017133d314aff5da2f2d6c",
    name: "Specific product",
    price: 72,
    description: "Specific product description",
  });

  products.push(product);
};

// Seed db
const seedDB = async () => {
  // Generate specifics
  generateSpecificProduct();

  // Add 3 products
  for (let i = 0; i < 3; i++) {
    generateProduct();
  }

  // Save to db
  for (let product of products) {
    try {
      await product.save();
    } catch (err) {
      err;
    }
  }

  // console.log(products);
  return { products };
};

export default seedDB;
