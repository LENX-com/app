import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSearchQuery} from "../../actions/productAction";
import { FaCat } from "react-icons/fa";
import CategoryProduct from "../components/product/CategoryProduct";

export default function SearchResult(props) {
  const value = props.location.search;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.productsSearched);
  useEffect(() => {
    if(value){

      dispatch(getAllSearchQuery(value));
    }
 
  }, [dispatch, value]);

  return (
    <div>
      <div>
        {products.length > 0 ? (
          products.map((item) => (
            <>
              <div>Result for searched items</div>
              <CategoryProduct product={item} />
            </>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "4rem",
              marginBottom: "4rem",
            }}
          >
            <p className="mb-2">No result found</p>
            <FaCat color="blue" size={100} />
          </div>
        )}
      </div>
    </div>
  );
}
