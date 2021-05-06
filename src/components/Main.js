import { useState } from "react";
import Upload from "./Upload";
import Orders from "./Orders";

const Main = (props) => {
  const [orders, setOrders] = useState([]);
  return (
    <div>
      <Upload orders={orders} onOrders={setOrders}></Upload>
      <Orders orders={orders} onOrders={setOrders}></Orders>
    </div>
  );
};
export default Main;
