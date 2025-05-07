import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { CardMedia, Box, useMediaQuery, useTheme } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Định nghĩa URL cơ sở của API
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/banners`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const activeBanners = data.filter((banner) => banner.status === "active");
      const shuffled = activeBanners.sort(() => 0.5 - Math.random());
      const selectedBanners = shuffled.slice(0, 4);
      setBanners(selectedBanners);
    } catch (error) {
      console.error("Error fetching banners:", error);
      setError("Không thể tải banners. Vui lòng kiểm tra API.");
    }
  };

  // Xử lý đường dẫn ảnh
  const getImageSrc = (image) => {
    if (!image) {
      return "https://via.placeholder.com/1920x600?text=No+Image";
    }
    if (image.startsWith("http")) {
      return image;
    }
    return `${API_BASE_URL}/${image.startsWith("/") ? image.slice(1) : image}`;
  };

  const handleBannerClick = (link) => {
    if (link) {
      window.location.href = link;
    }
  };

  // Custom arrows - Đặt trước settings
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "rgba(0, 0, 0, 0.5)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          right: "20px",
        }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "rgba(0, 0, 0, 0.5)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          left: "20px",
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  };

  // Settings được đặt sau khi khai báo SampleNextArrow và SamplePrevArrow
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } },
      { breakpoint: 960, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: true } },
      { breakpoint: 1200, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: true } },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: 0,
        padding: 0,
        position: "relative",
        background: "linear-gradient(90deg, #1e3c72, #2a5298)",
        overflow: "hidden",
      }}
    >
      <Slider {...settings}>
        {error ? (
          <div>{error}</div>
        ) : banners.length > 0 ? (
          banners.map((banner) => (
            <div key={banner.id} onClick={() => handleBannerClick(banner.link)}>
              <CardMedia
                component="img"
                image={getImageSrc(banner.image)}
                alt={banner.title || "Banner"}
                sx={{
                  width: "100%",
                  height: "auto",
                  minHeight: { xs: 200, sm: 300, md: 400 },
                  objectFit: "contain",
                  cursor: banner.link ? "pointer" : "default",
                }}
              />
            </div>
          ))
        ) : (
          <div>Loading banners...</div>
        )}
      </Slider>
    </Box>
  );
};

export default Banner;