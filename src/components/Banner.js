import React from "react";
import Slider from "react-slick";
import { CardMedia, Box, useMediaQuery, useTheme } from "@mui/material";
import "slick-carousel/slick/slick.css"; // CSS cho react-slick
import "slick-carousel/slick/slick-theme.css"; // Theme cho react-slick

const Banner = () => {
  // Mảng chứa các hình ảnh
  const banners = [
    {
      id: 1,
      image: "https://api.mobifone.vn/images/banner/1740988773752_5GLQ-mobifone.jpg",
    },
    {
      id: 2,
      image: "https://api.mobifone.vn/images/banner/1739258686383_mobifone-dau-so-9199.jpg",
    },
    {
      id: 3,
      image: "https://api.mobifone.vn/images/banner/1739754044857_D25-goi-data-2025-mobifone.jpg",
    },
    {
      id: 4,
      image: "https://api.mobifone.vn/images/banner/1728634466668_3.jpg",
    },
  ];

  // Sử dụng theme và media query để responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Cấu hình cho slider
  const settings = {
    dots: true, // Hiển thị các dấu chấm điều hướng
    infinite: true, // Lặp lại slideshow
    speed: 500, // Tốc độ chuyển slide (ms)
    slidesToShow: 1, // Số slide hiển thị mặc định
    slidesToScroll: 1, // Số slide cuộn mỗi lần
    autoplay: true, // Tự động chạy
    autoplaySpeed: 3000, // Thời gian giữa các slide (ms)
    arrows: true, // Hiển thị mũi tên điều hướng
    responsive: [
      {
        breakpoint: 600, // Màn hình nhỏ hơn 600px (mobile)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Ẩn mũi tên trên mobile
        },
      },
      {
        breakpoint: 960, // Màn hình từ 600px đến 960px (tablet)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 1200, // Màn hình lớn hơn 960px (desktop)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: { xs: "0", sm: "0", md: "0" }, // Bỏ padding
      }}
    >
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <CardMedia
              component="img"
              height={{ xs: 200, sm: 300, md: 400 }} // Điều chỉnh chiều cao responsive
              image={banner.image}
              alt="Banner"
              sx={{
                width: "100%",
                objectFit: "cover", // Đảm bảo hình ảnh lấp đầy không gian
                borderRadius: { xs: 0, sm: 2, md: 2 }, // Bo góc nhẹ trên tablet và desktop
              }}
            />
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default Banner;