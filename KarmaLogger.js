/**
 * ==========================================================
 * Project KARMA
 * KarmaLogger.gs
 * ----------------------------------------------------------
 * Central logging utility.
 *
 * All application logging should go through this class.
 * ==========================================================
 */

class KarmaLogger {

  /**
   * Information messages
   */
  static info(message) {

    Logger.log("[INFO] " + message);

    Repository.appendRow(
      SHEETS.APPLICATION_LOG,
      [
        new Date(),
        "INFO",
        message
      ]
    );

  }

  /**
   * Warning messages
   */
  static warn(message) {

    Logger.log("[WARN] " + message);

    Repository.appendRow(
      SHEETS.APPLICATION_LOG,
      [
        new Date(),
        "WARN",
        message
      ]
    );

  }

  /**
   * Error messages
   */
  static error(error) {

    const message =
      (error instanceof Error)
        ? error.message
        : error;

    Logger.log("[ERROR] " + message);

    Repository.appendRow(
      SHEETS.ERROR_LOG,
      [
        new Date(),
        message
      ]
    );

  }

}