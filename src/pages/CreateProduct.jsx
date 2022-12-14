import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const URI = "https://pruebasinicial.azurewebsites.net/products";

function CreateProduct() {
  //Creation of states to save the information
  const [product_name, setproduct_name] = useState("");
  const [product_category, setproduct_category] = useState("Cookies");
  const [product_categoryId, setproduct_categoryId] = useState(1);
  const [product_price, setproduct_price] = useState(0);
  const [product_status, setproduct_status] = useState("Active");
  const navigate = useNavigate();

  //function to save the information in the table of products
  const store = async (e) => {
    e.preventDefault();
    await axios.post(URI, {
      name: product_name,
      id_category: product_categoryId,
      price: product_price,
      product_state: product_status,
    });
    navigate("/products");
  };

  const setCategoryId = (category) => {
    switch (category) {
      case "Cookies":
        setproduct_categoryId(1);
        break;
      case "Candies":
        setproduct_categoryId(2);
        break;
      case "Cakes":
        setproduct_categoryId(3);
        break;
      case "Desserts":
        setproduct_categoryId(4);
        break;
      case "Drinks":
        setproduct_categoryId(5);
        break;
      default:
        setproduct_categoryId(1);
    }
  };

  useEffect(() => {
    setCategoryId(product_category);
  }, [product_category]);

  return (
    <div className="forms">
      <h1>Enter the new product</h1>
      <form onSubmit={store}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            onChange={(e) => setproduct_name(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Product Category</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            onChange={(e) => setproduct_category(e.target.value)}
          >
            <option>Cookies</option>
            <option>Candies</option>
            <option>Cakes</option>
            <option>Desserts</option>
            <option>Drinks</option>
          </select>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            className="form-control"
            id="exampleFormControlInput1"
            onChange={(e) => setproduct_price(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Product Category</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            onChange={(e) => setproduct_status(e.target.value)}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        {product_name != "" && product_price != "" ? (
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        ) : (
          <button type="submit" className="btn btn-primary" disabled>
            Save
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateProduct;
