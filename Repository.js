/**
 * ==========================================================
 * Project KARMA
 * Repository.gs
 * ----------------------------------------------------------
 * Central Repository Layer
 *
 * All Google Sheets interaction must happen here.
 * ==========================================================
 */

class Repository {

  // ==========================================================
  // CORE METHODS
  // ==========================================================

  static getSpreadsheet() {
    return SpreadsheetApp.getActiveSpreadsheet();
  }

  static getSheet(sheetName) {

    const sheet =
      this.getSpreadsheet().getSheetByName(sheetName);

    if (!sheet) {
      throw new Error(`Sheet '${sheetName}' not found.`);
    }

    return sheet;

  }

  static getRows(sheetName) {

    return this
      .getSheet(sheetName)
      .getDataRange()
      .getValues();

  }

  static appendRow(sheetName, rowData) {

    try {

      this.getSheet(sheetName)
          .appendRow(rowData);

    }
    catch (error) {

      Logger.log(error);
      throw error;

    }

  }

  // ==========================================================
  // AUDIT METHODS
  // ==========================================================

  static saveAuditLog(payload) {

    this.appendRow(

      SHEETS.AUDIT_LOG,

      [

        new Date(),

        payload

      ]

    );

  }

  static saveErrorLog(error) {

    this.appendRow(

      SHEETS.ERROR_LOG,

      [

        new Date(),

        error.toString()

      ]

    );

  }

  // ==========================================================
  // EMPLOYEE METHODS
  // ==========================================================

  static findEmployeeById(employeeId) {

    const rows =
      this.getRows(SHEETS.EMPLOYEES);

    for (let i = 1; i < rows.length; i++) {

      const row = rows[i];

      if (

        row[EMPLOYEE_COLUMNS.EMPLOYEE_ID] === employeeId

      ) {

        return {

          employeeId:

            row[EMPLOYEE_COLUMNS.EMPLOYEE_ID],

          employeeName:

            row[EMPLOYEE_COLUMNS.EMPLOYEE_NAME],

          dob:

            row[EMPLOYEE_COLUMNS.DOB],

          departmentId:

            row[EMPLOYEE_COLUMNS.DEPARTMENT_ID],

          roleId:

            row[EMPLOYEE_COLUMNS.ROLE_ID],

          status:

            row[EMPLOYEE_COLUMNS.STATUS]

        };

      }

    }

    return null;

  }

  // ==========================================================
  // SESSION METHODS
  // ==========================================================

  static getSession(phoneNumber) {

    const rows =
      this.getRows(SHEETS.SESSIONS);

    for (let i = 1; i < rows.length; i++) {

      const row = rows[i];

      if (

        String(

          row[SESSION_COLUMNS.PHONE_NUMBER]

        ) === String(phoneNumber)

      ) {

        return {

          row: i + 1,

          sessionId:

            row[SESSION_COLUMNS.SESSION_ID],

          phoneNumber:

            row[SESSION_COLUMNS.PHONE_NUMBER],

          employeeId:

            row[SESSION_COLUMNS.EMPLOYEE_ID],

          currentState:

            row[SESSION_COLUMNS.CURRENT_STATE],

          currentWorkflow:

            row[SESSION_COLUMNS.CURRENT_WORKFLOW],

          authenticated:

            row[SESSION_COLUMNS.AUTHENTICATED],

          lastActivity:

            row[SESSION_COLUMNS.LAST_ACTIVITY]

        };

      }

    }

    return null;

  }

  static createSession(phoneNumber) {

    this.appendRow(

      SHEETS.SESSIONS,

      [

        Utilities.getUuid(),

        phoneNumber,

        "",

        STATES.WAITING_EMPLOYEE_ID,

        WORKFLOWS.LOGIN,

        false,

        new Date()

      ]

    );

  }

  static updateSession(session) {

    const sheet =
      this.getSheet(SHEETS.SESSIONS);

    sheet.getRange(

      session.row,

      SESSION_COLUMNS.EMPLOYEE_ID + 1

    ).setValue(session.employeeId);

    sheet.getRange(

      session.row,

      SESSION_COLUMNS.CURRENT_STATE + 1

    ).setValue(session.currentState);

    sheet.getRange(

      session.row,

      SESSION_COLUMNS.CURRENT_WORKFLOW + 1

    ).setValue(session.currentWorkflow);

    sheet.getRange(

      session.row,

      SESSION_COLUMNS.AUTHENTICATED + 1

    ).setValue(session.authenticated);

    sheet.getRange(

      session.row,

      SESSION_COLUMNS.LAST_ACTIVITY + 1

    ).setValue(new Date());

  }

  static deleteSession(phoneNumber) {

    const session =
      this.getSession(phoneNumber);

    if (session) {

      this.getSheet(SHEETS.SESSIONS)
          .deleteRow(session.row);

    }

  }

}