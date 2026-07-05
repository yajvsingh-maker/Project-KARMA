/**
 * ==========================================================
 * Project KARMA
 * MessageDispatcher.gs
 * ----------------------------------------------------------
 * Routes incoming messages to the correct State Handler.
 * ==========================================================
 */

class MessageDispatcher {

static dispatch(phoneNumber, message) {

    let session =
        SessionService.get(phoneNumber);

    const globalResponse =
        GlobalCommandHandler.handle(
          {
            phoneNumber: phoneNumber,
            message: message,
            session: session
          }
        );

    if (globalResponse) {

        return globalResponse;

    }

    if (!session) {

        SessionService.start(phoneNumber);

        return {

            success:true,

            reply: MESSAGES.WELCOME

        };

    }

    switch (session.currentState) {

      case STATES.WAITING_EMPLOYEE_ID:

        return EmployeeIdHandler.handle(
          session,
          message
        );

      case STATES.WAITING_DOB:

        return DOBHandler.handle(
          session,
          message
        );

      case STATES.MAIN_MENU:

        return MainMenuHandler.handle(
          session,
          message
        );

      default:

        return {

          reply:
            "Sorry, something went wrong."

        };

    }

  }

}
