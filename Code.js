function doPost(e) {

  try {

    Repository.saveAuditLog("STEP 1");

    const request = WhatsAppService.parsePayload(e);

    Repository.saveAuditLog("STEP 2");

    if (!request) {

      Repository.saveAuditLog("STEP 2A - Not a message");

      return ContentService
        .createTextOutput("EVENT_RECEIVED")
        .setMimeType(ContentService.MimeType.TEXT);

    }

    Repository.saveAuditLog(
      "STEP 3 : " + request.message
    );

    const response =
      MessageDispatcher.dispatch(
        request.phoneNumber,
        request.message
      );

    Repository.saveAuditLog(
      "STEP 4 : " + JSON.stringify(response)
    );

    WhatsAppService.sendMessage(
      request.phoneNumber,
      response.reply
    );

    Repository.saveAuditLog("STEP 5");

    return ContentService
      .createTextOutput("EVENT_RECEIVED")
      .setMimeType(ContentService.MimeType.TEXT);

  }
  catch(error){

    try{

      SpreadsheetApp
        .getActiveSpreadsheet()
        .getSheetByName("LOG_Error")
        .appendRow([

          new Date(),

          error.toString(),

          error.stack

        ]);

    }catch(e){}

    throw error;

  }

}