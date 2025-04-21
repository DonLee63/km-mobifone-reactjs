import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
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
    : "https://via.placeholder.com/345x220?text=No+Image";

  const cities = [
    "Hà Nội",
    "TP. Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "Khác",
  ];

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
          maxWidth: 345,
          margin: "10px",
          boxShadow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRadius: 2,
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={imageSrc}
          alt={product.title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "16px",
          }}
        >
          <div>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                lineHeight: 1.2,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginBottom: "8px",
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
                mb: "8px",
              }}
            >
              <VisibilityIcon sx={{ fontSize: "16px" }} />
              {product.views || 0} lượt xem
            </Typography>
          </div>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => navigate(`/promotion/${product.id}`)}
              sx={{
                flex: 1,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Xem chi tiết
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={handleOpen}
              sx={{
                flex: 1,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Liên hệ ngay
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Modal để nhập thông tin liên hệ */}
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="contact-modal-title"
  aria-describedby="contact-modal-description"
>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: { xs: "90%", sm: 700 }, // Tăng chiều rộng tổng thể của modal
      bgcolor: "background.paper",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      borderRadius: 3,
      overflow: "hidden",
      transition: "all 0.3s ease-in-out",
    }}
  >
    <Grid container>
      {/* Cột hình ảnh bên trái */}
      <Grid
        item
        xs={12}
        sm={6} // Tăng chiều rộng từ sm={5} lên sm={6}
        sx={{
          display: { xs: "none", sm: "block" },
          bgcolor: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%", // Đảm bảo Box chiếm hết chiều rộng
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <img
            src="https://api.mobifone.vn/images/article/1744941873637_simso-mobifone-voucher-2tr.jpg"
            alt="Contact Illustration"
            style={{
              width: "100%", // Đảm bảo hình ảnh chiếm hết chiều rộng của Box
              height: "100%", // Giữ chiều cao đầy đủ
              objectFit: "cover", // Hình ảnh vẫn lấp đầy không gian
              borderRadius: "8px",
            }}
          />
        </Box>
      </Grid>
      {/* Cột form bên phải */}
      <Grid item xs={12} sm={6}> {/* Giảm chiều rộng từ sm={7} xuống sm={6} */}
        <Box sx={{ p: 4, position: "relative" }}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="contact-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Liên hệ nhận tư vấn
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
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
                  borderRadius: "8px",
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1976d2",
                  },
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
                  borderRadius: "8px",
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1976d2",
                  },
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
                  borderRadius: "8px",
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1976d2",
                  },
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
              InputProps={{
                autoComplete: "new-city",
                list: "cities",
              }}
              inputProps={{
                list: "cities",
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1976d2",
                  },
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
                  borderRadius: "8px",
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1976d2",
                  },
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
                fontWeight: "bold",
                borderRadius: "8px",
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
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
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <CheckCircleIcon
            sx={{ fontSize: 60, color: "success.main", mb: 2 }}
          />
          <Typography
            id="thank-you-modal-title"
            variant="h5"
            component="h2"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Cảm ơn bạn đã liên hệ!
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleThankYouClose}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "8px",
              py: 1,
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
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