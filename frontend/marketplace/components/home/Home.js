import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import {
  getProductsBySell,
  getProductsByArrival,
} from "../../../actions/productAction";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import {getSearchSelectors} from "redux-search"
import Search from "../search/Search";

function Home() {
  const {text, result} = getSearchSelectors("products");
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  // const loadProductsBySell = () => {
  //   getProducts("sold").then((data) => {
  //     if (data.error) {
  //       setError(data.error);
  //     } else {
  //       console.log(data);
  //       setProductsBySell(data);
  //     }
  //   });
  // };

  // const loadProductsByArrival = () => {
  //   getProducts("createdAt").then((data) => {
  //     if (data.error) {
  //       setError(data.error);
  //     } else {
  //       console.log(data);
  //       setProducstByArrival(data);
  //     }
  //   });
  // };

  useEffect(() => {
    dispatch(getProductsBySell("sold"));
    dispatch(getProductsByArrival("createdAt"));
  }, []);

  return (
    <Layout title="home Page" description="LENX">
      <Search />
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {product.productsByArrival.map((product, i) => (
          <Card product={product} key={i} className="col" />
        ))}
      </div>
      <div className="row">
        <h2 className="title">Best sellers</h2>
        {product.productsBySell.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
      <div className="row">
        <h2 className="title"> By arrival</h2>
        {product.productsByArrival.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    </Layout>
  );
}

export default Home;
