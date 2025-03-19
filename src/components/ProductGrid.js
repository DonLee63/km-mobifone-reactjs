import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductGrid = ({ promotions }) => {
  // Nếu promotions không phải là mảng, hiển thị thông báo
  if (!Array.isArray(promotions) || promotions.length === 0) {
    return (
      <Typography sx={{ padding: "20px", textAlign: "center" }}>
        Không có chương trình khuyến mãi nào.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      <Grid container spacing={3}>
        {promotions.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;