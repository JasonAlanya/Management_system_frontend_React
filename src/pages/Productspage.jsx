import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const URI = "http://localhost:4000/products";

function Productspage() {
  //Creation of states to show the products
  const [products, setproducts] = useState([]);

  //components to get the information in the table of prodcuts
  useEffect(() => {
    getproducts();
  }, []);

  const getproducts = async () => {
    const res = await axios.get(URI);
    setproducts(res.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link to="/createproduct" className="btn-create btn btn-primary">
            Create Product
          </Link>
          <table className="table">
            <thead className="table-primary">
              <tr>
                <th>N°</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.product_name}</td>
                  <td>{product.product_category}</td>
                  <td>{product.product_price}</td>
                  <td>{product.product_status}</td>
                  <td>
                    <Link to={`/editproduct/${product.id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Productspage;
