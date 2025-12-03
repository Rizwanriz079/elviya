// Utility functions

export function formatPrice(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function generateWhatsAppLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function createOrderMessage(productName: string, size: string, price: number): string {
  return `Hi ELVYA! I would like to order:

Product: ${productName}
Size: ${size}
Price: ₹${price}

Please let me know the next steps for placing this order.`;
}
