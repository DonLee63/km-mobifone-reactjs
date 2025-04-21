import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

// const StyledToolbar = styled(Toolbar)({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   padding: "0 16px",
// });
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 32px", // Tăng padding hai bên để tạo khoảng cách
  maxWidth: "1355px", // Giới hạn chiều rộng của header (có thể thay đổi giá trị này)
  width: "100%",
  margin: "0 auto", // Căn giữa header
  height: "80px",
});

const MenuButtons = styled("div")({
  display: "flex",
  gap: "24px",
});

const SearchContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: "20px",
  padding: "2px 8px",
  width: "300px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "200px",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  fontWeight: "bold",
  textTransform: "none",
  padding: "8px 16px",
  borderRadius: "20px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "translateY(-2px)",
  },
}));

const LogoContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutions, setSolutions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State để lưu từ khóa tìm kiếm
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("/promotions?category_id=2")
      .then((response) => {
        console.log("Solutions Response:", response.data);
        setSolutions(response.data);
      })
      .catch((error) => console.error("Error fetching solutions:", error));
  }, []);

  const toggleDrawer = (open) => () => {
    setMobileOpen(open);
  };

  const handleSolutionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSolutionsClose = () => {
    setAnchorEl(null);
  };

  const handleSolutionSelect = (id) => {
    navigate(`/promotion/${id}`);
    handleSolutionsClose();
  };

  const toggleSolutionsMobile = () => {
    setSolutionsOpen(!solutionsOpen);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  // Xử lý tìm kiếm
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`); // Điều hướng đến trang tìm kiếm
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Gọi tìm kiếm khi nhấn Enter
    }
  };

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        bgcolor: "#1976d2",
        color: "#fff",
        // 
        height: "80px", // Đặt chiều cao cụ thể cho header (có thể thay đổi giá trị này)
        display: "flex",
        alignItems: "center", // Căn giữa nội dung theo chiều dọc
      }}
    >
      <StyledToolbar>
        {isMobile && (
          <IconButton edge="start" onClick={toggleDrawer(true)} sx={{ color: "#fff" }}>
            <MenuIcon />
          </IconButton>
        )}

        <LogoContainer onClick={handleLogoClick}>
          <Typography variant="h6" component="div">
            <img
              src="https://smartcityasia.vn/wp-content/uploads/2023/04/Logo-Mobifone.webp"
              alt="Logo"
              height="40"
            />
          </Typography>
        </LogoContainer>

        {!isMobile && (
          <MenuButtons>
            <StyledButton onClick={() => navigate("/promotions")}>
              Giới thiệu
            </StyledButton>
            <StyledButton onClick={() => navigate("/packages")}>
              Gói cước
            </StyledButton>
            <div>
              <StyledButton
                onClick={handleSolutionsClick}
                endIcon={anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              >
                Giải pháp số
              </StyledButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleSolutionsClose}
                PaperProps={{
                  sx: {
                    bgcolor: "#1976d2",
                    color: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                {solutions.map((solution) => (
                  <MenuItem
                    key={solution.id}
                    onClick={() => handleSolutionSelect(solution.id)}
                    sx={{
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    {solution.title}
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <StyledButton onClick={() => navigate("/news")}>
              Hỗ trợ
            </StyledButton>
          </MenuButtons>
        )}

        {!isMobile && (
          <SearchContainer>
            <InputBase
              placeholder="Tìm kiếm..."
              inputProps={{ "aria-label": "search" }}
              sx={{ ml: 1, flex: 1, color: "#333" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật từ khóa
              onKeyPress={handleKeyPress} // Xử lý khi nhấn Enter
            />
            <IconButton
              type="button"
              aria-label="search"
              sx={{ color: "#1976d2" }}
              onClick={handleSearch} // Xử lý khi nhấp vào icon
            >
              <SearchIcon />
            </IconButton>
          </SearchContainer>
        )}
      </StyledToolbar>

      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250, bgcolor: "#1976d2", color: "#fff", height: "100%" }}>
          <ListItem>
            <IconButton
              edge="start"
              onClick={toggleDrawer(false)}
              sx={{ color: "#fff", marginLeft: "auto" }}
            >
              <CloseIcon />
            </IconButton>
          </ListItem>
          <ListItem button onClick={() => navigate("/promotions")}>
            <ListItemText primary="Khuyến mại" />
          </ListItem>
          <ListItem button onClick={() => navigate("/services")}>
            <ListItemText primary="Dịch vụ" />
          </ListItem>
          <ListItem button onClick={() => navigate("/packages")}>
            <ListItemText primary="Gói cước" />
          </ListItem>
          <ListItem button onClick={toggleSolutionsMobile}>
            <ListItemText primary="Giải pháp số" />
            <ListItemIcon>
              {solutionsOpen ? <ExpandLessIcon sx={{ color: "#fff" }} /> : <ExpandMoreIcon sx={{ color: "#fff" }} />}
            </ListItemIcon>
          </ListItem>
          {solutionsOpen && (
            <List sx={{ pl: 4 }}>
              {solutions.map((solution) => (
                <ListItem
                  button
                  key={solution.id}
                  onClick={() => {
                    navigate(`/promotion/${solution.id}`);
                    toggleDrawer(false)();
                  }}
                >
                  <ListItemText primary={solution.title} />
                </ListItem>
              ))}
            </List>
          )}
          <ListItem button onClick={() => navigate("/news")}>
            <ListItemText primary="Tin tức" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;