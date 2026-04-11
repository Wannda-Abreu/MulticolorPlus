import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";
import { WHATSAPP_PHONE } from "./constants";
import { formatCurrency } from "./format";

const buildWaUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

export const getProductInquiryUrl = (product: Product) =>
  buildWaUrl(
    `Hola, estoy interesado en ${product.name} (${formatCurrency(
      product.price,
    )}). Sigue disponible?`,
  );

export const getCheckoutUrl = (items: CartItem[], totalAmount: number) => {
  const lines = items.map(
    (item) =>
      `- ${item.name} x${item.quantity} = ${formatCurrency(
        item.price * item.quantity,
      )}`,
  );

  const message = [
    "Hola, quiero finalizar esta compra:",
    "",
    ...lines,
    "",
    `Total: ${formatCurrency(totalAmount)}`,
  ].join("\n");

  return buildWaUrl(message);
};
