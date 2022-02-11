import faker from "@faker-js/faker";
import Category from "../../models/Category";
import Product from "../../models/Product";

const categories: any[] = [];
const products: any[] = [];

// CATEGORIES
const generateCategory = () => {
  const category = new Category({
    name: faker.commerce.department(),
    description: faker.lorem.sentence(),
  });

  categories.push(category);
};

const generateSpecificCategory = () => {
  const category = new Category({
    _id: "62054d165b6ab15439227791",
    name: "Clothing",
    description: faker.lorem.sentence(),
  });

  categories.push(category);
};

const generateSecondCategory = () => {
  const category = new Category({
    _id: "62054d165b6ab15439227197",
    name: "Apparel",
    description: faker.lorem.sentence(),
  });

  categories.push(category);
};

// PRODUCTS

const generateProduct = () => {
  const product = new Product({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    images: [faker.image.imageUrl()],
    category: null,
  });

  products.push(product);
};

const generateSpecificProduct = () => {
  const product = new Product({
    _id: "62017133d314aff5da2f2d6c",
    name: "Specific product",
    price: 72,
    description: "Specific product description",
    images: [faker.image.imageUrl()],
    category: null,
  });

  products.push(product);
};

const generateClothingProduct = () => {
  const product = new Product({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    images: [faker.image.imageUrl()],
    category: "62054d165b6ab15439227791", // Clothing category
  });

  products.push(product);
};

// Seed db
const seedDB = async () => {
  // Generate specifics
  generateSpecificProduct();
  generateSpecificCategory();
  generateSecondCategory();

  // Add 3 of things
  for (let i = 0; i < 3; i++) {
    generateClothingProduct();
    generateCategory();
    generateProduct();
  }

  // Save to db
  for (let category of categories) {
    try {
      await category.save();
    } catch (err) {
      err;
    }
  }

  for (let product of products) {
    try {
      await product.save();
    } catch (err) {
      err;
    }
  }

  // console.log(categories);
  // console.log(products);
  return { products };
};

export default seedDB;
