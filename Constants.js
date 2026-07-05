const SHEETS = {

  AUDIT_LOG: "LOG_Audit",

  APPLICATION_LOG: "LOG_Application",

  ERROR_LOG: "LOG_Errors",

  EMPLOYEES: "M_Employees",

  DEPARTMENTS: "M_Departments",

  PURCHASE_REQUESTS: "T_PurchaseRequests" ,

  SESSIONS: "T_Sessions"

  // etc...
};

const STATES = {

  START: "START",

  WAITING_EMPLOYEE_ID: "WAITING_EMPLOYEE_ID",

  WAITING_DOB: "WAITING_DOB",

  MAIN_MENU: "MAIN_MENU",

  PURCHASE_REQUEST: "PURCHASE_REQUEST"

};

const AUTH_CODES = {

  SUCCESS: "SUCCESS",

  INVALID_EMPLOYEE: "INVALID_EMPLOYEE",

  INVALID_DOB: "INVALID_DOB",

  INACTIVE_EMPLOYEE: "INACTIVE_EMPLOYEE"

};

const WORKFLOWS = {

  LOGIN: "LOGIN",

  PURCHASE: "PURCHASE",

  HELP: "HELP"

};

const COMMANDS = {

  HELP: "help",

  MENU: "menu",

  LOGOUT: "logout",

  RESTART: "restart",

  CANCEL: "cancel"

};

const SESSION={

TIMEOUT:30

};

const STATUS={

ACTIVE:"Active",

INACTIVE:"Inactive"

};

const BOOLEAN={

YES:true,

NO:false

};

// ==========================================================
// EMPLOYEE COLUMN INDEXES (0-based)
// ==========================================================

const EMPLOYEE_COLUMNS = {

  EMPLOYEE_ID: 0,
  EMPLOYEE_NAME: 1,
  DOB: 2,
  DEPARTMENT_ID: 3,
  ROLE_ID: 4,
  STATUS: 5

};

// ==========================================================
// SESSION COLUMN INDEXES (0-based)
// ==========================================================

const SESSION_COLUMNS = {

  SESSION_ID: 0,
  PHONE_NUMBER: 1,
  EMPLOYEE_ID: 2,
  CURRENT_STATE: 3,
  CURRENT_WORKFLOW: 4,
  AUTHENTICATED: 5,
  LAST_ACTIVITY: 6

};

const EVENTS = {

  // Authentication
  AUTH_SUCCESS: "...",
  AUTH_FAILED: "...",

  // WhatsApp
  WHATSAPP_PAYLOAD_PARSED: "...",
  WHATSAPP_INVALID_PAYLOAD: "...",
  WHATSAPP_MESSAGE_SENT: "...",
  WHATSAPP_MESSAGE_SEND_FAILED: "...",

  // Webhook
  WEBHOOK_RECEIVED: "...",
  WEBHOOK_PROCESSED: "...",
  WEBHOOK_PROCESSING_FAILED: "...",

  // Purchase Requests
  PURCHASE_REQUEST_STARTED: "...",
  PURCHASE_REQUEST_CREATED: "...",

  // ...
};

/**
 * ==========================================================
 * Log Levels
 * ==========================================================
 */

const LOG_LEVELS = {

  INFO: "INFO",

  WARNING: "WARNING",

  ERROR: "ERROR"

};


