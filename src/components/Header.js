import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, InputBase, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const MenuButtons = styled("div")({
  display: "flex",
  gap: "20px",
});

const SearchContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: "4px",
  padding: "2px 4px",
  width: "300px",
});

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleDrawer = (open) => () => {
    setMobileOpen(open);
  };

  return (
    <AppBar position="static" color="inherit" elevation={0} sx={{ bgcolor: "#f5f5f5" }}>
      <StyledToolbar>
        {/* Nếu là mobile => Hiển thị icon menu */}
        {isMobile && (
          <IconButton edge="start" onClick={toggleDrawer(true)} sx={{ color: "#4caf50" }}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ color: "#4caf50", flexGrow: 1 }}>
          <img src="https://smartcityasia.vn/wp-content/uploads/2023/04/Logo-Mobifone.webp" alt="Logo" height="40" />
        </Typography>

        {/* Nếu không phải mobile => Hiển thị menu bình thường */}
        {!isMobile && (
          <MenuButtons>
            <Button color="inherit" sx={{ color: "#4caf50" }}>Khuyến mại</Button>
            <Button color="inherit" sx={{ color: "#4caf50" }}>Dịch vụ</Button>
            <Button color="inherit" sx={{ color: "#4caf50" }}>Gói cước</Button>
            <Button color="inherit" sx={{ color: "#4caf50" }}>Giải pháp số</Button>
            <Button color="inherit" sx={{ color: "#4caf50" }}>Tin tức</Button>
          </MenuButtons>
        )}

        {/* Thanh tìm kiếm */}
        {!isMobile && (
          <SearchContainer>
            <InputBase
              placeholder="Tìm kiếm..."
              inputProps={{ "aria-label": "search" }}
              sx={{ ml: 1, flex: 1 }}
            />
            <IconButton type="submit" aria-label="search" sx={{ color: "#4caf50" }}>
              <SearchIcon />
            </IconButton>
          </SearchContainer>
        )}
      </StyledToolbar>

      {/* Sidebar cho mobile */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem>
            <IconButton edge="start" onClick={toggleDrawer(false)} sx={{ color: "#4caf50", marginLeft: "auto" }}>
              <CloseIcon />
            </IconButton>
          </ListItem>
          {["Khuyến mại", "Dịch vụ", "Gói cước", "Giải pháp số", "Tin tức"].map((text, index) => (
            <ListItem button key={index}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
