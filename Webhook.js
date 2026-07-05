/**
 * ==========================================================
 * Project KARMA
 * Webhook.gs
 * ----------------------------------------------------------
 * Receives incoming WhatsApp webhook requests.
 * ==========================================================
 */

class Webhook {

  static receive(e) {

    try {

      KarmaLogger.info(
        EVENTS.WEBHOOK_RECEIVED,
        "Incoming WhatsApp webhook received."
      );

      // Validate incoming request
      if (!e || !e.postData || !e.postData.contents) {

        throw new Error("No POST data received.");

      }

      const payload = e.postData.contents;

      KarmaLogger.info(
        EVENTS.WEBHOOK_PAYLOAD_RECEIVED,
        "Webhook payload received successfully."
      );

      Repository.saveAuditLog(payload);

      MessageDispatcher.dispatch(payload);

      KarmaLogger.info(
        EVENTS.WEBHOOK_PROCESSED,
        "Webhook processed successfully."
      );

      return ContentService
        .createTextOutput("EVENT_RECEIVED")
        .setMimeType(ContentService.MimeType.TEXT);

    }
    catch (error) {

      KarmaLogger.error(
        EVENTS.WEBHOOK_PROCESSING_FAILED,
        error
      );

      return ContentService
        .createTextOutput("ERROR")
        .setMimeType(ContentService.MimeType.TEXT);

    }

  }

}