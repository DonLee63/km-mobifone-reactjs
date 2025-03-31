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
      const activeBanners = data.filter(banner => banner.status === "active");
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
      return "https://via.placeholder.com/1200x400?text=No+Image"; // Ảnh mặc định
    }
    if (image.startsWith("http")) {
      return image; // Nếu đã là URL tuyệt đối
    }
    // Đảm bảo có dấu / giữa API_BASE_URL và image
    return `${API_BASE_URL}/${image.startsWith("/") ? image.slice(1) : image}`;
  };

  const handleBannerClick = (link) => {
    if (link) {
      window.location.href = link;
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } },
      { breakpoint: 960, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: true } },
      { breakpoint: 1200, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: true } },
    ],
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: { xs: "0", sm: "0", md: "0" } }}>
      <Slider {...settings}>
        {error ? (
          <div>{error}</div>
        ) : banners.length > 0 ? (
          banners.map((banner) => (
            <div key={banner.id} onClick={() => handleBannerClick(banner.link)}>
              <CardMedia
                component="img"
                height={{ xs: 200, sm: 300, md: 400 }}
                image={getImageSrc(banner.image)}
                alt={banner.title || "Banner"}
                sx={{
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: { xs: 0, sm: 2, md: 2 },
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