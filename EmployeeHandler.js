/**
 * ==========================================================
 * EmployeeIdHandler.gs
 * ==========================================================
 */

class EmployeeIdHandler {

  static handle(session, message) {

    const employee =
    Repository.findEmployeeById(

        InputValidator.employeeId(message)

    );

    if (!employee) {

      return {

        success: false,

        reply:
          "❌ Employee ID not found.\n\nPlease enter a valid Employee ID."

      };

    }

    // Store Employee ID in Session

    session.employeeId =
      employee.employeeId;

    session.currentState =
      STATES.WAITING_DOB;

    Repository.updateSession(session);

    return ResponseBuilder.success(

    MESSAGES.ASK_DOB

);

  }

}