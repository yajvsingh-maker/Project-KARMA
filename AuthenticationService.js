/**
 * ==========================================================
 * Project KARMA
 * AuthenticationService.gs
 * ----------------------------------------------------------
 * Handles employee authentication.
 * ==========================================================
 */

class AuthenticationService {

  /**
   * Authenticate an employee using
   * Employee ID + DOB
   */
  static authenticate(employeeId, enteredDOB) {

    try {

      const employee = Repository.findEmployeeById(employeeId);

      // Employee not found
      if (!employee) {

        KarmaLogger.warning(
          EVENTS.AUTH_FAILED,
          `Employee '${employeeId}' not found.`
        );

        return {

          success: false,

          code: AUTH_CODES.INVALID_EMPLOYEE,

          message: MESSAGES.INVALID_EMPLOYEE

        };

      }

      // Employee inactive
      if (employee.status !== STATUS.ACTIVE) {

        KarmaLogger.warning(
          EVENTS.AUTH_FAILED,
          `Employee '${employeeId}' is inactive.`
        );

        return {

          success: false,

          code: AUTH_CODES.INACTIVE_EMPLOYEE,

          message: MESSAGES.INACTIVE_EMPLOYEE

        };

      }

      // DOB mismatch
      if (employee.dob !== enteredDOB) {

        KarmaLogger.warning(
          EVENTS.AUTH_FAILED,
          `Invalid DOB for employee '${employeeId}'.`
        );

        return {

          success: false,

          code: AUTH_CODES.INVALID_DOB,

          message: MESSAGES.INVALID_DOB

        };

      }

      // Authentication successful

      KarmaLogger.info(
        EVENTS.AUTH_SUCCESS,
        `Employee '${employeeId}' authenticated successfully.`
      );

      return {

        success: true,

        code: AUTH_CODES.SUCCESS,

        employee: employee,

        message: "Authentication Successful"

      };

    }
    catch (error) {

      KarmaLogger.error(
        EVENTS.AUTH_FAILED,
        error
      );

      return {

        success: false,

        code: AUTH_CODES.SYSTEM_ERROR,

        message: "An unexpected error occurred."

      };

    }

  }

}