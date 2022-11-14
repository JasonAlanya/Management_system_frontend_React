import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/createOrder.css";

//Urls to obtain the data
const URI = "https://pruebasinicial.azurewebsites.net/orders";
const URI_SUMMARY = "https://pruebasinicial.azurewebsites.net/sum";

function EditOrder() {
  //States to use the information from the table order
  const [order_id, setorder_id] = useState(0);
  const [order_status, setorder_status] = useState("");
  const [date, setdate] = useState("");
  const [customer, setcustomer] = useState("");
  const [city_tax, setcity_tax] = useState(0);
  const [county_tax, setcounty_tax] = useState(0);
  const [state_tax, setstate_tax] = useState(0);
  const [federal_tax, setfederal_tax] = useState(0);
  const [total_taxes, settotal_taxes] = useState(0);
  const [total_amount, settotal_amount] = useState(0);

  //States to merge the tables with information from products and products detail
  const [products, setproducts] = useState([]);

  const navigate = useNavigate();
  const id = useParams();

  /*****************************************************************/
  //components to update the order in the db
  const update = async (e) => {
    e.preventDefault();
    await axios.put(`${URI}/${id.id}`, {
      order_status: order_status,
      //date: date,
      customer: customer,
      city_tax: city_tax,
      county_tax: county_tax,
      state_tax: state_tax,
      federal_tax: federal_tax,
      total_taxes: total_taxes,
      total_amount: total_amount,
    });
    navigate("/");
  };

  useEffect(() => {
    getOrderById();
  }, []);

  const getOrderById = async () => {
    const res = await axios.get(`${URI}/${id.id}`);
    setorder_id(res.data.id);
    setorder_status(res.data.order_status);
    setdate(res.data.date);
    setcustomer(res.data.customer);
    setcity_tax(res.data.city_tax);
    setcounty_tax(res.data.county_tax);
    setstate_tax(res.data.state_tax);
    setfederal_tax(res.data.federal_tax);
    settotal_taxes(res.data.total_taxes);
    settotal_amount(res.data.total_amount);
  };
  /*****************************************************************/

  //Components to obtain the data from the table of products associated with an order
  useEffect(() => {
    getProducts();
  }, [order_id]);

  const getProducts = async () => {
    if (order_id > 0) {
      const summary = await axios.get(`${URI_SUMMARY}/${order_id}`);

      setproducts(summary.data);
    }
  };

  return (
    <div className="summary-order-section">
      <h1>Edit order</h1>
      <div className=" form-customer mb-3">
        <label className="form-label">Customer</label>
        <input
          value={customer}
          onChange={(e) => setcustomer(e.target.value)}
          type="text"
          className="form-control"
        />
        <label>Order state</label>
        <select
          className="form-control"
          id="exampleFormControlSelect1"
          value={order_status}
          onChange={(e) => setorder_status(e.target.value)}
        >
          <option>Pending</option>
          <option>Completed</option>
          <option>Rejected</option>
        </select>
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
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>{product.price * product.quantity}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>City tax:</td>
                <td>{city_tax}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>County tax:</td>
                <td>{county_tax}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>State tax:</td>
                <td>{state_tax}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Federal tax:</td>
                <td>{federal_tax}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total taxes:</td>
                <td>{total_taxes}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total amount:</td>
                <td>{total_amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="order-section-finish">
        <button className="btn-create btn btn-primary" onClick={update}>
          Update
        </button>
      </div>
    </div>
  );
}

export default EditOrder;
