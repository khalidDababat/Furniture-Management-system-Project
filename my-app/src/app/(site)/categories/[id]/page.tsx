import { notFound } from "next/navigation";
import { categotyService, productService } from "@/services/api";
import CategoryView from "@/components/CategoryView";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await categotyService.getCategory(id).catch(() => null);
  if (!category) notFound();
  const products = await productService
    .getProductsByCategory(id)
    .catch(() => []);
  return <CategoryView category={category} products={products} />;
}
