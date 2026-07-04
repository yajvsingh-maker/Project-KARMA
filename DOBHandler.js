/**
 * ==========================================================
 * DOBHandler.gs
 * ==========================================================
 */

class DOBHandler {

  static handle(session, message) {

    const result =
      AuthenticationService.authenticate(

          session.employeeId,

          message.trim()

      );

    if (!result.success) {

      return ResponseBuilder.error(

    result.message,

    result.code

);

    }

    SessionService.authenticate(

        session,

        session.employeeId

    );

return ResponseBuilder.success(
    MESSAGES.MAIN_MENU(result.employee.employeeName)
);

  }

}