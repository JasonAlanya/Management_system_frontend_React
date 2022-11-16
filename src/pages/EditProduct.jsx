import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = "https://pruebasinicial.azurewebsites.net/products";

function EditProduct() {
  //States to use the information from the table product
  const [product_name, setproduct_name] = useState("");
  const [product_category, setproduct_category] = useState("");
  const [product_categoryId, setproduct_categoryId] = useState(0);
  const [product_price, setproduct_price] = useState(0);
  const [product_status, setproduct_status] = useState("");
  const navigate = useNavigate();
  const id = useParams();

  //components to update the product in the db
  const update = async (e) => {
    e.preventDefault();
    await axios.put(`${URI}/${id.id}`, {
      name: product_name,
      id_category: product_categoryId,
      price: product_price,
      product_state: product_status,
    });
    navigate("/products");
  };

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const res = await axios.get(`${URI}/${id.id}`);
    setproduct_name(res.data.name);
    setproduct_category(res.data.category);
    setproduct_price(res.data.price);
    setproduct_status(res.data.product_state);
  };

  const deleteproduct = async () => {
    await axios.delete(`${URI}/${id.id}`);
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
      <h1>Edit a product</h1>
      <form onSubmit={update}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            value={product_name}
            onChange={(e) => setproduct_name(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Product Category</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            value={product_category}
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
            type="number"
            className="form-control"
            id="exampleFormControlInput1"
            value={product_price}
            onChange={(e) => setproduct_price(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Product Category</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            value={product_status}
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
        <button onClick={() => deleteproduct(id)} className="btn btn-danger">
          Delete
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
