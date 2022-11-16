import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../actions/ordersActions";
import ProductItem from "../Components/ProductItem";

import "../css/cards.css";

const URI = "https://pruebasinicial.azurewebsites.net/products";

function Products() {
  //States to manage the information in the products cards
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { products } = state.order;

  //components to get the information in the products cards
  useEffect(() => {
    setProducts();
  });

  const setProducts = async () => {
    const res = await axios.get(URI);
    dispatch(getProducts(res.data));
  };

  return (
    <div className="cards-section">
      <h1>Select the products</h1>
      <div className="container-cards">
        {products.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          products.map((product) => (
            <ProductItem key={product.id} data={product} />
          ))
        )}
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
