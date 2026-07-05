/**
 * ==========================================================
 * Project KARMA
 * PurchaseService.gs
 * ----------------------------------------------------------
 * Handles Purchase Request workflow.
 * ==========================================================
 */

class PurchaseService {

  static process(payload) {

    KarmaLogger.info(
      EVENTS.PURCHASE_REQUEST_STARTED,
      "Purchase Request workflow started."
    );

    KarmaLogger.info(
      EVENTS.PURCHASE_REQUEST_PAYLOAD,
      JSON.stringify(payload)
    );

  }

}