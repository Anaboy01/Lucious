import { createContext,  useContext, useEffect, useState } from "react";
import {
  registerProduct,
  registerBulkProduct,
  reviewProduct,
  updateProduct,
  allProducts,
  getAProduct,
} from "@/services/productService"; // adjust the import path

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const data = await allProducts();
      setProducts(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id) => {
    setLoading(true);
    try {
      const data = await getAProduct(id);
      setSingleProduct(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product) => {
    const newProduct = await registerProduct(product);
    await fetchAllProducts(); 
    return newProduct;
  };

  const bulkCreateProducts = async (productList) => {
    const res = await registerBulkProduct(productList);
    await fetchAllProducts();
    return res;
  };

  const editProduct = async (id, updatedData) => {
    const res = await updateProduct(id, updatedData);
    await fetchAllProducts();
    return res;
  };

  const addReview = async (id, reviewData) => {
    const res = await reviewProduct(id, reviewData);
    await fetchProductById(id); // refresh the single product
    return res;
  };

  useEffect(() => {
    fetchAllProducts()
  },[])

  return (
    <ProductContext.Provider
      value={{
        products,
        singleProduct,
        loading,
        fetchAllProducts,
        fetchProductById,
        createProduct,
        bulkCreateProducts,
        editProduct,
        addReview,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
