import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../Context/CartContext";
import "../css/createOrder.css";

const URI = "http://localhost:4000/orders";
const URI_SUMMARY = "http://localhost:4000/sum";

function CreateOrder() {
  const { cart, addProduct, removeProduct, clearCart } = useCartContext();
  let subtotal = 0;
  cart.forEach((e) => {
    subtotal = subtotal + e.product_price * e.quantity;
  });

  const [customer, setcustomer] = useState("");
  const navigate = useNavigate();

  const city_tax = Number((subtotal * 0.1).toFixed(2));
  const county_tax = Number((subtotal * 0.05).toFixed(2));
  const state_tax = Number((subtotal * 0.08).toFixed(2));
  const federal_tax = Number((subtotal * 0.02).toFixed(2));
  const total_taxes = Number(
    (city_tax + county_tax + state_tax + federal_tax).toFixed(2)
  );
  const total_amount = Number(subtotal) + total_taxes;

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  const store = async (e) => {
    e.preventDefault();
    await axios
      .post(URI, {
        order_status: "Pending",
        date: today,
        customer: customer,
        city_tax: city_tax,
        county_tax: county_tax,
        state_tax: state_tax,
        federal_tax: federal_tax,
        total_taxes: total_taxes,
        total_amount: total_amount,
      })
      .then((response) => {
        cart.forEach(async (e) => {
          await axios.post(URI_SUMMARY, {
            id_order: response.data.id,
            id_product: e.id,
            quantity: e.quantity,
          });
        });
      });
    clearCart();
    navigate("/");
  };

  return (
    <div className="summary-order-section">
      <h1>Order</h1>
      <div className=" form-customer mb-3">
        <label className="form-label">Insert Customer</label>
        <input
          value={customer}
          onChange={(e) => setcustomer(e.target.value)}
          type="text"
          className="form-control"
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <table className="table">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
                <th>
                  <button
                    className=" btn btn-danger"
                    onClick={() => clearCart()}
                  >
                    Clean order
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.product_name}</td>
                  <td>{product.product_category}</td>
                  <td>
                    <input
                      type="number"
                      defaultValue={product.quantity}
                      onChange={(e) => addProduct(product, e.target.value)}
                    />
                  </td>
                  <td>{product.product_price}</td>
                  <td>
                    {(product.product_price * product.quantity).toFixed(2)}
                  </td>

                  <td>
                    <button
                      className=" btn btn-danger"
                      onClick={() => removeProduct(product.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>City tax:</td>
                <td>{city_tax}</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>County tax:</td>
                <td>{county_tax}</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>State tax:</td>
                <td>{state_tax}</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Federal tax:</td>
                <td>{federal_tax}</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total taxes:</td>
                <td>{total_taxes}</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total amount:</td>
                <td>{total_amount}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="order-section-finish">
        <Link to="/createorder" className="btn-create btn btn-primary">
          Previous
        </Link>
        <button className="btn-create btn btn-primary" onClick={store}>
          Finish order
        </button>
      </div>
    </div>
  );
}

export default CreateOrder;
