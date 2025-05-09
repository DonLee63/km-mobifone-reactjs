import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Box } from "@mui/material";
import axiosClient from "../api/axiosClient";
import ProductCard from "./ProductCard"; // Giả sử bạn đã có ProductCard

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy từ khóa từ query string
  const query = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    if (query) {
      axiosClient
        .get(`/promotions?keyword=${encodeURIComponent(query)}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => console.error("Error fetching search results:", error));
    }
  }, [query]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Kết quả tìm kiếm cho: "{query}"
      </Typography>
      {results.length > 0 ? (
        <Grid container spacing={2}>
          {results.map((product) => (
            <Grid item xs={12} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Không tìm thấy kết quả nào cho "{query}"
          </Typography>
        </Box>
      )}
    </Container>
  );
  
};

export default SearchResults;