import { ProductCardHOCProps } from "../interfaces/interfaces";
import { ProductCard as ProductCardHOC } from "./ProductCard";
import { ProductButtons } from "./ProductButtons";
import { ProductTitle } from "./ProductTitle";
import { ProductImage } from "./ProductImage";

export { ProductButtons } from "./ProductButtons";
// export { ProductCard } from "./ProductCard";
export { ProductImage } from "./ProductImage";
export { ProductTitle } from "./ProductTitle";

export const ProductCard: ProductCardHOCProps = Object.assign(ProductCardHOC, {
  Buttons: ProductButtons,
  Image: ProductImage,
  Title: ProductTitle,
});

export default ProductCard;
