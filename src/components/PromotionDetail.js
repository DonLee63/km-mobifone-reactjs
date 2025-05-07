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
  TextField,
  IconButton,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReplyIcon from "@mui/icons-material/Reply";
import Header from "./Header";

const PromotionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promotion, setPromotion] = useState(null);
  const [contentImages, setContentImages] = useState([]);
  const [contentText, setContentText] = useState("");
  const [otherPromotions, setOtherPromotions] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    content: "",
    parent_id: null,
  });
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  // Lấy thông tin từ localStorage khi component mount
  useEffect(() => {
    const savedName = localStorage.getItem("commenterName");
    const savedEmail = localStorage.getItem("commenterEmail");
    if (savedName && savedEmail) {
      setCommentForm((prev) => ({
        ...prev,
        name: savedName,
        email: savedEmail,
      }));
    }

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
        const filteredPromotions = response.data.filter(
          (promo) => promo.id !== parseInt(id)
        );
        setOtherPromotions(filteredPromotions);
      })
      .catch((error) => console.error("Error fetching other promotions:", error));

    // Lấy danh sách bình luận
    fetchComments();
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

  const fetchComments = async () => {
    try {
      const response = await axiosClient.get(`/comments/${id}`);
      console.log("Comments Response:", response.data);
      setComments(response.data.data || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setComments([]);
    }
  };

  const handleCommentOpen = (parentId = null) => {
    setCommentForm((prev) => ({ ...prev, parent_id: parentId }));
    setCommentOpen(true);
  };

  const handleCommentClose = () => {
    setCommentOpen(false);
    setCommentError("");
    setCommentForm((prev) => ({ ...prev, content: "", parent_id: null }));
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentError("");
    setLoading(true);

    try {
      const response = await axiosClient.post("/comments", {
        promotion_id: id,
        ...commentForm,
      });
      localStorage.setItem("commenterName", commentForm.name);
      localStorage.setItem("commenterEmail", commentForm.email);
      setLoading(false);
      handleCommentClose();
      fetchComments();
    } catch (err) {
      setCommentError(
        err.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại!"
      );
      setLoading(false);
    }
  };

  if (!promotion) return <Typography>Loading...</Typography>;

  // Component để hiển thị bình luận và các trả lời lồng ghép
  const RenderComment = ({ comment, level = 0 }) => (
    <Box
      sx={{
        mb: 1,
        borderLeft: level > 0 ? `2px solid #d32f2f` : "none", // Đường viền bên trái cho bình luận con
        pl: level * 3, // Thụt lề cho các bình luận con
      }}
    >
      <ListItem
        sx={{
          bgcolor: level % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
          borderRadius: 2,
          py: 1,
          px: 2,
        }}
      >
        <ListItemText
          primary={
            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: "#333" }}>
              {comment.name}{" "}
              <span style={{ color: "#757575" }}>
                ({new Date(comment.created_at).toLocaleDateString("vi-VN")})
              </span>
            </Typography>
          }
          secondary={
            <Box>
              <Typography variant="body2" sx={{ mt: 0.5, color: "#555" }}>
                {comment.content}
              </Typography>
              <Button
                startIcon={<ReplyIcon />}
                size="small"
                sx={{ mt: 1, color: "#d32f2f", textTransform: "none" }}
                onClick={() => handleCommentOpen(comment.id)}
              >
                Trả lời
              </Button>
            </Box>
          }
        />
      </ListItem>
      {comment.replies && comment.replies.length > 0 && (
        <Box sx={{ mt: 1 }}>
          {comment.replies.map((reply) => (
            <RenderComment key={reply.id} comment={reply} level={level + 1} />
          ))}
        </Box>
      )}
    </Box>
  );

  return (
    <div>
      {/* <Header /> */}
      <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#333" }}
            >
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
                  label={`Bắt đầu: ${promotion.start_at
                    ? new Date(promotion.start_at).toLocaleDateString("vi-VN")
                    : "Không xác định"
                    }`}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={`Kết thúc: ${promotion.end_at
                    ? new Date(promotion.end_at).toLocaleDateString("vi-VN")
                    : "Không xác định"
                    }`}
                  color="error"
                  variant="outlined"
                />
              </Box>
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
                          primaryTypographyProps={{
                            fontWeight: "bold",
                            color: "#1976d2",
                          }}
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

            {/* Trạng thái khuyến mãi */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Trạng thái
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                  <Chip
                    label={
                      promotion.status === "active" ? "Đang hoạt động" : "Kết thúc"
                    }
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

            {/* Danh sách bình luận */}
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#d32f2f" }}
                >
                  Bình luận ({comments.length})
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleCommentOpen(null)}
                  sx={{
                    mb: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    borderColor: "#d32f2f",
                    color: "#d32f2f",
                    "&:hover": {
                      background: "rgba(211, 47, 47, 0.1)",
                      borderColor: "#b71c1c",
                      color: "#b71c1c",
                    },
                  }}
                >
                  Viết bình luận
                </Button>
                {comments.length > 0 ? (
                  <List>
                    {comments.map((comment) => (
                      <RenderComment key={comment.id} comment={comment} />
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Chưa có bình luận nào.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Modal bình luận */}
      <Modal
        open={commentOpen}
        onClose={handleCommentClose}
        aria-labelledby="comment-modal-title"
        sx={{ "& .MuiBackdrop-root": { backdropFilter: "blur(2px)" } }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 600 },
            bgcolor: "#fff",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            p: 4,
            borderRadius: 4,
            overflow: "auto",
            maxHeight: "80vh",
            transition: "all 0.3s ease-in-out",
            animation: "fadeIn 0.3s ease-in",
          }}
        >
          <IconButton
            onClick={handleCommentClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#d32f2f",
              "&:hover": { color: "#b71c1c" },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="comment-modal-title"
            variant="h5"
            component="h2"
            sx={{ fontWeight: 700, mb: 3, color: "#d32f2f" }}
          >
            {commentForm.parent_id ? "Trả lời bình luận" : "Đánh giá và bình luận"}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Vui lòng điền thông tin để {commentForm.parent_id ? "trả lời" : "gửi bình luận về sản phẩm"}:{" "}
            <strong>{promotion.title}</strong>
          </Typography>
          <form onSubmit={handleCommentSubmit}>
            <TextField
              fullWidth
              label="Tên của bạn"
              name="name"
              value={commentForm.name}
              onChange={handleCommentChange}
              required
              margin="normal"
              size="small"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "&:hover fieldset": { borderColor: "#d32f2f" },
                  "&.Mui-focused fieldset": { borderColor: "#d32f2f" },
                },
              }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={commentForm.email}
              onChange={handleCommentChange}
              required
              margin="normal"
              size="small"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "&:hover fieldset": { borderColor: "#d32f2f" },
                  "&.Mui-focused fieldset": { borderColor: "#d32f2f" },
                },
              }}
            />
            <TextField
              fullWidth
              label="Nội dung bình luận"
              name="content"
              value={commentForm.content}
              onChange={handleCommentChange}
              required
              multiline
              rows={4}
              margin="normal"
              size="small"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "&:hover fieldset": { borderColor: "#d32f2f" },
                  "&.Mui-focused fieldset": { borderColor: "#d32f2f" },
                },
              }}
            />
            {commentError && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {commentError}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: 700,
                borderRadius: "10px",
                background: "linear-gradient(45deg, #d32f2f, #f44336)",
                "&:hover": {
                  background: "linear-gradient(45deg, #b71c1c, #c62828)",
                  boxShadow: "0 6px 16px rgba(211, 47, 47, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "Gửi bình luận"}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default PromotionDetail;