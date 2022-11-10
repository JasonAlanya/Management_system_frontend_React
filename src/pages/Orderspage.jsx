import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const URI = "http://localhost:4000/orders";

function Orderspage() {
  //Creation of states to show the orders
  const [orders, setorders] = useState([]);

  //components to get the information in the table of orders
  useEffect(() => {
    getorders();
  }, []);

  const getorders = async () => {
    const res = await axios.get(URI);
    setorders(res.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link to="/createorder" className="btn-create btn btn-primary">
            Create order
          </Link>
          <table className="table">
            <thead className="table-primary">
              <tr>
                <th>N°</th>
                <th>Consumer</th>
                <th>Status</th>
                <th>Date</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.customer}</td>
                  <td>{order.order_status}</td>
                  <td>{order.date}</td>
                  <td>{order.total_amount}</td>
                  <td>
                    <Link to={`/editorder/${order.id}`}>Edit</Link>
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

export default Orderspage;
