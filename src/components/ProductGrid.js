import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Pagination } from "@mui/material";
import ProductCard from "./ProductCard";
import axiosClient from "../api/axiosClient";

const ProductGrid = () => {
  const [page, setPage] = useState(1); // State để theo dõi trang hiện tại
  const [promotions, setPromotions] = useState([]); // State để lưu danh sách promotions từ API
  const [isLoading, setIsLoading] = useState(true); // State để xử lý trạng thái tải
  const itemsPerPage = 9; // Số mục mỗi trang

  // Gọi API để lấy danh sách promotions khi component được mount
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axiosClient.get("/promotions"); // Giả sử endpoint là /promotions
        setPromotions(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách promotions:", err);
        setIsLoading(false);
      }
    };
    fetchPromotions();
  }, []);

  // Hiển thị thông báo khi đang tải
  if (isLoading) {
    return (
      <Typography sx={{ padding: "20px", textAlign: "center" }}>
        Đang tải...
      </Typography>
    );
  }

  // Nếu không có dữ liệu từ API, hiển thị thông báo
  if (!Array.isArray(promotions) || promotions.length === 0) {
    return (
      <Typography sx={{ padding: "20px", textAlign: "center" }}>
        Không có chương trình khuyến mãi nào.
      </Typography>
    );
  }

  // Tính toán danh sách promotions cho trang hiện tại
  const totalPages = Math.ceil(promotions.length / itemsPerPage);
  const paginatedPromotions = promotions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Xử lý khi chuyển trang
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu trang khi chuyển trang
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      <Grid container spacing={3}>
        {paginatedPromotions.map((product) => (
          <Grid item xs={12} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      {/* Phân trang */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#1976d2",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.1)",
                },
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductGrid;