/**
 * ==========================================================
 * Project KARMA
 * GlobalCommandHandler.gs
 * ----------------------------------------------------------
 * Handles commands available across conversation states.
 * ==========================================================
 */

class GlobalCommandHandler {

  static handle(request) {

    const phoneNumber =
      request.phoneNumber;

    const message =
      request.message;

    const session =
      request.session;

    const command =
      String(message || "")
        .trim()
        .toLowerCase();

    if (command === COMMANDS.HELP) {

      return ResponseBuilder.success(
        this.getHelpMessage(request)
      );

    }

    if (command === COMMANDS.RESTART) {

      SessionService.restart(phoneNumber);

      return ResponseBuilder.success(
        MESSAGES.RESTART_SUCCESS
      );

    }

    if (
      command === COMMANDS.MENU ||
      command === COMMANDS.LOGOUT ||
      command === COMMANDS.CANCEL
    ) {

      if (!session || session.authenticated !== true) {

        if (!session) {

          SessionService.start(phoneNumber);

        }

        return ResponseBuilder.error(
          MESSAGES.AUTHENTICATION_REQUIRED
        );

      }

    }

    if (!session || session.authenticated !== true) {

      return null;

    }

    if (command === COMMANDS.LOGOUT) {

      SessionService.logout(phoneNumber);

      return ResponseBuilder.success(
        MESSAGES.LOGOUT_SUCCESS
      );

    }

    if (
      command === COMMANDS.MENU ||
      command === COMMANDS.CANCEL
    ) {

      const employeeName =
        SessionService.getEmployeeName(session);

      return ResponseBuilder.success(
        MESSAGES.MAIN_MENU(employeeName)
      );

    }

    return null;

  }

  static getHelpMessage(request) {

    return MESSAGES.HELP;

  }

}
