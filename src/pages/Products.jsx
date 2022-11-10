import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../Context/CartContext";

import "../css/cards.css";

const URI = "http://localhost:4000/products";

function Products() {
  const { addProduct } = useCartContext();

  const [products, setproducts] = useState([]);

  useEffect(() => {
    getproducts();
  }, []);

  const getproducts = async () => {
    const res = await axios.get(URI);
    setproducts(res.data);
  };

  return (
    <div className="cards-section">
      <h1>Select the products</h1>
      <div className="container-cards">
        {products.map((product) => (
          <div key={product.id} className="card">
            <h1>Product name: {product.product_name}</h1>
            <h2>Product category: {product.product_category}</h2>
            <h2>Product price: {product.product_price}</h2>
            <h2>Product status: {product.product_status}</h2>
            <div className="btns">
              <button
                onClick={() => addProduct(product, 1)}
                className="btn btn-primary"
              >
                Add product
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="order-section">
        <Link to="/createordersummary" className="btn-next btn btn-primary">
          Next
        </Link>
      </div>
    </div>
  );
}

export default Products;
