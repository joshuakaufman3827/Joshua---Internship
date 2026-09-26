import React, { useEffect } from "react"; // 1. Added useEffect
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// 2. Import AOS JavaScript and CSS
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  // 3. Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000, // global duration in milliseconds
      once: true,     // whether animation should happen only once
    });
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/author/:authorId" element={<Author />} />
        
        {/* Supporting both path formats prevents white-page routing mismatches */}
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/item-details/:id" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

