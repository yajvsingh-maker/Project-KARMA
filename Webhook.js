class Webhook {

  static receive(e) {

    try {

      KarmaLogger.info("Webhook Invoked");

      // Validate incoming request
      if (!e || !e.postData || !e.postData.contents) {
        throw new Error("No POST data received.");
      }

      const payload = e.postData.contents;

      KarmaLogger.info("Payload Received");

      Repository.saveAuditLog(payload);

      MessageDispatcher.dispatch(payload);

      return ContentService
        .createTextOutput("EVENT_RECEIVED")
        .setMimeType(ContentService.MimeType.TEXT);

    }
    catch (error) {

      KarmaLogger.error(error);

      return ContentService
        .createTextOutput("ERROR")
        .setMimeType(ContentService.MimeType.TEXT);

    }

  }

}