import React, { useState, useEffect } from "react";
import Card from "../card/Card";
import { getFilteredProducts } from "../ApiCore";
import { getCategories } from "../../../actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "../checkbox/Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./FixedPrices";
import ListBox from "./ListBox";
import "./Shop.scss";

const Shop = () => {
  const dispatch = useDispatch();
  const categoryy = useSelector((state) => state.category.categories);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 && size >= limit && <button onClick={loadMore}>Load more</button>
    );
  };

  useEffect(() => {
    dispatch(getCategories());
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
      <div className="flex pt-8 pb-16 lg:pb-20">
        <div className="flex-shrink-0 pe-24 hidden lg:block w-96">
          <div className="position: sticky; top: 50px;">
            <div className="bg-white m-5 block p-3.5 border-b border-gray-300 pb-7 mb-7">
              <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
                Filter by categories
              </h3>
              <div className="mt-2 flex flex-col space-y-4>">
                <ul>
                  <Checkbox
                    categories={categoryy}
                    handleFilters={(filters) =>
                      handleFilters(filters, "category")
                    }
                  />
                </ul>
              </div>
            </div>

            <div className="bg-white m-5 p-3.5 block border-b border-gray-300 pb-7 mb-7">
              <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
                Filter by price range
              </h3>
              <div className="mt-2 flex flex-col space-y-4>">
                <RadioBox
                  prices={prices}
                  handleFilters={(filters) => handleFilters(filters, "price")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:-ms-9">
          <div className="flex justify-between items-center mb-7">
            <h2 className="text-2xl font-bold text-heading hidden lg:inline-flex pb-1">
              Products
            </h2>
            <div className="flex items-center justify-end">
              <div className="flex-shrink-0 text-body text-xs md:text-sm leading-4 pe-4 md:me-6 ps-2 hidden lg:block">
                75 items
              </div>
              <div className="flex-shrink-0 text-body text-xs md:text-sm leading-4 pe-4 md:me-6 ps-2 hidden lg:block">
                <ListBox />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8">
            {filteredResults.map((product, i) => (
              <div key={i} className="col-4 mb-3">
                <Card product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </div>
  );
};

export default Shop;
