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

      KarmaLogger.warning(
        EVENTS.WHATSAPP_INVALID_PAYLOAD,
        "Webhook payload does not contain any WhatsApp messages."
      );

      return null;

    }

    const message = value.messages[0];

    KarmaLogger.info(
      EVENTS.WHATSAPP_PAYLOAD_PARSED,
      `Message received from ${message.from}`
    );

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
Repository.saveAuditLog("META URL : " + url);
Repository.saveAuditLog("API VERSION : " + WHATSAPP.API_VERSION);
      
const response =
  UrlFetchApp.fetch(url, options);

const responseCode =
  response.getResponseCode();

const responseBody =
  response.getContentText();

Repository.saveAuditLog(
  "META RESPONSE : " +
  responseCode +
  " : " +
  responseBody
);

const result =
  JSON.parse(responseBody);

if (responseCode >= 200 && responseCode < 300) {

  KarmaLogger.info(
    EVENTS.WHATSAPP_MESSAGE_SENT,
    `Message sent successfully to ${phoneNumber}.`
  );

} else {

  KarmaLogger.error(
    EVENTS.WHATSAPP_MESSAGE_SEND_FAILED,
    responseBody
  );

}

return result;
    }
    catch (error) {

      KarmaLogger.error(
        EVENTS.WHATSAPP_MESSAGE_SEND_FAILED,
        error
      );

      throw error;

    }

  }

}