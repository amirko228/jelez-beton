import { Injectable, Logger } from "@nestjs/common";

/**
 * Отправка сообщений в WhatsApp через бесплатный сервис CallMeBot.
 *
 * Настройка (одноразово):
 *   1. В WhatsApp добавь контакт: +34 644 52 74 87 (CallMeBot)
 *   2. Отправь ему сообщение: "I allow callmebot to send me messages"
 *   3. В ответе придёт APIKEY — скопируй его
 *   4. В .env сервера пропиши:
 *        WHATSAPP_NOTIFY_PHONE=79001234567   (свой номер, только цифры с кодом страны)
 *        WHATSAPP_NOTIFY_API_KEY=123456      (полученный APIKEY)
 *
 * Если переменные не заданы — отправка пропускается (заявка сохраняется в БД).
 */
@Injectable()
export class WhatsAppService {
  private readonly logger = new Logger(WhatsAppService.name);

  async send(text: string): Promise<void> {
    const phone = process.env.WHATSAPP_NOTIFY_PHONE;
    const apiKey = process.env.WHATSAPP_NOTIFY_API_KEY;

    if (!phone || !apiKey) {
      this.logger.warn("WhatsApp уведомления отключены: не задан WHATSAPP_NOTIFY_PHONE или WHATSAPP_NOTIFY_API_KEY");
      return;
    }

    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apiKey)}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        this.logger.error(`CallMeBot ответил ${res.status}: ${await res.text()}`);
        return;
      }
      this.logger.log("Уведомление в WhatsApp отправлено");
    } catch (err) {
      this.logger.error("Ошибка отправки в WhatsApp", err as Error);
    }
  }
}
