import React, { useEffect } from "react";
import Sidebar from "./SideBar.jsx";
import "./Dashbord.css";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { registerables, Chart } from "chart.js";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/metadata.jsx";
Chart.register(...registerables);
Chart.defaults.borderColor="white";
Chart.defaults.color="white";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock <= 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  const labels = [];
  const earnings = [];
  const tempData = {};

  const today = new Date();
  var lastSevenDay = new Date();
  lastSevenDay.setDate(lastSevenDay.getDate() - 6);

  orders &&
    orders.forEach((item) => {
      var orderDate = new Date(item.createdAt);
      if (orderDate <= today && orderDate >= lastSevenDay) {
        tempData[orderDate.toLocaleDateString()]
          ? (tempData[orderDate.toLocaleDateString()] += item.totalPrice)
          : (tempData[orderDate.toLocaleDateString()] = item.totalPrice);
      }
      totalAmount += item.totalPrice;
    });

  for (let i = 6; i >= 0; i--) {
    var tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - i);
    tempDate = tempDate.toLocaleDateString();
    labels.push(tempDate);
    earnings.push(tempData[tempDate] ? tempData[tempDate] : 0);
  }

  const lineState = {
    labels: labels,
    responsive: true,
    datasets: [
      {
        label: "earnings per day",
        backgroundColor: ["red"],
        borderColor: "rgb(53, 162, 235)",
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: earnings,
        color: "#232323",
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard" />
      <Sidebar />

      <div className="dashboardContainer">
        <h1>Dashbord</h1>

        <div className="dashboardSummary">
          <div className="dashboardSummaryBox2">
            <Link
              to="https://dashboard.stripe.com/test/payments"
              style={{ backgroundColor: "#0d6efd" }}
            >
              <p>Amount</p>
              <p>₹{totalAmount}</p>
            </Link>
            <Link to="/admin/products" style={{ backgroundColor: "#198754" }}>
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders" style={{ backgroundColor: "#AB2E3C" }}>
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users" style={{ backgroundColor: "#ffc107" }}>
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
