//! Server component for url query string access by searchParams

const Product = async (props) => {
  // console.log(props)           //   {params: Promise, searchParams: Promise}

  const searchParams = await props.searchParams; //^ in Server comp. props return promise , that handle by async await , It compulsory to used in Next 15 , although we can direct destructure searchParams but we need to use this line async await in Next js 15 {only earlier Next v14 it's synchronous so we not need to use async await } but now it's asynchronous

  // when hit Url : http://localhost:3000/products?category=shoes&sort=price_asc&page=2
  console.log(searchParams); //  Server   {category: 'shoes', sort: 'price_asc', page: '2'}

  const category = searchParams?.category || "all";
  const sort = searchParams?.sort || "default";
  const page = searchParams?.page || 1;

  return (
    <div>
      Showing {category} products, sorted by {sort}, page {page}
    </div>
  );
};

export default Product;
