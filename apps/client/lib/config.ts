// Единая конфигурация контактов. Замените номер на реальный номер WhatsApp.
// Формат: только цифры, с кодом страны, без "+", пробелов и скобок.
export const WHATSAPP_NUMBER = "996500070908";

export const PHONE_DISPLAY = "+996 500 070-908";
export const PHONE_HREF = "tel:+996500070908";
export const EMAIL = "info@jelez-beton.ru";

/**
 * Формирует ссылку на WhatsApp с предзаполненным сообщением.
 */
export function buildWhatsAppLink(payload: { name: string; phone: string; message?: string }): string {
  const lines = [
    "Здравствуйте! Оставляю заявку с сайта ЖелезБетон:",
    "",
    `Имя: ${payload.name}`,
    `Телефон: ${payload.phone}`
  ];
  if (payload.message && payload.message.trim()) {
    lines.push(`Комментарий: ${payload.message}`);
  }
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
