import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button, // Thêm Button vào đây
  Modal,
  Box,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axiosClient from "../api/axiosClient";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [formData, setFormData] = useState({
    promotion_content_id: product.id,
    full_name: "",
    email: "",
    phone_number: "",
    city: "",
    note: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  const imageSrc = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${API_BASE_URL}${product.image}`
    : "https://via.placeholder.com/300x200?text=No+Image";

  const cities = ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Khác"];

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError("");
    setFormData({
      promotion_content_id: product.id,
      full_name: "",
      email: "",
      phone_number: "",
      city: "",
      note: "",
    });
  };

  const handleThankYouOpen = () => setThankYouOpen(true);
  const handleThankYouClose = () => setThankYouOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axiosClient.post("/promotion_contact", formData);
      setLoading(false);
      handleClose();
      handleThankYouOpen();
    } catch (err) {
      setError(
        err.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại!"
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          boxShadow: 2,
          borderRadius: 2,
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-5px)",
            background: "linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)",
          },
          cursor: "pointer", // Thêm con trỏ để chỉ ra card có thể nhấp
        }}
      >
        {/* Hình ảnh bên trái, nhấp để điều hướng */}
        <CardMedia
          component="img"
          sx={{ width: { xs: "100%", sm: 300 }, height: 200, objectFit: "cover" }}
          image={imageSrc}
          alt={product.title}
          onClick={() => navigate(`/promotion/${product.id}`)}
        />
        {/* Nội dung bên phải */}
        <CardContent sx={{ flex: 1, padding: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 700, color: "#1976d2", marginBottom: 1, cursor: "pointer" }}
            onClick={() => navigate(`/promotion/${product.id}`)}
          >
            {product.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ marginRight: 2 }}>
              {product.created_at
                ? new Date(product.created_at).toLocaleDateString("vi-VN")
                : "Ngày không xác định"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <VisibilityIcon sx={{ fontSize: "18px", marginRight: 1 }} />
              {product.views || 0} lượt xem
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.6,
              color: "#555",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.content.replace(/<[^>]+>/g, "")} {/* Loại bỏ thẻ HTML */}
          </Typography>
        </CardContent>
      </Card>

      {/* Modal để nhập thông tin liên hệ */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="contact-modal-title"
        aria-describedby="contact-modal-description"
        sx={{ "& .MuiBackdrop-root": { backdropFilter: "blur(2px)" } }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 800 },
            bgcolor: "#fff",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            borderRadius: 4,
            overflow: "hidden",
            transition: "all 0.3s ease-in-out",
            animation: "fadeIn 0.3s ease-in",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: { xs: "none", sm: "block" },
                bgcolor: "linear-gradient(135deg, #1976d2, #42a5f5)",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.3)",
                    zIndex: 1,
                  },
                }}
              >
                <img
                  src="https://api.mobifone.vn/images/article/1744941873637_simso-mobifone-voucher-2tr.jpg"
                  alt="Contact Illustration"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px 0 0 8px",
                    position: "relative",
                    zIndex: 2,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 4, position: "relative", bgcolor: "#f9f9f9" }}>
                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "#1976d2",
                    "&:hover": { color: "#1565c0" },
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  id="contact-modal-title"
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 700, mb: 2, color: "#1976d2" }}
                >
                  Liên hệ nhận tư vấn
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  Vui lòng điền thông tin để nhận tư vấn về sản phẩm:{" "}
                  <strong>{product.title}</strong>
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    margin="normal"
                    size="small"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        "&:hover fieldset": { borderColor: "#1976d2" },
                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    size="small"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        "&:hover fieldset": { borderColor: "#1976d2" },
                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    margin="normal"
                    size="small"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        "&:hover fieldset": { borderColor: "#1976d2" },
                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Thành phố"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    margin="normal"
                    size="small"
                    autoComplete="off"
                    variant="outlined"
                    InputProps={{ autoComplete: "new-city", list: "cities" }}
                    inputProps={{ list: "cities" }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        "&:hover fieldset": { borderColor: "#1976d2" },
                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                      },
                    }}
                  />
                  <datalist id="cities">
                    {cities.map((city) => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
                  <TextField
                    fullWidth
                    label="Ghi chú"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    margin="normal"
                    size="small"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        "&:hover fieldset": { borderColor: "#1976d2" },
                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                      },
                    }}
                  />
                  {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                      {error}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      mt: 3,
                      py: 1.5,
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: "10px",
                      background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #1565c0, #2196f3)",
                        boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                      },
                      transition: "all 0.3s ease",
                    }}
                    disabled={loading}
                  >
                    {loading ? "Đang gửi..." : "Gửi thông tin"}
                  </Button>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {/* Modal cảm ơn */}
      <Modal
        open={thankYouOpen}
        onClose={handleThankYouClose}
        aria-labelledby="thank-you-modal-title"
        sx={{ "& .MuiBackdrop-root": { backdropFilter: "blur(2px)" } }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 450 },
            bgcolor: "#fff",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            transition: "all 0.3s ease-in-out",
            background: "linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)",
            animation: "fadeIn 0.3s ease-in",
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 80, color: "success.main", mb: 3 }} />
          <Typography
            id="thank-you-modal-title"
            variant="h4"
            component="h2"
            sx={{ fontWeight: 700, mb: 2, color: "#1976d2" }}
          >
            Cảm ơn bạn!
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleThankYouClose}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "10px",
              py: 1.5,
              background: "linear-gradient(45deg, #1976d2, #42a5f5)",
              "&:hover": {
                background: "linear-gradient(45deg, #1565c0, #2196f3)",
                boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Đóng
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ProductCard;