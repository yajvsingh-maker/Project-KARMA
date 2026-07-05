Coding Standards
Project KARMA
Coding Standards
Version: 1.0
Status: Active
Last Updated: 05 July 2026

1. Purpose
This document defines the coding standards for Project KARMA.
Its objective is to ensure that all code remains:
	•	Simple
	•	Readable
	•	Consistent
	•	Maintainable
	•	Easy to review
These standards apply equally to:
	•	Human developers
	•	ChatGPT
	•	Codex
	•	Any future AI coding assistant
Whenever there is a conflict between writing clever code and writing understandable code, understandability always wins.

2. Core Engineering Principles
Rule 1
Readability is more important than cleverness.
Prefer code that another developer can understand within minutes.

Rule 2
Keep solutions simple.
Do not introduce abstraction until there is a demonstrated need.
Avoid premature optimisation.

Rule 3
Every class should have a single responsibility.
A class should have one reason to change.

Rule 4
Prefer extension over modification.
Add new functionality without unnecessarily changing existing behaviour.

Rule 5
Maintain backward compatibility.
Existing working functionality must not be broken by new features.

3. Layer Responsibilities
Project KARMA follows a layered architecture.
Every layer has clearly defined responsibilities.

Repository
Responsible for:
	•	Reading data
	•	Writing data
	•	Updating data
	•	Deleting data
Repository must NEVER:
	•	Contain business logic
	•	Validate users
	•	Calculate values
	•	Make workflow decisions

Services
Responsible for business logic.
Examples
	•	Authentication
	•	Purchase Requests
	•	Leave Management
Services must never access SpreadsheetApp directly.
Services must use Repository.

Handlers
Responsible for conversation flow.
Handlers:
	•	Receive messages
	•	Call Services
	•	Return Responses
Handlers must never:
	•	Access Google Sheets
	•	Contain business rules

Message Dispatcher
Responsible only for routing.
Dispatcher should never become a business logic class.

4. Google Sheets Access
SpreadsheetApp must only be used inside Repository.
Incorrect
AuthenticationService
↓
SpreadsheetApp
Correct
AuthenticationService
↓
Repository
↓
SpreadsheetApp

5. Constants
Magic strings are prohibited.
Examples
Use
STATES.MAIN_MENU
Instead of
"MAIN_MENU"
Use
COMMANDS.HELP
Instead of
"help"
Use
SHEETS.EMPLOYEES
Instead of
"Employees"

6. Method Design
Methods should:
Do one thing.
Do it well.
Keep methods short.
Avoid deeply nested logic.
If a method becomes difficult to understand, split it.

7. Naming Standards
Use meaningful names.
Good
authenticateEmployee()
Bad
auth()

Good
employeeRepository
Bad
repo

Avoid abbreviations unless universally understood.

8. Session Rules
Session should contain only conversation state.
Examples
✓ Phone Number
✓ Employee ID
✓ Authentication Status
✓ Current Workflow
✓ Current State
Avoid storing data that can easily be retrieved elsewhere.

9. Error Handling
Never ignore exceptions.
Catch only when the exception can be handled.
Every unexpected exception should be logged.
Employees should receive friendly messages rather than stack traces.

10. Logging
Use Audit Log for:
	•	Business events
	•	Authentication
	•	Workflow progression
Use Error Log for:
	•	Exceptions
	•	Unexpected failures
Avoid excessive logging.
Logs should help diagnose problems.

11. Testing
Every new feature must include regression tests.
Every bug fix should include a test that prevents the same issue from reoccurring.
Authentication flow must always continue to pass after any enhancement.

12. Git Standards
One User Story = One Git Commit.
Commit messages should describe business functionality.
Examples
US-001 Implement Global Command Framework
US-002 Add Session Timeout
Avoid generic messages such as
"Fixed stuff"
"Updates"
"WIP"

13. Sprint Discipline
Only implement the current approved User Story.
Do not implement future stories.
Do not perform unrelated refactoring.
Do not redesign the architecture during implementation.
Architectural improvements should be proposed separately.

14. AI Development Rules
Before implementing any code, AI assistants should read:
	1	ProjectOverview.md
	2	Architecture.md
	3	Sprint.md
Only the current Story should be implemented.
AI assistants should:
	•	Keep changes minimal
	•	Preserve existing behaviour
	•	Explain architectural decisions
	•	Identify regression risks
	•	Suggest a commit message

15. Code Review Checklist
Every implementation should be reviewed against the following checklist.
□ Story scope respected
□ No unnecessary refactoring
□ Repository unchanged unless required
□ Business logic remains inside Services
□ No duplicated code
□ Existing functionality preserved
□ Regression tests updated
□ Readability maintained
□ Ready for deployment

16. Definition of Done
A User Story is complete only when:
✓ Acceptance criteria satisfied
✓ Existing tests pass
✓ New tests added
✓ Code reviewed
✓ Git committed
✓ Deployed using clasp
✓ End-to-end WhatsApp testing completed
✓ CHANGELOG updated

17. Guiding Philosophy
Project KARMA is an internal enterprise platform.
The primary goals are:
	•	Reliability
	•	Simplicity
	•	Maintainability
The codebase should remain understandable by a competent developer within a single day.
Every new feature should make the platform more valuable without making it more complicated.
Simple software that is easy to maintain is preferred over sophisticated software that is difficult to understand.

18. Protect the Working System
Never refactor working code while implementing a new feature.
If architectural improvements are identified during development:
	1	Complete the current User Story first.
	2	Document the improvement.
	3	Schedule it as a separate User Story.
Feature implementation and architectural refactoring should not be combined into the same change unless explicitly approved.
