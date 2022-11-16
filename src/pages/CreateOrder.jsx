import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addOneToOrder,
  clearOrder,
  removeFromOrder,
  removeOneFromOrder,
} from "../actions/ordersActions";
import "../css/createOrder.css";

const URI = "https://pruebasinicial.azurewebsites.net/orders";
const URI_SUMMARY = "https://pruebasinicial.azurewebsites.net/sum";

function CreateOrder() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { currentOrder } = state.order;

  //context acquisition
  //const { cart, addProduct, removeProduct, clearCart } = useCartContext();

  const [customer, setcustomer] = useState("");
  const navigate = useNavigate();

  //operations for the taxes and the results
  let subtotal = 0;
  currentOrder.forEach((e) => {
    subtotal = subtotal + e.price * e.quantity;
  });
  const city_tax = Number((subtotal * 0.1).toFixed(2));
  const county_tax = Number((subtotal * 0.05).toFixed(2));
  const state_tax = Number((subtotal * 0.08).toFixed(2));
  const federal_tax = Number((subtotal * 0.02).toFixed(2));
  const total_taxes = Number(
    (city_tax + county_tax + state_tax + federal_tax).toFixed(2)
  );
  const total_amount = (Number(subtotal) + total_taxes).toFixed(2);

  //operation to get the actual date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  //function to save the information in two tables
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
        currentOrder.forEach(async (e) => {
          await axios.post(URI_SUMMARY, {
            id_order: response.data.id,
            id_product: e.id,
            quantity: e.quantity,
          });
        });
      });
    dispatch(clearOrder());
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
                    onClick={() => dispatch(clearOrder())}
                  >
                    Clean order
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentOrder.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>
                    <button
                      onClick={() => dispatch(removeOneFromOrder(product.id))}
                    >
                      -
                    </button>
                    <input value={product.quantity} type="number" disabled />
                    <button onClick={() => dispatch(addOneToOrder(product.id))}>
                      +
                    </button>
                  </td>
                  <td>{product.price}</td>
                  <td>{(product.price * product.quantity).toFixed(2)}</td>

                  <td>
                    <button
                      className=" btn btn-danger"
                      onClick={() => dispatch(removeFromOrder(product.id))}
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
        {customer != "" && currentOrder.length > 0 ? (
          <button className="btn-create btn btn-primary" onClick={store}>
            Finish order
          </button>
        ) : (
          <button className=" btn-create btn btn-primary" disabled>
            Finish order
          </button>
        )}
      </div>
    </div>
  );
}

export default CreateOrder;
