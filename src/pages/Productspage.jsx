import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProductOrderBy,
  getProductOrderByAD,
  getProducts,
  getProductSearchName,
  getProductsQuantity,
  nextPageProducts,
  previousPageProducts,
  selectPageProducts,
} from "../actions/crudProductsActions";
import FilterOrder from "../Components/FilterOrder";
import Pagination from "../Components/Pagination";

const URI = "https://pruebasinicial.azurewebsites.net";

const Products_per_page = 5;

function Productspage() {
  //Creation of states to show the products
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const {
    products,
    currentPage,
    productsQuantity,
    orderByValues,
    productNameSearch,
    orderByValue,
    orderByAD,
  } = state.gettingProducts;

  //components to get the information from the table of prodcuts
  useEffect(() => {
    setproducts();
  }, [currentPage]);

  useEffect(() => {
    setProductsQuantity();
  }, []);

  //function to get the quantity of products with filters
  const setProductsQuantity = async () => {
    if (productNameSearch === "") {
      const res = await axios.get(`${URI}/productsquantity`);
      const cont = res.data[0].counter;
      dispatch(getProductsQuantity(cont));
    } else {
      const res = await axios.get(
        `${URI}/productsquantity/${productNameSearch}`
      );
      const cont = res.data[0].counter;
      dispatch(getProductsQuantity(cont));
    }
    dispatch(selectPageProducts(1));
  };

  //function to get products with filters
  const setproducts = async () => {
    if (productNameSearch === "") {
      const res = await axios.get(
        `${URI}/productspagination/${orderByValue}&${orderByAD}&${
          (currentPage - 1) * Products_per_page
        }&${Products_per_page}`
      );
      dispatch(getProducts(res.data));
    } else {
      const res = await axios.get(
        `${URI}/productspaginationsearcher/${productNameSearch}&${orderByValue}&${orderByAD}&${
          (currentPage - 1) * Products_per_page
        }&${Products_per_page}`
      );
      dispatch(getProducts(res.data));
    }
  };

  return (
    <div className="container">
      <FilterOrder
        searchBy="Product name"
        orderBy={orderByValues}
        setSearcher={(e) => dispatch(getProductSearchName(e))}
        setSearcherBy={(e) => dispatch(getProductOrderBy(e))}
        setSearcherByAD={(e) => dispatch(getProductOrderByAD(e))}
        resetProductsQuantity={() => setProductsQuantity()}
        resetProducts={() => setproducts()}
        searcherValue={productNameSearch}
        orderByValue={orderByValue}
        orderByADValue={orderByAD}
      />
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
                  <td>{(currentPage - 1) * Products_per_page + index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.product_state}</td>
                  <td>
                    <Link to={`/editproduct/${product.id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        postPerpage={Products_per_page}
        totalPosts={productsQuantity}
        previousPage={() => dispatch(previousPageProducts())}
        nextPage={() => dispatch(nextPageProducts())}
        selectPage={(e) => dispatch(selectPageProducts(e))}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Productspage;
