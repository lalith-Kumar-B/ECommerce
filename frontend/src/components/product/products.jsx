import React, { Fragment, useEffect, useState } from "react";
import "./products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/loader/loader";
import ProductCard from "../Home/Product.jsx";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import MetaData from "../layout/metadata";

const categories = [
  "All",
  "Electronics",
  "Computers",
  "Photography",
  "Audio",
  "Wearables",
  "Sports",
  "Home",
  "Gaming",
  "Kitchen",
];

const Products = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 2500]);
  const [category, setCategory] = useState("");
  const [reqPrice, setReqPrice] = useState([0, 2500]);
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const params = useParams();
  const keyword = params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const updatePrice = (event) => {
    setReqPrice(price);
  };
  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, reqPrice, category));
  }, [dispatch, keyword, currentPage, reqPrice, category, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS" />
          <div className="productsHeading">
            <h2>Price</h2>
          </div>

          <div className="filterBox">
            <Slider
              value={price}
              onChange={priceHandler}
              onChangeCommitted={updatePrice}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={2500}
            />
          </div>

          <div className="categoryBox">
            {categories.map((category) => (
              <div
                className="category-link"
                key={category}
                onClick={() => {
                  category == "All" ? setCategory("") : setCategory(category);
                }}
              >
                {category}
              </div>
            ))}
          </div>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          {
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
                disabledClass="pageItemDisabled"
              />
            </div>
          }
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
