"use client"; // means it's client Component

//! (First Way- Not Recommended)  React Client Component for url query(?) string access by searchParams + useApi React 19 hook -

import { use } from "react";
const ProductList = ({ searchParams }) => {
  // console.log(props)           //   {params: Promise, searchParams: Promise}
  // console.log(searchParams)    //   ReactPromise

  const searchParam = use(searchParams); // useApi hook Wrap
  // when hit Url : http://localhost:3000/products?category=shoes&sort=price_asc&page=2
  console.log("client", searchParam); //client {category: 'shoes', sort: 'price_asc', page: '2'}

  //when hit url 2: http://localhost:3000/products?category=shoes&page=2&page=3    // client {category: 'shoes', page: Array(2)}

  const category = searchParam?.category || "all";
  const sort = searchParam?.sort || "default";
  const page = searchParam?.page || 1;

  return (
    <div>
      <h1>
        In client Component url query(?) string access by searchParams and
        promise handle by useApi React 19 hook
        <br />
        if it's not page.jsx or it component use inside server Component at that
        time we must pass prop.searchParams as a props otherwise it's show
        undefined and throw error
      </h1>
      <p>
        Showing {category} products, sorted by {sort}, page {page}
      </p>
    </div>
  );
};

export default ProductList;

//! (Second Recommended Way- )  React Client Component for url query string access by useSearchParams hook/method of Next js -

import { useSearchParams } from "next/navigation";
export const ProductList2 = () => {
  // console.log(props)           //   {params: Promise, searchParams: Promise}

  const searchParams = useSearchParams();
  // when hit Url  : http://localhost:3000/products?category=shoes&page=2&page=3
  console.log("client-2nd-comp", searchParams); //  client-2nd-comp ReadonlyURLSearchParams {size: 3}

  //^ here make sure we know the name of variable key in query string (?) then we access that value using different method like .get, .getAll , .has, .keys, .foreach, .entries --(inside key pass)
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "default";
  // const page = searchParams.get("page") || 1;                // it's show first page

  const page = searchParams.getAll("page") || 1; // variable have multiple value then use .getAll() method
  console.log(page); // ['2','3']                              // it's show all page

  const entries = Object.fromEntries(searchParams.entries());
  console.log("entries", entries); //entries {category: 'shoes', page: '3'}     // it's show last page

  return (
    <div>
      <h1>
        In React Client Component url query(?) string access by useSearchParams
        hook(next/navigation method)
      </h1>
      <p>
        Showing {category} products, sorted by {sort}, page {page}
      </p>
    </div>
  );
};
