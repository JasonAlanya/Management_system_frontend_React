import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getOrders,
  getOrdersOrderBy,
  getOrdersOrderByAD,
  getOrdersQuantity,
  getOrdersSearchName,
  nextPageOrders,
  previousPageOrders,
  selectPageOrders,
} from "../actions/crudOrdersActions";
import FilterOrder from "../Components/FilterOrder";
import Pagination from "../Components/Pagination";

const URI = "https://pruebasinicial.azurewebsites.net";

const Orders_per_page = 3;

function Orderspage() {
  //Creation of states to show the orders
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const {
    orders,
    currentPage,
    ordersQuantity,
    orderByValues,
    customerNameSearch,
    orderByValue,
    orderByAD,
  } = state.gettingOrders;

  //components to get the information in the table of orders
  useEffect(() => {
    setorders();
  }, [currentPage]);

  useEffect(() => {
    setOrdersQuantity();
  }, []);

  //function to get the quantity of orders with filters
  const setOrdersQuantity = async () => {
    if (customerNameSearch === "") {
      const res = await axios.get(`${URI}/ordersquantity`);
      const cont = res.data[0].counter;
      dispatch(getOrdersQuantity(cont));
    } else {
      const res = await axios.get(
        `${URI}/ordersquantity/${customerNameSearch}`
      );
      const cont = res.data[0].counter;
      dispatch(getOrdersQuantity(cont));
    }
    dispatch(selectPageOrders(1));
  };

  //function to get orders with filters
  const setorders = async () => {
    if (customerNameSearch === "") {
      const res = await axios.get(
        `${URI}/orderspagination/${orderByValue}&${orderByAD}&${
          (currentPage - 1) * Orders_per_page
        }&${Orders_per_page}`
      );
      dispatch(getOrders(res.data));
    } else {
      const res = await axios.get(
        `${URI}/orderspaginationsearcher/${customerNameSearch}&${orderByValue}&${orderByAD}&${
          (currentPage - 1) * Orders_per_page
        }&${Orders_per_page}`
      );
      dispatch(getOrders(res.data));
    }
  };

  return (
    <div className="container">
      <FilterOrder
        searchBy="Consumer name"
        orderBy={orderByValues}
        setSearcher={(e) => dispatch(getOrdersSearchName(e))}
        setSearcherBy={(e) => dispatch(getOrdersOrderBy(e))}
        setSearcherByAD={(e) => dispatch(getOrdersOrderByAD(e))}
        resetProductsQuantity={() => setOrdersQuantity()}
        resetProducts={() => setorders()}
        searcherValue={customerNameSearch}
        orderByValue={orderByValue}
        orderByADValue={orderByAD}
      />
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
