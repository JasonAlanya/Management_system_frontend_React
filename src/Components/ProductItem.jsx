import { useDispatch } from "react-redux";
import { addToOrder } from "../actions/ordersActions";

const ProductItem = ({ data }) => {
  //Components to control the states of the creation of a new order
  const dispatch = useDispatch();
  let { id, name, category, price, product_state } = data;

  return (
    <div key={id} className="card">
      <h1>Product name: {name}</h1>
      <h2>Product category: {category}</h2>
      <h2>Product price: {price}</h2>
      <h2>Product status: {product_state}</h2>
      <div className="btns">
        {product_state === "Inactive" || (
          <button
            onClick={() => dispatch(addToOrder(id))}
            className="btn btn-primary"
          >
            Add product
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
