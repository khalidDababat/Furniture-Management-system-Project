import { notFound } from "next/navigation";
import { orderService } from "@/services/api";
import OrderConfirmation from "@/components/OrderConfirmation/OrderConfirmation";

export const dynamic = "force-dynamic";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await orderService.getOrder(id).catch(() => null);
  if (!order) notFound();
  return <OrderConfirmation order={order} />;
}
