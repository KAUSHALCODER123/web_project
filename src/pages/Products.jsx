import { useEffect, useState, Suspense } from "react";
import Product from "../components/Product";
import { Triangle } from "react-loader-spinner";
import { useProductConsumer } from "../contexts/ProductsProvider";
import Search from "../components/Search";
import FilterCategory from "../components/FilterCategory";
import searchFilterHandler from "../utils/helpers/searchFilterHandler";
import NoProductFound from "../components/NoProductFound";

function Products() {
  const productsList = useProductConsumer();
  const [query, setQuery] = useState({ search: "" });
  const [notFound, setNotFound] = useState(false);

  const data = searchFilterHandler(query, productsList);
  useEffect(() => {
    const check= setTimeout(() => {
      if (!data.length && query.search) {
        setNotFound(true);
        console.log(data)
      }else{
        setNotFound(false)
      }
    }, 1);
    return ()=>{
      clearTimeout(check)
    }
  }, [data]);

  return (
    <>
      <div className="wrapper">
        <Search query={{ query, setQuery }} />
        <div className="w-full flex">
          <div className="w-10/12 grid  grid-cols-3 gap-7 justify-items-start">
            {notFound && <NoProductFound/>}
            {!data.length && !notFound ? (
              <Triangle
                visible
                height="200"
                width="200"
                color="#703BF7"
                ariaLabel="triangle-loading"
                wrapperStyle={{ fontSize: "150px" }}
                wrapperClass="w-full col-span-3 flex justify-center m-auto"
              />
            ) : (
              data.map((product) => (
                <Product key={product.id} productData={product} />
              ))
            )}
          </div>
          <FilterCategory query={{ query, setQuery }} />
        </div>
      </div>
    </>
  );
}

export default Products;
