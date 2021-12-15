import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CategoryList = () => {
  const categories = useSelector((state) => state.category.categories);
  const loading = useSelector((state) => state.category.loading);

  const showCategories = () =>
    categories &&
    categories.map((c) => (
      <div
        key={c._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/category/${c._id}`}>{c.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
