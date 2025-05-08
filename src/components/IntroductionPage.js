import React from "react";
import { Typography, Box, Container, Grid, CardMedia, Button, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "80vh",
  backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://solutions.mobifone.vn/solutions/thumbnail/_default_upload_bucket/19/image-thumb__19__1920_jpg/1708489100496_Website-4320x1185.a27907b6.jpg')",
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
    height: "60vh", // Giảm chiều cao trên mobile
    justifyContent: "center",
    textAlign: "center", // Căn giữa nội dung trên mobile
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down("xs")]: {
    height: "50vh", // Giảm thêm trên màn hình rất nhỏ
    padding: theme.spacing(1),
  },
}));

const StyledSection = styled(Box)(({ theme }) => ({
  my: 12,
  py: 8,
  marginTop: "66px",
  borderRadius: "16px",
  background: "linear-gradient(135deg, #f5f7fa 0%, #e3f2fd 100%)",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const AchievementCard = styled(Box)(({ theme }) => ({
  p: 4,
  borderRadius: "20px",
  background: "linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%)",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 12px 40px rgba(25, 118, 210, 0.2)",
    transform: "translateY(-8px)",
  },
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const CTAButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
  color: "white",
  px: 5,
  py: 1.5,
  borderRadius: "30px",
  fontWeight: "bold",
  "&:hover": {
    background: "linear-gradient(90deg, #1565c0 0%, #2196f3 100%)",
    transform: "scale(1.05)",
    transition: "all 0.3s ease",
  },
}));

const IntroductionPage = () => {
  return (
    <Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      {/* Hero Section */}
      <HeroSection>
        <Box
          sx={{
            maxWidth: { xs: "100%", sm: "600px" }, // Responsive width của nội dung
            textAlign: { xs: "center", sm: "left" }, // Căn giữa trên mobile
          }}
        >
          <CardMedia
            component="img"
            image="https://smartcityasia.vn/wp-content/uploads/2023/04/Logo-Mobifone.webp"
            alt="Mobifone Logo"
            sx={{
              width: { xs: 150, sm: 250 }, // Giảm kích thước logo trên mobile
              mb: 2,
              mx: { xs: "auto", sm: 0 }, // Căn giữa logo trên mobile
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
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" }, // Responsive font size
            }}
          >
            Giới thiệu Solution MobiFone
          </Typography>
          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{
              maxWidth: "600px",
              mb: 4,
              fontSize: { xs: "1rem", sm: "1.25rem" }, // Responsive font size
            }}
          >
            Chúng tôi mang đến các giải pháp công nghệ thông tin tiên tiến để thúc đẩy chuyển đổi số và nâng cao chất lượng cuộc sống.
          </Typography>
        </Box>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Sứ mệnh */}
        <StyledSection>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2", mb: 4 }}>
                Sứ mệnh
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#555", fontSize: "1.1rem" }}>
                Solution MobiFone ra đời với sứ mệnh nâng cao hiệu quả và tính cạnh tranh cho khách hàng thông qua các giải pháp công nghệ thông tin trong hệ sinh thái MobiFone Marketplace. Chúng tôi hướng tới việc xây dựng một xã hội số hóa toàn diện, nơi công nghệ phục vụ con người.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image="https://solutions.mobifone.vn/solutions/thumbnail/_default_upload_bucket/794/image-thumb__794__1920_jpg/1713234448979_Sao%20Khu%C3%AA%201_1.476d9774.jpg"
                alt="Mission Image"
                sx={{ borderRadius: "12px", width: "100%", height: "auto", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
              />
            </Grid>
          </Grid>
        </StyledSection>

        {/* Chuyển đổi số */}
        <StyledSection>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <CardMedia
                component="img"
                image="https://solutions.mobifone.vn/solutions/thumbnail/_default_upload_bucket/1539/image-thumb__1539__1080_jpg/untitled-31-nam.06464a30.jpg"
                alt="Digital Transformation"
                sx={{ borderRadius: "12px", width: "100%", height: "auto", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
              />
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2", mb: 4 }}>
                Chuyển đổi số
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#555", fontSize: "1.1rem" }}>
                Chúng tôi cam kết đồng hành cùng khách hàng trong việc áp dụng công nghệ để thúc đẩy nền kinh tế số và nâng cao chất lượng cuộc sống. Với hệ sinh thái dịch vụ đa dạng, chúng tôi mang đến:
              </Typography>
              <Box component="ul" sx={{ pl: 4, color: "#555", mb: 2, fontSize: "1.1rem" }}>
                <li>Mạng 4G/5G trên toàn quốc với tốc độ cao và ổn định.</li>
                <li>Cơ sở hạ tầng viễn thông hiện đại, đáp ứng mọi nhu cầu.</li>
                <li>Dịch vụ đa dạng cho mọi phân khúc khách hàng.</li>
                <li>Giải pháp công nghệ tiên tiến cho chuyển đổi số hiệu quả.</li>
              </Box>
            </Grid>
          </Grid>
        </StyledSection>

        {/* Kinh nghiệm */}
        <StyledSection sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2", mb: 4 }}>
            Kinh nghiệm
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#555", fontSize: "1.1rem", maxWidth: "800px", mx: "auto" }}>
            Với hơn 10 năm kinh nghiệm trong lĩnh vực phần mềm, chúng tôi tự hào mang đến các giải pháp công nghệ thông tin chất lượng cao, được tối ưu hóa để đáp ứng nhu cầu đa dạng của khách hàng.
          </Typography>
        </StyledSection>

        {/* Giải thưởng và thành tựu */}
        <StyledSection>
          <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2", mb: 6, textAlign: "center" }}>
            Giải thưởng và thành tựu
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <AchievementCard>
                <CardMedia
                  component="img"
                  image="https://solutions.mobifone.vn/solutions/thumbnail/_default_upload_bucket/794/image-thumb__794__1920_jpg/1713234448979_Sao%20Khu%C3%AA%201_1.476d9774.jpg"
                  alt="Sao Khuê 2024"
                  sx={{ borderRadius: "12px 12px 0 0", width: "100%", height: "180px", objectFit: "cover" }}
                />
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    Sao Khuê 2024
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
                    Đạt 5 sao và 5 giải thưởng cho các giải pháp như ClipTV, MobiGame, Sổ tay Đảng viên điện tử, Nền tảng MobiOn.
                  </Typography>
                  <Link href="https://solutions.mobifone.vn/saokhue2024" target="_blank" sx={{ color: "#1976d2", textDecoration: "underline" }}>
                    Xem chi tiết
                  </Link>
                </Box>
              </AchievementCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AchievementCard>
                <CardMedia
                  component="img"
                  image="https://solutions.mobifone.vn/solutions/thumbnail/_default_upload_bucket/1539/image-thumb__1539__1080_jpg/untitled-31-nam.06464a30.jpg"
                  alt="Top 10 2023"
                  sx={{ borderRadius: "12px 12px 0 0", width: "100%", height: "180px", objectFit: "cover" }}
                />
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    Top 10 Doanh nghiệp Công nghệ số 2023
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
                    Được chứng nhận ngày 22/9/2023, lần thứ 7 liên tiếp, Nhóm Doanh nghiệp Công nghệ số tỷ USD.
                  </Typography>
                  <Link href="https://solutions.mobifone.vn/top10-2023" target="_blank" sx={{ color: "#1976d2", textDecoration: "underline" }}>
                    Xem chi tiết
                  </Link>
                </Box>
              </AchievementCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AchievementCard>
                <CardMedia
                  component="img"
                  image="https://solutions.mobifone.vn/solutions/thumbnail/_default_upload_bucket/97/image-thumb__97__1080_jpg/Image-154732687-ExtractWord-0-1217-3061-1700824787.4f4d7b89.png"
                  alt="MobiEdu and MEET"
                  sx={{ borderRadius: "12px 12px 0 0", width: "100%", height: "180px", objectFit: "cover" }}
                />
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    MobiEdu và MEET
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
                    Nền tảng số quốc gia tiềm năng, công nhận ngày 29/11/2023 bởi Bộ TT&TT.
                  </Typography>
                  <Link href="https://solutions.mobifone.vn/mobi-edu-meet" target="_blank" sx={{ color: "#1976d2", textDecoration: "underline" }}>
                    Xem chi tiết
                  </Link>
                </Box>
              </AchievementCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AchievementCard>
                <CardMedia
                  component="img"
                  image="https://solutions.mobifone.vn/solutions/thumbnail/_default_upload_bucket/95/image-thumb__95__1080_jpg/1705569467115.ba104ecb.jpg"
                  alt="Top 10 2022"
                  sx={{ borderRadius: "12px 12px 0 0", width: "100%", height: "180px", objectFit: "cover" }}
                />
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    Top 10 Công ty Công nghệ Uy tín 2022
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
                    Công bố ngày 03/08/2022 bởi Vietnam Report (VNR).
                  </Typography>
                  <Link href="https://solutions.mobifone.vn/top10-2022" target="_blank" sx={{ color: "#1976d2", textDecoration: "underline" }}>
                    Xem chi tiết
                  </Link>
                </Box>
              </AchievementCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AchievementCard>
                <CardMedia
                  component="img"
                  image="https://th.bing.com/th/id/OIP.9O7_wNvHh20vKQjY40xU5QHaEK?w=303&h=180&c=7&r=0&o=7&cb=iwp1&dpr=1.3&pid=1.7&rm=3"
                  alt="Top 10 2021"
                  sx={{ borderRadius: "12px 12px 0 0", width: "100%", height: "180px", objectFit: "cover" }}
                />
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    Top 10 Nhà cung cấp CNTT 2021
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
                    Vinh danh ngày 9/10/2021 bởi VINASA.
                  </Typography>
                  <Link href="https://solutions.mobifone.vn/top10-2021" target="_blank" sx={{ color: "#1976d2", textDecoration: "underline" }}>
                    Xem chi tiết
                  </Link>
                </Box>
              </AchievementCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AchievementCard>
                <CardMedia
                  component="img"
                  image="https://solutions.mobifone.vn/solutions/thumbnail/_default_upload_bucket/90/image-thumb__90__1920_jpg/GDD_0394-768x513.bbecf89b.jpg"
                  alt="Top 10 2021"
                  sx={{ borderRadius: "12px 12px 0 0", width: "100%", height: "180px", objectFit: "cover" }}
                />
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    MobiFone đạt giải thưởng Thương hiệu Quốc gia Việt Nam năm 2024 với 5 sản phẩm
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
                    MobiFone đạt giải thưởng Thương hiệu Quốc gia Việt Nam 2024
                  </Typography>
                  <Link href="https://solutions.mobifone.vn/top10-2021" target="_blank" sx={{ color: "#1976d2", textDecoration: "underline" }}>
                    Xem chi tiết
                  </Link>
                </Box>
              </AchievementCard>
            </Grid>
          </Grid>
        </StyledSection>

        {/* Câu chuyện thương hiệu */}
        <StyledSection>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2", mb: 4 }}>
                Câu chuyện thương hiệu
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#555", fontSize: "1.1rem" }}>
                MobiFone được thành lập ngày 16/4/1993, là mạng di động đầu tiên của Việt Nam và nhà cung cấp dịch vụ viễn thông lớn thứ ba. Với khẩu hiệu "Mọi lúc - Mọi nơi", trong 31 năm qua, chúng tôi đã phát triển thành doanh nghiệp công nghệ số với hệ sinh thái số toàn diện.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image="https://solutions.mobifone.vn/solutions/thumbnail/_default_upload_bucket/97/image-thumb__97__1080_jpg/Image-154732687-ExtractWord-0-1217-3061-1700824787.4f4d7b89.png"
                alt="Brand Story Image"
                sx={{ borderRadius: "12px", width: "100%", height: "auto", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
              />
            </Grid>
          </Grid>
        </StyledSection>

        {/* Môi trường làm việc */}
        <StyledSection>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <CardMedia
                component="img"
                image="https://solutions.mobifone.vn/solutions/thumbnail/_default_upload_bucket/94/image-thumb__94__1080_jpg/369684174_203605446042680_386503508214484405_n.2bf82868.jpg"
                alt="Workplace Image"
                sx={{ borderRadius: "12px", width: "100%", height: "auto", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
              />
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2", mb: 4 }}>
                Môi trường làm việc
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#555", fontSize: "1.1rem" }}>
                Tại MobiFone, chúng tôi tạo môi trường làm việc mở, thúc đẩy sự hợp tác và sáng tạo. Văn phòng được thiết kế với ánh sáng tự nhiên, cùng các lợi ích như bảo hiểm y tế, nghỉ phép hào phóng, và cơ hội phát triển sự nghiệp.
              </Typography>
            </Grid>
          </Grid>
        </StyledSection>
      </Container>
    </Box>
  );
};

export default IntroductionPage;