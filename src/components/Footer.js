import React from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterContainer = styled(Box)({
  backgroundColor: "#0F172A",
  color: "#fff",
  padding: "40px 0",
});

const FooterTitle = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "10px",
  color: "#ffffff",
});

const FooterLink = styled(Link)({
  display: "block",
  color: "#b0bec5",
  textDecoration: "none",
  marginBottom: "5px",
  "&:hover": {
    color: "#4caf50",
  },
});

const Footer = () => {
  return (
    <FooterContainer component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Cột Thông Tin Liên Hệ */}
          <Grid item xs={12} sm={4}>
            <img
              src="https://smartcityasia.vn/wp-content/uploads/2023/04/Logo-Mobifone.webp"
              alt="Logo"
              height="40"
              style={{ marginBottom: "15px" }}
            />
            <Typography variant="body2" color="#b0bec5">
              Tổng công ty Viễn Thông MobiFone
            </Typography>
            <Typography variant="body2" color="#b0bec5">
              📍 Số 01 phố Phạm Văn Bạch, Yên Hòa, Cầu Giấy, Hà Nội.
            </Typography>
            <Typography variant="body2" color="#b0bec5">
              📞 18001290
            </Typography>
            <Typography variant="body2" color="#b0bec5">
              📧 contact-itc@mobifone.vn
            </Typography>
          </Grid>

          {/* Cột Về Chúng Tôi */}
          <Grid item xs={12} sm={2}>
            <FooterTitle variant="h6">Về Chúng Tôi</FooterTitle>
            <FooterLink href="#">Giới thiệu</FooterLink>
            <FooterLink href="#">Tin tức</FooterLink>
            <FooterLink href="#">Liên hệ</FooterLink>
          </Grid>

          {/* Cột Sản Phẩm */}
          <Grid item xs={12} sm={2}>
            <FooterTitle variant="h6">Sản phẩm</FooterTitle>
            <FooterLink href="#">Giải pháp số</FooterLink>
            <FooterLink href="#">Nội dung số</FooterLink>
            <FooterLink href="#">Hạ tầng số</FooterLink>
          </Grid>

          {/* Cột Hỗ Trợ */}
          <Grid item xs={12} sm={2}>
            <FooterTitle variant="h6">Hỗ trợ</FooterTitle>
            <FooterLink href="#">Hướng dẫn sử dụng</FooterLink>
            <FooterLink href="#">Tuyển dụng</FooterLink>
            <FooterLink href="#">Cộng tác viên</FooterLink>
          </Grid>

          {/* Cột Điều Khoản */}
          <Grid item xs={12} sm={2}>
            <FooterTitle variant="h6">Điều khoản</FooterTitle>
            <FooterLink href="#">Điều khoản sử dụng</FooterLink>
            <FooterLink href="#">Bảo mật thông tin</FooterLink>
            <FooterLink href="#">Điều khoản giao dịch</FooterLink>
            <FooterLink href="#">Bảo mật thanh toán</FooterLink>
            <FooterLink href="#">Chính sách giao hàng</FooterLink>
            <FooterLink href="#">Chính sách hoàn tiền</FooterLink>
            <FooterLink href="#">Bảo vệ dữ liệu cá nhân</FooterLink>
            <FooterLink href="#">FAQ</FooterLink>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box textAlign="center" marginTop={4} borderTop="1px solid #4caf50" paddingTop={2}>
          <Typography variant="body2" color="#b0bec5">
            Giấy chứng nhận đăng ký doanh nghiệp: Mã số doanh nghiệp: 0100686209, đăng ký thay đổi lần thứ 12 ngày 16/06/2023, cấp bởi Sở KHĐT Thành phố Hà Nội.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
