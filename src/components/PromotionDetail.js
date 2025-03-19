import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import Header from "./Header";

const PromotionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promotion, setPromotion] = useState(null);
  const [contentImages, setContentImages] = useState([]);
  const [contentText, setContentText] = useState("");
  const [otherPromotions, setOtherPromotions] = useState([]); // State mới để lưu các khuyến mãi khác

  // Định nghĩa URL cơ sở của API Laravel
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  useEffect(() => {
    // Lấy chi tiết chương trình khuyến mãi hiện tại
    axiosClient
      .get(`/promotions/${id}`)
      .then((response) => {
        console.log("Promotion Detail Response:", response.data);
        setPromotion(response.data);
        parseContent(response.data.content);
      })
      .catch((error) => console.error("Error fetching promotion:", error));

    // Lấy danh sách tất cả các chương trình khuyến mãi
    axiosClient
      .get("/promotions")
      .then((response) => {
        console.log("Other Promotions Response:", response.data);
        // Lọc để loại bỏ chương trình hiện tại
        const filteredPromotions = response.data.filter((promo) => promo.id !== parseInt(id));
        setOtherPromotions(filteredPromotions);
      })
      .catch((error) => console.error("Error fetching other promotions:", error));
  }, [id]);

  const parseContent = (htmlContent) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    const images = tempDiv.querySelectorAll("img");
    const imageSources = Array.from(images).map((img) => {
      let src = img.getAttribute("src");
      if (src.startsWith("/")) {
        src = `${API_BASE_URL}${src}`;
      }
      return {
        src,
        width: img.getAttribute("width"),
        height: img.getAttribute("height"),
        style: img.getAttribute("style"),
      };
    });

    const textDiv = document.createElement("div");
    textDiv.innerHTML = htmlContent;

    const figures = textDiv.querySelectorAll("figure");
    figures.forEach((figure) => figure.remove());

    const standaloneImages = textDiv.querySelectorAll("img");
    standaloneImages.forEach((img) => img.remove());

    const text = textDiv.innerHTML;

    setContentImages(imageSources);
    setContentText(text);
  };

  if (!promotion) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
              {promotion.title}
            </Typography>

            {contentImages.length > 0 && (
              <Card sx={{ mb: 3 }}>
                <CardMedia
                  component="img"
                  image={contentImages[0].src}
                  alt={promotion.title}
                  sx={{
                    width: "100%",
                    maxHeight: "500px",
                    objectFit: "contain",
                  }}
                />
              </Card>
            )}

            <div
              dangerouslySetInnerHTML={{ __html: contentText }}
              style={{ lineHeight: 1.6, color: "#555" }}
            />

            {contentImages.length > 1 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Hình ảnh khuyến mãi
                </Typography>
                <Grid container spacing={2}>
                  {contentImages.slice(1).map((img, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card>
                        <CardMedia
                          component="img"
                          image={img.src}
                          alt={`Ảnh khuyến mãi ${index + 1}`}
                          sx={{
                            height: 200,
                            objectFit: "contain",
                          }}
                        />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            <Box sx={{ my: 2 }}>
              <Typography variant="h6" gutterBottom>
                Thời gian khuyến mãi
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Chip
                  label={`Bắt đầu: ${promotion.start_at ? new Date(promotion.start_at).toLocaleDateString("vi-VN") : "Không xác định"}`}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={`Kết thúc: ${promotion.end_at ? new Date(promotion.end_at).toLocaleDateString("vi-VN") : "Không xác định"}`}
                  color="error"
                  variant="outlined"
                />
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="success"
                sx={{ mr: 2 }}
                onClick={() => alert("Copied coupon!")}
              >
                Copy Coupon
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => window.open("https://www.hawkhost.com", "_blank")}
              >
                Sign Up Now
              </Button>
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Danh sách các khuyến mãi khác */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Các chương trình khuyến mãi khác
                </Typography>
                {otherPromotions.length > 0 ? (
                  <List>
                    {otherPromotions.map((promo) => (
                      <ListItem
                        key={promo.id}
                        button
                        onClick={() => navigate(`/promotion/${promo.id}`)}
                        sx={{ borderBottom: "1px solid #eee" }}
                      >
                        <ListItemText
                          primary={promo.title}
                          secondary={`Từ ${new Date(promo.start_at).toLocaleDateString("vi-VN")} đến ${new Date(promo.end_at).toLocaleDateString("vi-VN")}`}
                          primaryTypographyProps={{ fontWeight: "bold", color: "#1976d2" }}
                          secondaryTypographyProps={{ color: "#777" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Không có chương trình khuyến mãi nào khác.
                  </Typography>
                )}
              </CardContent>
            </Card>

            {/* Thông tin bổ sung */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Thông tin liên quan
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Đánh giá Hawk Host" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Ưu đãi tên miền" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Trạng thái khuyến mãi */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Trạng thái
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                  <Chip
                    label={promotion.status === "active" ? "Đang hoạt động" : "Kết thúc"}
                    color={promotion.status === "active" ? "success" : "default"}
                    sx={{ fontWeight: "bold" }}
                  />
                </Box>
                <Typography variant="body2">
                  {new Date() < new Date(promotion.end_at)
                    ? "Khuyến mãi vẫn còn hiệu lực"
                    : "Khuyến mãi đã kết thúc"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default PromotionDetail;