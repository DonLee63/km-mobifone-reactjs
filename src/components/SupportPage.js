import React, { useState } from "react";
import { Typography, Box, Container, Grid, CardMedia, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChatIcon from "@mui/icons-material/Chat";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import BuildIcon from "@mui/icons-material/Build";
import Link from "@mui/material/Link";

const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  height: { xs: "50vh", sm: "60vh", md: "70vh" },
  background: " url('https://solutions.mobifone.vn/solutions/thumbnail/_default_upload_bucket/94/image-thumb__94__1080_jpg/369684174_203605446042680_386503508214484405_n.2bf82868.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-end",
  textAlign: "left",
  color: "white",
  borderRadius: "16px",
  mb: 12,
  padding: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    textAlign: "center",
    justifyContent: "center",
  },
  [theme.breakpoints.down("xs")]: {
    padding: theme.spacing(1),
  },
}));

const StyledSection = styled(Box)(({ theme }) => ({
  my: 12,
  py: 8,
  px: 4,
  marginTop: "66px",
  borderRadius: "16px",
  background: "linear-gradient(135deg, #f5f7fa 0%, #e3f2fd 100%)",
  boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-6px)",
  },
}));

const FAQCard = styled(Box)(({ theme }) => ({
  p: 3,
  borderRadius: "16px",
  padding: "16px 24px",
  background: "linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%)",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 8px 20px rgba(25, 118, 210, 0.2)",
    transform: "translateY(-4px)",
  },
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const SupportCard = styled(Box)(({ theme }) => ({
  p: 3,
  borderRadius: "16px",
  background: "linear-gradient(135deg, #ffffff 0%, #e6f0fa 100%)",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  height: "100%",
  "&:hover": {
    boxShadow: "0 8px 24px rgba(25, 118, 210, 0.25)",
    transform: "translateY(-6px)",
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
  color: "white",
  px: 6,
  py: 2,
  borderRadius: "30px",
  fontWeight: "bold",
  textTransform: "none",
  "&:hover": {
    background: "linear-gradient(90deg, #1565c0 0%, #2196f3 100%)",
    transform: "scale(1.1)",
    boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
  },
}));

const SupportPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "Làm thế nào để đăng ký dịch vụ?",
      answer: "Bạn có thể đăng ký dịch vụ qua ứng dụng MobiFone, website chính thức, hoặc gọi đến hotline 18001090 để được hướng dẫn.",
      icon: <AccountCircleIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
      question: "Tôi quên mật khẩu tài khoản, làm thế nào để khôi phục?",
      answer: "Để khôi phục mật khẩu, bạn có thể nhấp vào 'Quên mật khẩu' trên trang đăng nhập và làm theo hướng dẫn.",
      icon: <AccountCircleIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
      question: "Tôi có thể thanh toán hóa đơn qua internet không?",
      answer: "Có, bạn có thể thanh toán hóa đơn qua internet thông qua website chính thức của MobiFone hoặc qua các ngân hàng trực tuyến.",
      icon: <PaymentIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
      question: "Làm sao để kiểm tra số dư tài khoản?",
      answer: "Bạn có thể kiểm tra số dư bằng cách soạn tin nhắn theo cú pháp *101# hoặc gọi đến 900 để được hỗ trợ.",
      icon: <PaymentIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
      question: "Làm thế nào để hủy dịch vụ?",
      answer: "Để hủy dịch vụ, bạn có thể soạn tin nhắn theo hướng dẫn trên website hoặc liên hệ tổng đài 18001090.",
      icon: <BuildIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
      question: "Làm thế nào để thay đổi gói cước?",
      answer: "Để thay đổi gói cước, bạn có thể liên hệ với tổng đài 18001090 hoặc đến các cửa hàng MobiFone gần nhất.",
      icon: <BuildIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const faqCategories = [
    { name: "Tài khoản", icon: <AccountCircleIcon sx={{ fontSize: 40, color: "#1976d2" }} /> },
    { name: "Thanh toán", icon: <PaymentIcon sx={{ fontSize: 40, color: "#1976d2" }} /> },
    { name: "Kỹ thuật", icon: <BuildIcon sx={{ fontSize: 40, color: "#1976d2" }} /> },
  ];

  return (
    <Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      {/* Hero Section */}
      <HeroSection>
        <Box
          sx={{
            maxWidth: { xs: "100%", sm: "600px" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <CardMedia
            component="img"
            image="https://smartcityasia.vn/wp-content/uploads/2023/04/Logo-Mobifone.webp"
            alt="Mobifone Logo"
            sx={{
              width: { xs: 150, sm: 250 },
              mb: 3,
              mx: { xs: "auto", sm: 0 },
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            }}
          />
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontSize: { xs: "2rem", sm: "3rem", md: "4.5rem" },
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Hỗ trợ khách hàng
          </Typography>
          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{
              maxWidth: "600px",
              mb: 4,
              fontSize: { xs: "1rem", sm: "1.5rem" },
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
            }}
          >
            Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Liên hệ ngay để được giải đáp!
          </Typography>
          <CTAButton>Liên hệ ngay</CTAButton>
        </Box>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Câu hỏi thường gặp */}
        <StyledSection>
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2", mb: 6, textAlign: "center" }}
          >
            Câu hỏi thường gặp
          </Typography>
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <TextField
              label="Tìm kiếm câu hỏi"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              sx={{
                maxWidth: 600,
                mx: "auto",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Box>
          {filteredFaqs.length > 0 ? (
            faqCategories.map((category) => {
              const categoryFaqs = filteredFaqs.filter((faq) => faq.category === category.name);
              return categoryFaqs.length > 0 ? (
                <Box key={category.name} sx={{ mb: 6 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                    {category.icon}
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", color: "#1976d2", ml: 2 }}
                    >
                      {category.name}
                    </Typography>
                  </Box>
                  <Grid container spacing={4}>
                    {categoryFaqs.map((faq, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <FAQCard>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            {faq.icon}
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold", color: "#1976d2", ml: 2 }}
                            >
                              {faq.question}
                            </Typography>
                          </Box>
                          <Typography sx={{ color: "#555", lineHeight: 1.8 }}>
                            {faq.answer}
                          </Typography>
                        </FAQCard>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : null;
            })
          ) : (
            <Typography sx={{ color: "#555", textAlign: "center", mt: 4 }}>
              Không tìm thấy câu hỏi nào phù hợp. Vui lòng thử từ khóa khác hoặc liên hệ hỗ trợ.
            </Typography>
          )}
        </StyledSection>

        {/* Hỗ trợ trực tuyến */}
        <StyledSection>
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2", mb: 6, textAlign: "center" }}
          >
            Hỗ trợ trực tuyến
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <SupportCard>
                <ChatIcon sx={{ fontSize: 50, color: "#1976d2", mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
                  Chat trực tuyến
                </Typography>
                <Typography sx={{ color: "#555", mb: 2 }}>
                  Nhắn tin ngay với chúng tôi qua ứng dụng MobiFone hoặc website.
                </Typography>
                {/* <CTAButton size="small">Chat ngay</CTAButton> */}
              </SupportCard>
            </Grid>
            <Grid item xs={12} sm={4}>
              <SupportCard>
                <EmailIcon sx={{ fontSize: 50, color: "#1976d2", mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
                  Email hỗ trợ
                </Typography>
                <Typography sx={{ color: "#555", mb: 2 }}>
                  Gửi yêu cầu đến: <Link href="mailto:info@mobifone.vn" sx={{ color: "#1976d2" }}>info@mobifone.vn</Link>
                </Typography>
              </SupportCard>
            </Grid>
            <Grid item xs={12} sm={4}>
              <SupportCard>
                <PhoneIcon sx={{ fontSize: 50, color: "#1976d2", mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
                  Hotline
                </Typography>
                <Typography sx={{ color: "#555", mb: 2 }}>
                  Gọi ngay: <Link href="tel:18001090" sx={{ color: "#1976d2" }}>18001090</Link>
                </Typography>
              </SupportCard>
            </Grid>
          </Grid>
        </StyledSection>

        {/* Liên hệ */}
        <StyledSection sx={{ textAlign: "center", py: 8, background: "linear-gradient(135deg, #1565c0 0%, #2196f3 100%)", color: "white", position: "relative" }}>
          <CardMedia
            component="img"
            image="https://solutions.mobifone.vn/solutions/thumbnail/_default_upload_bucket/97/image-thumb__97__1080_jpg/Image-154732687-ExtractWord-0-1217-3061-1700824787.4f4d7b89.png"
            alt="Contact Image"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.1,
              objectFit: "cover",
              zIndex: 0,
            }}
          />
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h4"
              component="h3"
              gutterBottom
              sx={{ fontWeight: "bold", mb: 4 }}
            >
              Liên hệ với chúng tôi
            </Typography>
            <Typography sx={{ color: "#fff", mb: 4, fontSize: "1.2rem", maxWidth: "800px", mx: "auto" }}>
              Điền thông tin hoặc gọi hotline để được hỗ trợ nhanh nhất.
            </Typography>
            <CTAButton>Gửi yêu cầu hỗ trợ</CTAButton>
          </Box>
        </StyledSection>
      </Container>
    </Box>
  );
};

export default SupportPage;