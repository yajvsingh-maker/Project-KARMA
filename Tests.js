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


