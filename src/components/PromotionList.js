import React from "react";
import { Card, CardContent, Typography, Grid, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PromotionList = ({ promotions }) => {
  const navigate = useNavigate();

  console.log("Promotions in PromotionList:", promotions); // Kiểm tra dữ liệu truyền vào

  if (!promotions || promotions.length === 0) {
    return <Typography>Không có chương trình khuyến mãi nào.</Typography>;
  }

  return (
    <Grid container spacing={3}>
      {promotions.map((promo) => (
        <Grid item xs={12} sm={6} md={4} key={promo.id}>
          <Card onClick={() => navigate(`/promotion/${promo.id}`)} style={{ cursor: "pointer" }}>
            <CardContent>
              <Typography variant="h6">{promo.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                Từ {promo.start_at ? new Date(promo.start_at).toLocaleDateString() : "N/A"} đến{" "}
                {promo.end_at ? new Date(promo.end_at).toLocaleDateString() : "N/A"}
              </Typography>
              <Typography
                variant="body2"
                color={promo.status === "active" ? "green" : "red"}
              >
                Trạng thái: {promo.status === "active" ? "Đang diễn ra" : "Đã kết thúc"}
              </Typography>
              {promo.tag_ids && (
                <div style={{ marginTop: "10px" }}>
                  {promo.tag_ids.split(",").map((tag) => (
                    <Chip key={tag} label={tag} size="small" style={{ marginRight: "5px" }} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PromotionList;