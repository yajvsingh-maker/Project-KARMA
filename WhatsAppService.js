/**
 * ==========================================================
 * Project KARMA
 * WhatsAppService.gs
 * ----------------------------------------------------------
 * Encapsulates all Meta WhatsApp Cloud API operations.
 * ==========================================================
 */

class WhatsAppService {

  /**
   * ----------------------------------------------------------
   * Parses incoming Meta Webhook payload.
   * ----------------------------------------------------------
   */
  static parsePayload(e) {

    const payload = JSON.parse(e.postData.contents);

    const value = payload.entry?.[0]?.changes?.[0]?.value;

    if (!value || !value.messages || value.messages.length === 0) {
      return null;
    }

    const message = value.messages[0];

    return {

      phoneNumber: message.from,

      message: message.text?.body?.trim() || "",

      messageId: message.id,

      timestamp: message.timestamp,

      rawPayload: payload

    };

  }

  /**
   * ----------------------------------------------------------
   * Sends a WhatsApp message using Meta Cloud API.
   * ----------------------------------------------------------
   */
  static sendMessage(phoneNumber, message) {

    try {

      const url =
        `https://graph.facebook.com/${WHATSAPP.API_VERSION}/${WHATSAPP.PHONE_NUMBER_ID}/messages`;

      const payload = {

        messaging_product: "whatsapp",

        to: phoneNumber,

        type: "text",

        text: {

          body: message

        }

      };

      const options = {

        method: "post",

        contentType: "application/json",

        headers: {

          Authorization:
            "Bearer " + WHATSAPP.ACCESS_TOKEN

        },

        payload: JSON.stringify(payload),

        muteHttpExceptions: true

      };

      const response =
        UrlFetchApp.fetch(url, options);

      const result =
        JSON.parse(response.getContentText());

      KarmaLogger.info(
        "WhatsApp message sent successfully."
      );

      return result;

    }
    catch (error) {

      KarmaLogger.error(error);

      throw error;

    }

  }

}