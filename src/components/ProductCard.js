import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Định nghĩa URL cơ sở của API Laravel (nếu cần)
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  // Xử lý đường dẫn ảnh từ API
  const imageSrc = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${API_BASE_URL}${product.image}`
    : "https://via.placeholder.com/345x220?text=No+Image"; // Ảnh mặc định nếu không có image

  return (
    <Card sx={{ maxWidth: 345, margin: "10px", boxShadow: 1 }}>
      <CardMedia
        component="img"
        height="220"
        image={imageSrc} // Sử dụng ảnh từ product.image
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() => navigate(`/promotion/${product.id}`)}
          sx={{ mt: 2 }}
        >
          Xem chi tiết
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;