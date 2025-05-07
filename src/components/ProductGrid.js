import React, { useState } from "react";
import { Grid, Typography, Box, Pagination } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductGrid = ({ promotions }) => {
  const [page, setPage] = useState(1); // State để theo dõi trang hiện tại
  const itemsPerPage = 9; // Số mục mỗi trang (3x3 trên desktop)

  // Nếu promotions không phải là mảng, hiển thị thông báo
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
          <Grid item xs={12} sm={6} md={4} key={product.id}>
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