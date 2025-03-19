import React, { useEffect, useState } from "react";
import axiosClient from "./api/axiosClient";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import ProductGrid from "./components/ProductGrid";
import PromotionDetail from "./components/PromotionDetail";

function App() {
  const [promotions, setPromotions] = useState([]); // Đảm bảo khởi tạo là mảng rỗng

  const fetchPromotions = () => {
    axiosClient
      .get("/promotions")
      .then((response) => {
        console.log("API Response:", response.data); // Kiểm tra dữ liệu trả về
        setPromotions(response.data); // Đảm bảo response.data là mảng
      })
      .catch((error) => {
        console.error("Error fetching promotions:", error);
        setPromotions([]); // Nếu có lỗi, đặt promotions về mảng rỗng
      });
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <Banner />
        <Routes>
          <Route path="/" element={<ProductGrid promotions={promotions} />} />
          <Route path="/promotion/:id" element={<PromotionDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;