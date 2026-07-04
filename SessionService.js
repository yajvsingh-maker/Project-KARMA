/**
 * ==========================================================
 * Project KARMA
 * SessionService.gs
 * ==========================================================
 */

class SessionService {

  /**
   * Returns existing session
   */
  static get(phoneNumber){

      return Repository.getSession(phoneNumber);

  }

  /**
   * Creates a new Login session
   */
  static start(phoneNumber){

      Repository.createSession(phoneNumber);

      return Repository.getSession(phoneNumber);

  }

  /**
   * Update conversation state
   */
  static changeState(session,newState){

      session.currentState = newState;

      Repository.updateSession(session);

  }

  /**
   * Complete authentication
   */
  static authenticate(session,employeeId){

      session.employeeId = employeeId;

      session.authenticated = true;

      session.currentState = STATES.MAIN_MENU;

      session.currentWorkflow = WORKFLOWS.LOGIN;

      Repository.updateSession(session);

  }

  /**
   * Close session
   */
  static end(phoneNumber){

      Repository.deleteSession(phoneNumber);

  }

}