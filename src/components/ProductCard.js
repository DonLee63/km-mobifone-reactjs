import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, margin: "10px", boxShadow: 1 }}>
      <CardMedia
        component="img"
        height="220"
        image="https://images2.thanhnien.vn/Uploaded/dieutrangqc/2022_10_14/mobifone-tuyendung-3846.jpg" // Thay bằng ảnh thực tế
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          {product.content}
        </Typography> */}
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