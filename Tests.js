function testAuditLog(){

 Repository.saveAuditLog(
      "Project KARMA Test"
 );

}

function testDoGet() {

  const mockEvent = {
    parameter: {
      "hub.mode": "subscribe",
      "hub.verify_token": "karma_verify_token",
      "hub.challenge": "123456"
    }
  };

  const response = doGet(mockEvent);

  Logger.log(response.getContent());

}

function testRepository() {

  Repository.saveAuditLog(
    "Repository Test Successful"
  );

}

function testSystemHealth() {

  const tests = [

    { name: "Spreadsheet", test: () => Repository.getSpreadsheet() },

    { name: "Audit Sheet", test: () => Repository.getSheet(SHEETS.AUDIT_LOG) },

    { name: "Employees", test: () => Repository.getSheet(SHEETS.EMPLOYEES) },

    { name: "Departments", test: () => Repository.getSheet(SHEETS.DEPARTMENTS) },

    { name: "Purchase Requests", test: () => Repository.getSheet(SHEETS.PURCHASE_REQUESTS) }

  ];

  tests.forEach(t => {

    try {

      t.test();

      Logger.log("PASS : " + t.name);

    }

    catch (e) {

      Logger.log("FAIL : " + t.name);

    }

  });

}
function testFindEmployeeById() {

  const employee =
    Repository.findEmployeeById("EMP-000001");

  Logger.log(employee);

}

function testAuthenticationSuccess() {

  const result = AuthenticationService.authenticate(

      "EMP-000001",

      "28/05/1979"

  );

  Logger.log(result);

}

function testAuthenticationWrongDOB() {

  const result = AuthenticationService.authenticate(

      "EMP-000001",

      "01/01/2000"

  );

  Logger.log(result);

}

function testAuthenticationWrongEmployee() {

  const result = AuthenticationService.authenticate(

      "EMP-999999",

      "15/08/1979"

  );

  Logger.log(result);

}

function testCreateSession(){

    SessionService.start("919999999999");

}

function testGetSession(){

    Logger.log(

        SessionService.get("919999999999")

    );

}

function testUpdateState(){

    const session =
        SessionService.get("919999999999");

    SessionService.changeState(

        session,

        STATES.WAITING_DOB

    );

}

function testAuthenticate(){

    const session =
        SessionService.get("919999999999");

    SessionService.authenticate(

        session,

        "EMP-000001"

    );

}

function testDeleteSession(){

    SessionService.end("919999999999");

}

function testDispatcher() {

  // Create a session

  SessionService.start("919999999999");

  // Dispatch message

  const result = MessageDispatcher.dispatch(

      "919999999999",

      "Hello"

  );

  Logger.log(result);

}

function testDispatcherDOB() {

  let session =
      SessionService.get("919999999999");

  SessionService.changeState(

      session,

      STATES.WAITING_DOB

  );

  const result =
      MessageDispatcher.dispatch(

          "919999999999",

          "15/08/1979"

      );

  Logger.log(result);

}

function testDispatcherMainMenu() {

  let session =
      SessionService.get("919999999999");

  SessionService.changeState(

      session,

      STATES.MAIN_MENU

  );

  const result =
      MessageDispatcher.dispatch(

          "919999999999",

          "1"

      );

  Logger.log(result);

}

function testAuthenticationJourney() {

    const phone = "919999999999";

    SessionService.end(phone);

    Logger.log(

        MessageDispatcher.dispatch(

            phone,

            "Hi"

        )

    );

}

function testEmployeeIDJourney(){

    const phone="919999999999";

    Logger.log(

        MessageDispatcher.dispatch(

            phone,

            "EMP-000001"

        )

    );

}

function testDOBJourney(){

    const phone="919999999999";

    Logger.log(

        MessageDispatcher.dispatch(

            phone,

            "15/08/1979"

        )

    );

}

function testParsePayload() {

  const sample = {

    postData: {

      contents: JSON.stringify({

        entry: [

          {

            changes: [

              {

                value: {

                  messages: [

                    {

                      from: "919999999999",

                      id: "wamid.test123",

                      timestamp: "1750000000",

                      text: {

                        body: "Hi"

                      }

                    }

                  ]

                }

              }

            ]

          }

        ]

      })

    }

  };

  const request = WhatsAppService.parsePayload(sample);

  if (request.phoneNumber !== "919999999999")
    throw new Error("Phone number parsing failed.");

  if (request.message !== "Hi")
    throw new Error("Message parsing failed.");

  if (request.messageId !== "wamid.test123")
    throw new Error("Message ID parsing failed.");

  if (request.timestamp !== "1750000000")
    throw new Error("Timestamp parsing failed.");

  Logger.log("✅ parsePayload() test passed.");

}

function testSendMessage() {

  const result =
    WhatsAppService.sendMessage(

      "919569107903",   // Your personal mobile

      "Hello from Project KARMA 🚀"

    );

  console.log(JSON.stringify(result, null, 2));

}

function testWebAppSpreadsheet() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  Logger.log(ss);

}

function assertKarmaTest(condition, message) {

  if (!condition) {

    throw new Error(message);

  }

}

function testGlobalCommandHelp() {

  const result =
    GlobalCommandHandler.handle(
      {
        phoneNumber: "919999999999",
        message: COMMANDS.HELP,
        session: null
      }
    );

  assertKarmaTest(result.success === true, "Help command should succeed.");
  assertKarmaTest(result.reply === MESSAGES.HELP, "Help reply mismatch.");

  Logger.log("✅ Global help command test passed.");

}

function testGlobalCommandMenu() {

  const session = {
    employeeId: "EMP-000001",
    employeeName: "Test Employee",
    authenticated: true
  };

  const result =
    GlobalCommandHandler.handle(
      {
        phoneNumber: "919999999999",
        message: COMMANDS.MENU,
        session: session
      }
    );

  assertKarmaTest(result.success === true, "Menu command should succeed.");
  assertKarmaTest(
    result.reply === MESSAGES.MAIN_MENU(session.employeeName),
    "Menu reply mismatch."
  );

  Logger.log("✅ Global menu command test passed.");

}

function testGlobalCommandCancel() {

  const session = {
    employeeId: "EMP-000001",
    employeeName: "Test Employee",
    authenticated: true
  };

  const result =
    GlobalCommandHandler.handle(
      {
        phoneNumber: "919999999999",
        message: COMMANDS.CANCEL,
        session: session
      }
    );

  assertKarmaTest(result.success === true, "Cancel command should succeed.");
  assertKarmaTest(
    result.reply === MESSAGES.MAIN_MENU(session.employeeName),
    "Cancel reply mismatch."
  );

  Logger.log("✅ Global cancel command test passed.");

}

function testGlobalCommandLogout() {

  const phone = "919999999999";
  const session = {
    employeeId: "EMP-000001",
    authenticated: true
  };

  const result =
    GlobalCommandHandler.handle(
      {
        phoneNumber: phone,
        message: COMMANDS.LOGOUT,
        session: session
      }
    );

  assertKarmaTest(result.success === true, "Logout command should succeed.");
  assertKarmaTest(
    result.reply === MESSAGES.LOGOUT_SUCCESS,
    "Logout reply mismatch."
  );

  Logger.log("✅ Global logout command test passed.");

}

function testGlobalCommandRestart() {

  const phone = "919999999999";

  const result =
    GlobalCommandHandler.handle(
      {
        phoneNumber: phone,
        message: COMMANDS.RESTART,
        session: null
      }
    );

  assertKarmaTest(result.success === true, "Restart command should succeed.");
  assertKarmaTest(
    result.reply === MESSAGES.RESTART_SUCCESS,
    "Restart reply mismatch."
  );

  Logger.log("✅ Global restart command test passed.");

}

function testGlobalCommandMenuBeforeAuthentication() {

  const result =
    GlobalCommandHandler.handle(
      {
        phoneNumber: "919999999999",
        message: COMMANDS.MENU,
        session: null
      }
    );

  assertKarmaTest(
    result.success === false,
    "Menu before authentication should fail."
  );
  assertKarmaTest(
    result.reply === MESSAGES.AUTHENTICATION_REQUIRED,
    "Menu before authentication reply mismatch."
  );

  Logger.log("✅ Global menu before authentication test passed.");

}

function testGlobalCommandLogoutBeforeAuthentication() {

  const result =
    GlobalCommandHandler.handle(
      {
        phoneNumber: "919999999999",
        message: COMMANDS.LOGOUT,
        session: null
      }
    );

  assertKarmaTest(
    result.success === false,
    "Logout before authentication should fail."
  );
  assertKarmaTest(
    result.reply === MESSAGES.AUTHENTICATION_REQUIRED,
    "Logout before authentication reply mismatch."
  );

  Logger.log("✅ Global logout before authentication test passed.");

}

function testWhatsAppConfiguration() {

  if (!WHATSAPP.API_VERSION) {
    throw new Error("Missing Script Property: WHATSAPP_API_VERSION");
  }

  if (!WHATSAPP.PHONE_NUMBER_ID) {
    throw new Error("Missing Script Property: WHATSAPP_PHONE_NUMBER_ID");
  }

  if (!WHATSAPP.ACCESS_TOKEN) {
    throw new Error("Missing Script Property: WHATSAPP_ACCESS_TOKEN");
  }

  Logger.log("WhatsApp configuration loaded successfully.");

}

/**
 * ==========================================================
 * Logger Tests
 * ==========================================================
 */

function testLoggerInfo() {

  KarmaLogger.info(
    EVENTS.AUTH_SUCCESS,
    "Employee EMP001 authenticated successfully."
  );

  Logger.log("PASS: KarmaLogger.info() executed successfully.");

}


function testLoggerWarning() {

  KarmaLogger.warning(
    EVENTS.AUTH_FAILED,
    "Employee entered incorrect DOB."
  );

  Logger.log("PASS: KarmaLogger.warning() executed successfully.");

}


function testLoggerError() {

  KarmaLogger.error(
    EVENTS.AUTH_FAILED,
    new Error("Invalid Employee ID.")
  );

  Logger.log("PASS: KarmaLogger.error() executed successfully.");

}

function testKarmaLogger() {

  Logger.log("===== KARMA LOGGER TESTS =====");

  testLoggerInfo();
  testLoggerWarning();
  testLoggerError();

  Logger.log("===== ALL LOGGER TESTS PASSED =====");

}

/**
 * ==========================================================
 * Project KARMA
 * Complete Regression Test Suite
 * ==========================================================
 */

function runRegressionSuite() {

  Logger.log("========================================");
  Logger.log("PROJECT KARMA - REGRESSION TEST SUITE");
  Logger.log("========================================");

  // Configuration
  testWhatsAppConfiguration();

  // Repository
  testRepository();
  testFindEmployeeById();

  // Authentication
  testAuthenticationSuccess();
  testAuthenticationWrongDOB();
  testAuthenticationWrongEmployee();

  // Session
  testCreateSession();
  testGetSession();
  testUpdateState();
  testAuthenticate();
  testDeleteSession();

  // Dispatcher
  testDispatcher();
  testDispatcherDOB();
  testDispatcherMainMenu();

  // Global Commands
  testGlobalCommandHelp();
  testGlobalCommandMenu();
  testGlobalCommandCancel();
  testGlobalCommandLogout();
  testGlobalCommandRestart();
  testGlobalCommandMenuBeforeAuthentication();
  testGlobalCommandLogoutBeforeAuthentication();

  // WhatsApp
  testParsePayload();

  // Logging
  testLoggerInfo();
  testLoggerWarning();
  testLoggerError();

  Logger.log("========================================");
  Logger.log("ALL REGRESSION TESTS PASSED");
  Logger.log("========================================");

}

function debug1() {
  Logger.log("Start");
  Repository.getSpreadsheet();
  Logger.log("End");
}

function debug2() {
  Logger.log("Start");
  Repository.getSheet(SHEETS.AUDIT_LOG);
  Logger.log("End");
}

function debug3() {
  Logger.log("Start");
  Repository.appendRow(
    SHEETS.AUDIT_LOG,
    [new Date(), "Hello"]
  );
  Logger.log("End");
}

function debug4() {
  Logger.log("Start");
  Repository.saveAuditLog("Test");
  Logger.log("End");
}

function testWhatsAppConfiguration() {

  Logger.log("API Version: " + WHATSAPP.API_VERSION);
  Logger.log("Phone Number ID: " + WHATSAPP.PHONE_NUMBER_ID);
  Logger.log("Access Token Present: " + (WHATSAPP.ACCESS_TOKEN ? "YES" : "NO"));

}

function debugConfig() {

  Logger.log("Phone Number ID = " + WHATSAPP.PHONE_NUMBER_ID);

  Logger.log("API Version = " + WHATSAPP.API_VERSION);

}

function debugScriptProperties() {

  const props = PropertiesService.getScriptProperties();

  Logger.log("WHATSAPP_API_VERSION      : " + props.getProperty("WHATSAPP_API_VERSION"));
  Logger.log("WHATSAPP_PHONE_NUMBER_ID  : " + props.getProperty("WHATSAPP_PHONE_NUMBER_ID"));
  Logger.log("WHATSAPP_ACCESS_TOKEN     : " + (props.getProperty("WHATSAPP_ACCESS_TOKEN") ? "Present" : "Missing"));

  Logger.log("----------------------------------------");

  Logger.log("WHATSAPP.API_VERSION      : " + WHATSAPP.API_VERSION);
  Logger.log("WHATSAPP.PHONE_NUMBER_ID  : " + WHATSAPP.PHONE_NUMBER_ID);
}

function debugProject() {
  Logger.log(ScriptApp.getScriptId());
}
