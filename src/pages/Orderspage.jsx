import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getOrders,
  getOrdersQuantity,
  nextPageOrders,
  previousPageOrders,
  selectPageOrders,
} from "../actions/crudOrdersActions";
import Pagination from "../Components/Pagination";

const URI = "https://pruebasinicial.azurewebsites.net/orderspagination";
const URI_GET_QUANTITY =
  "https://pruebasinicial.azurewebsites.net/ordersquantity";
const Orders_per_page = 1;

function Orderspage() {
  //Creation of states to show the orders
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { orders, currentPage, ordersQuantity } = state.gettingOrders;
  //components to get the information in the table of orders
  useEffect(() => {
    setorders();
  }, [currentPage]);

  useEffect(() => {
    setOrdersQuantity();
  }, []);

  const setOrdersQuantity = async () => {
    const res = await axios.get(URI_GET_QUANTITY);
    //setproducts(res.data);
    const cont = res.data[0].counter;
    dispatch(getOrdersQuantity(cont));
  };

  const setorders = async () => {
    const res = await axios.get(
      `${URI}/${(currentPage - 1) * Orders_per_page}&${Orders_per_page}`
    );
    //setproducts(res.data);
    dispatch(getOrders(res.data));
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
                  <td>{(currentPage - 1) * Orders_per_page + index + 1}</td>
                  <td>{order.customer}</td>
                  <td>{order.order_status}</td>
                  <td>{order.date.split("T")[0]}</td>
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
      <Pagination
        postPerpage={Orders_per_page}
        totalPosts={ordersQuantity}
        previousPage={() => dispatch(previousPageOrders())}
        nextPage={() => dispatch(nextPageOrders())}
        selectPage={(e) => dispatch(selectPageOrders(e))}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Orderspage;
