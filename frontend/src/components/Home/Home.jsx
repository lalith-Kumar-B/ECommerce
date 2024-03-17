import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import ProductCard from "./Product.jsx";
import { getProduct } from "../../actions/productAction.js";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/metadata.jsx";
import Loader from "../layout/loader/loader.jsx";
import { useAlert } from "react-alert";
import "./Home.css";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) return alert.error(error);
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  useSelector((state) => state.products);
  return loading ? (
    <Loader />
  ) : (
    <Fragment>
      <MetaData title={"E Commerce"} />
      <div className="banner">
        <p>welcome to E commerce</p>
        <h1>One Stop Solution For All Your Needs</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Home;
