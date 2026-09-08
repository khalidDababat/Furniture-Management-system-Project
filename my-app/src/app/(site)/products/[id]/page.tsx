import { notFound } from "next/navigation";
import { categotyService, productService } from "@/services/api";
import ProductDetailView from "@/components/ProductDetailView/ProductDetailView";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await productService.getById(id).catch(() => null);
  if (!product) notFound();
  const category = await categotyService
    .getCategory(product.categoryId)
    .catch(() => null);
  if (!category) notFound();
  const related = await productService.getRelatedProducts(
    product.categoryId,
    product.id,
    4,
  );
  return (
    <ProductDetailView
      product={product}
      category={category}
      related={related}
    />
  );
}
