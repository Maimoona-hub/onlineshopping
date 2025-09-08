import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import shirtImg from "../assets/shirt.webp";
import bag from "../assets/bag.jpg";
import hat from "../assets/hat.jpg";
import jacket from "../assets/jacket.jpg";
import pants from "../assets/pants.jpg";
import shoes from "../assets/shoes.jpg";

// Sample products data
const products = [
  { id: 1, name: "Shirt", price: 25, image: shirtImg },
  { id: 2, name: "Pants", price: 35, image: pants },
  { id: 3, name: "Shoes", price: 50, image: shoes },
  { id: 4, name: "Jacket", price: 60, image: jacket },
  { id: 5, name: "Hat", price: 15, image: hat },
  { id: 6, name: "Bag", price: 40, image: bag },
];

function Home() {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  // Quantity change handler
  const handleQuantityChange = (productId, value) => {
    setQuantities({ ...quantities, [productId]: value });
  };

  // Add to cart and navigate with product data + quantity
  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1; // Default quantity 1
    navigate("/order", { state: { product, quantity } });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Poppins, sans-serif",
        background: "linear-gradient(135deg, #b1cfffff, #e2ebf0, #f37ee5ff, #fda085)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#333",
          fontSize: "2.5rem",
          fontWeight: "bold",
        }}
      >
        🛍️ Our Premium Products
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "15px",
              }}
            />
            <h3 style={{ marginTop: "10px", color: "#333", fontSize: "1.4rem" }}>
              {product.name}
            </h3>
            <p style={{ color: "#666", fontWeight: "bold", margin: "5px 0" }}>
              ${product.price}
            </p>

            {/* Quantity Input */}
            <input
              type="number"
              min="1"
              value={quantities[product.id] || 1}
              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
              style={{
                width: "70px",
                padding: "8px",
                textAlign: "center",
                margin: "10px 0",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />

            <button
              onClick={() => handleAddToCart(product)}
              style={{
                padding: "10px 20px",
                background: "linear-gradient(to right, #667eea, #764ba2)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                marginTop: "10px",
                transition: "0.3s",
                fontSize: "1rem",
              }}
              onMouseOver={(e) =>
                (e.target.style.background =
                  "linear-gradient(to right, #5a67d8, #6b46c1)")
              }
              onMouseOut={(e) =>
                (e.target.style.background =
                  "linear-gradient(to right, #667eea, #764ba2)")
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
