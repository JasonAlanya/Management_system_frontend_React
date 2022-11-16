import Navegation from "./Components/Navegation";
import { Route, Routes } from "react-router-dom";
import Notfound from "./pages/Notfound.jsx";
import Orderspage from "./pages/Orderspage";
import CreateOrder from "./pages/CreateOrder";
import CreateProduct from "./pages/CreateProduct";
import Products from "./pages/Products";
import Productspage from "./pages/Productspage";
import EditProduct from "./pages/EditProduct";
import EditOrder from "./pages/EditOrder";

function App() {
  return (
    <>
      <Navegation />
      <Routes>
        <Route path="Management_system_frontend/" element={<Orderspage />} />
        <Route path="/" element={<Orderspage />} />
        <Route path="/createorder" element={<Products />} />
        <Route path="/createordersummary" element={<CreateOrder />} />
        <Route path="/editorder/:id" element={<EditOrder />} />
        <Route path="/products" element={<Productspage />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/editproduct/:id" element={<EditProduct />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
