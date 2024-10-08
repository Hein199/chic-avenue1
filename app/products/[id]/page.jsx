import { cookies } from 'next/headers'
import ProductForm from "./components/form";

const ProductDetailedPage = async ({ params }) => {
  const id = params.id;
  const cookieStore = cookies()
  const userId = cookieStore.get('id').value
  const response = await fetch(
    `https://chic-avenue1.vercel.app/api/product/product/${id}`
  );
  const { product } = await response.json();

  return <ProductForm data={product} userId={userId} />;
};

export default ProductDetailedPage;
