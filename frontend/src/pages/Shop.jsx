import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/CategoryApiSlice";

import Product from "./Product/Product";
import Loader from "../components/Loader";

const Shop = () => {
  const dispatch = useDispatch();

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filterCategories = categoriesQuery.data;
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [radioPrice, setRadioPrice] = useState([]);
  const [keyword, setKeyword] = useState("");

  const { data: filteredProducts, isLoading } = useGetFilteredProductsQuery({
    checked: checkedCategories,
    radio: radioPrice,
    keyword,
  });

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checkedCategories, id]
      : checkedCategories.filter((c) => c !== id);
    setCheckedCategories(updatedChecked);
  };

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
    const priceRange = e.target.value.split("-").map(Number);
    setRadioPrice(priceRange);
  };

  const handleReset = () => {
    setCheckedCategories([]);
    setRadioPrice([]);
    setPriceFilter("");
    setKeyword("");
    window.location.reload();
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="bg-[#151515] p-3 mt-2 mb-2">
            <div className="mb-4">
               <input 
                type="text" 
                placeholder="Search..." 
                value={keyword} 
                onChange={e => setKeyword(e.target.value)}
                className="w-full p-2 rounded text-black"
               />
            </div>
            
            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Categories
            </h2>

            <div className="p-5 w-[15rem]">
              {filterCategories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex ietms-center mr-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Price
            </h2>

            <div className="p-5 w-[15rem]">
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="all-prices"
                  name="price-filter"
                  value=""
                  checked={priceFilter === ""}
                  onChange={() => {
                    setPriceFilter("");
                    setRadioPrice([]);
                  }}
                  className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="all-prices"
                  className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                >
                  All
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="price-1"
                  name="price-filter"
                  value="0-50"
                  checked={priceFilter === "0-50"}
                  onChange={handlePriceChange}
                  className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="price-1"
                  className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                >
                  $0 - $50
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="price-2"
                  name="price-filter"
                  value="51-100"
                  checked={priceFilter === "51-100"}
                  onChange={handlePriceChange}
                  className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="price-2"
                  className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                >
                  $51 - $100
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="price-3"
                  name="price-filter"
                  value="101-500"
                  checked={priceFilter === "101-500"}
                  onChange={handlePriceChange}
                  className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="price-3"
                  className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                >
                  $101 - $500
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="price-4"
                  name="price-filter"
                  value="501-10000"
                  checked={priceFilter === "501-10000"}
                  onChange={handlePriceChange}
                  className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="price-4"
                  className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                >
                  $501+
                </label>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full border border-gray-300 rounded-lg py-2 px-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-3">
            <h2 className="h4 text-center mb-2">
              {filteredProducts?.length} Products
            </h2>
            <div className="flex flex-wrap">
              {filteredProducts?.length === 0 ? (
                <Loader />
              ) : (
                filteredProducts?.map((p) => (
                  <div className="p-3" key={p._id}>
                    <Product product={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
