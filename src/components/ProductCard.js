import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Icon cho lượt xem

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
    <Card
      sx={{
        maxWidth: 345,
        margin: "10px",
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%", // Đảm bảo Card có chiều cao đồng đều
        borderRadius: 2, // Bo góc giống trong hình
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={imageSrc}
        alt={product.title}
        sx={{ objectFit: "cover" }} // Đảm bảo hình ảnh lấp đầy không gian
      />
      <CardContent
        sx={{
          flexGrow: 1, // Đảm bảo CardContent chiếm không gian còn lại
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Đẩy nút xuống dưới
          padding: "16px", // Padding giống trong hình
        }}
      >
        <div>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontSize: "1.1rem", // Kích thước chữ giống trong hình
              fontWeight: "bold",
              lineHeight: 1.2,
              display: "-webkit-box",
              WebkitLineClamp: 2, // Giới hạn tiêu đề trong 2 dòng
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginBottom: "8px", // Khoảng cách giữa tiêu đề và nút
            }}
          >
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              mb: "8px", // Khoảng cách giữa lượt xem và nút
            }}
          >
            <VisibilityIcon sx={{ fontSize: "16px" }} /> {/* Icon mắt */}
            {product.views || 0} lượt xem
          </Typography>
        </div>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() => navigate(`/promotion/${product.id}`)}
          sx={{
            alignSelf: "flex-start", // Căn trái nút
            textTransform: "none", // Bỏ chữ in hoa
            fontWeight: "bold",
          }}
        >
          Xem chi tiết
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;