import { createContext,  useContext, useEffect, useState } from "react";
import {
  registerProduct,
  registerBulkProduct,
  reviewProduct,
  updateProduct,
  allProducts,
  getAProduct,
  getCategories
} from "@/services/productService"; // adjust the import path

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(false);
  

  const fetchAllProducts = async () => {
    setProductLoading(true);
    try {
      const data = await allProducts();
      setProducts(data);
      
      return data;
    } finally {
      setProductLoading(false);
    }
  };
  const fetchProductCategory = async (category) => {
    setProductLoading(true);
    try {
      const data = await getCategories(category);
      
      return data;
    } finally {
      setProductLoading(false);
    }
  };

  const fetchProductById = async (id) => {
    setProductLoading(true);
    try {
      const data = await getAProduct(id);
      setSingleProduct(data);
      return data;
    } finally {
      setProductLoading(false);
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
    await fetchProductById(id); 
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
        productLoading,
        fetchAllProducts,
        fetchProductById,
        createProduct,
        bulkCreateProducts,
        editProduct,
        addReview,
        fetchProductCategory
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
