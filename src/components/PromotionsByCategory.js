import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Container,
  CircularProgress,
} from "@mui/material";
import axiosClient from "../api/axiosClient";
import ProductGrid from "../components/ProductGrid"; // Import ProductGrid thay vì ProductCard

const PromotionsByCategory = () => {
  const [category, setCategory] = useState(null); // Thông tin danh mục
  const [products, setProducts] = useState([]); // Danh sách sản phẩm/dịch vụ
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const location = useLocation(); // Lấy query parameters từ URL
  const navigate = useNavigate();

  // Lấy category_id từ query parameter
  const query = new URLSearchParams(location.search);
  const categoryId = query.get("category_id");

  // Lấy thông tin danh mục và sản phẩm/dịch vụ
  useEffect(() => {
    if (categoryId) {
      // Lấy thông tin danh mục
      axiosClient
        .get(`/promotion-categories/${categoryId}`)
        .then((response) => {
          console.log("Category Response:", response.data);
          setCategory(response.data);
        })
        .catch((error) => {
          console.error("Error fetching category:", error);
        });

      // Lấy danh sách sản phẩm/dịch vụ
      axiosClient
        .get(`/promotions?category_id=${categoryId}`)
        .then((response) => {
          console.log("Products Response:", response.data);
          setProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [categoryId]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Tiêu đề danh mục */}
          <Typography variant="h4" component="h1" gutterBottom>
            {category ? category.title : "Danh mục"}
          </Typography>

          {/* Sử dụng ProductGrid để hiển thị danh sách sản phẩm/dịch vụ */}
          <ProductGrid promotions={products} />
        </>
      )}
    </Container>
  );
};

export default PromotionsByCategory;