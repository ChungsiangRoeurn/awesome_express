import { productRepository } from "../respositories/product-repo.js";

export const productService = {
  getAllProducts: async () => {
    return await productRepository.findAll();
  },

  getProductById: async (id) => {
    const product = await productRepository.findById(id);
    if (!product) throw new Error("Product not found");
    return product;
  },

  createProduct: async (productData) => {
    if (productData.price < 0) throw new Error("Price cannot be negative");
    return await productRepository.create(productData);
  },

  updateProduct: async (id, data) => {
    const affectedRows = await productRepository.update(id, data);
    if (affectedRows === 0) throw new Error("Product not found to update");
    return true;
  },

  deleteProduct: async (id) => {
    const affectedRows = await productRepository.remove(id);
    if (affectedRows === 0) throw new Error("Product not found to delete");
    return true;
  },
};
