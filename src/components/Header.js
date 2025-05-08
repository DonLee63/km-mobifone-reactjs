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
  Grid,
  Box,
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

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 32px",
  maxWidth: "1355px",
  width: "100%",
  margin: "0 auto",
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

const CategoryMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: "12px 24px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const ProductList = styled(List)(({ theme }) => ({
  padding: "8px 24px",
  maxHeight: "400px",
  overflowY: "auto",
}));

const ProductItem = styled(ListItem)(({ theme }) => ({
  padding: "8px 0",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    cursor: "pointer",
  },
}));

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = useState([]); // Danh sách danh mục
  const [categoryProducts, setCategoryProducts] = useState([]); // Sản phẩm/dịch vụ của danh mục được hover
  const [selectedCategory, setSelectedCategory] = useState(null); // Danh mục đang được hover
  const [anchorEl, setAnchorEl] = useState(null);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  // Lấy danh sách danh mục
  useEffect(() => {
    axiosClient
      .get("/promotion-categories")
      .then((response) => {
        console.log("Categories Response:", response.data);
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Đặt danh mục mặc định khi dropdown mở
  useEffect(() => {
    if (anchorEl && categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]); // Đặt danh mục đầu tiên làm mặc định
    }
  }, [anchorEl, categories, selectedCategory]);

  // Lấy sản phẩm/dịch vụ khi hover vào danh mục
  useEffect(() => {
    if (selectedCategory) {
      axiosClient
        .get(`/promotions?category_id=${selectedCategory.id}`)
        .then((response) => {
          console.log("Category Products Response:", response.data);
          setCategoryProducts(response.data.slice(0, 7)); // Giới hạn 7 sản phẩm
        })
        .catch((error) =>
          console.error("Error fetching category products:", error)
        );
    } else {
      setCategoryProducts([]); // Xóa danh sách sản phẩm khi không có danh mục được chọn
    }
  }, [selectedCategory]);

  const toggleDrawer = (open) => () => {
    setMobileOpen(open);
  };

  const handleSolutionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSolutionsClose = () => {
    setAnchorEl(null);
    setSelectedCategory(null); // Xóa danh mục được chọn khi đóng menu
  };

  const handleCategoryHover = (category) => {
    setSelectedCategory(category); // Cập nhật danh mục đang được hover
  };

  const handleProductClick = (id) => {
    navigate(`/promotion/${id}`);
    handleSolutionsClose();
  };

  const handleLearnMore = (categoryId) => {
    console.log("Navigating to category:", categoryId);
    navigate(`/promotions?category_id=${categoryId}`);
    handleSolutionsClose();
  };

  const toggleSolutionsMobile = () => {
    setSolutionsOpen(!solutionsOpen);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        bgcolor: "#1976d2",
        color: "#fff",
        height: "80px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <StyledToolbar>
        {isMobile && (
          <IconButton
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ color: "#fff" }}
          >
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
            <StyledButton onClick={() => navigate("/about")}>
              Giới thiệu
            </StyledButton>
            <StyledButton onClick={() => navigate("/packages")}>
             Tin tức
            </StyledButton>
            <div>
              <StyledButton
                onClick={handleSolutionsClick}
                endIcon={anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              >
                Sản phẩm & Dịch vụ
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
                    width: "600px",
                    maxHeight: "500px",
                    overflow: "hidden",
                  },
                }}
              >
                <Grid container>
                  {/* Cột trái: Danh sách danh mục */}
                  <Grid
                    item
                    xs={4}
                    sx={{ borderRight: "1px solid rgba(255, 255, 255, 0.2)" }}
                  >
                    {categories.map((category) => (
                      <CategoryMenuItem
                        key={category.id}
                        onMouseEnter={() => handleCategoryHover(category)}
                      >
                        <Typography variant="body1">{category.title}</Typography>
                      </CategoryMenuItem>
                    ))}
                  </Grid>
                  {/* Cột phải: Sản phẩm/dịch vụ của danh mục được hover */}
                  <Grid item xs={8}>
                    {selectedCategory ? (
                      <Box sx={{ p: 2 }}>
                        <ProductList>
                          {categoryProducts.map((product, index) => (
                            <ProductItem
                              key={product.id}
                              onClick={() => handleProductClick(product.id)}
                            >
                              <Typography variant="body2">
                                {index + 1}. {product.title}
                              </Typography>
                            </ProductItem>
                          ))}
                        </ProductList>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleLearnMore(selectedCategory.id)}
                          sx={{
                            mt: 2,
                            ml: 2,
                            textTransform: "none",
                            borderRadius: "20px",
                          }}
                        >
                          Tìm hiểu thêm
                        </Button>
                      </Box>
                    ) : (
                      <Box sx={{ p: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Vui lòng chọn một danh mục để xem các giải pháp.
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Menu>
            </div>
            <StyledButton onClick={() => navigate("/support")}>
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
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <IconButton
              type="button"
              aria-label="search"
              sx={{ color: "#1976d2" }}
              onClick={handleSearch}
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
            <ListItemText primary="Giới thiệu" />
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
              {categories.map((category) => (
                <ListItem
                  button
                  key={category.id}
                  onClick={() => {
                    navigate(`/promotions?category_id=${category.id}`);
                    toggleDrawer(false)();
                  }}
                >
                  <ListItemText primary={category.title} />
                </ListItem>
              ))}
            </List>
          )}
          <ListItem button onClick={() => navigate("/support")}>
            <ListItemText primary="Hỗ trợ" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;