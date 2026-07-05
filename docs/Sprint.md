Story ID
US-001

Story Title
Global Commands Framework

Status
🟡 Ready for Development

Business Objective
Provide a framework that allows employees to execute common commands regardless of where they are in the conversation.
This creates a consistent user experience and establishes the foundation for all future workflows.

User Story
As an employee
I want to be able to type commands like help, menu, logout, restart and cancel at any point,
So that I can always recover from a conversation without getting stuck.

Scope
This story introduces the Global Command Framework.
It does not implement any Purchase Request logic or modify the authentication workflow.

## Architectural Constraints

Do not redesign the architecture.

Do not rename unrelated methods.

Do not refactor outside the scope of this story.

Prefer extension over modification.

Maintain backward compatibility.

If a design improvement is identified that falls outside the story scope, document it in the implementation report instead of implementing it.

Commands
Command
Available
Behaviour
help
Always
Displays available commands
menu
Authenticated users
Displays the Main Menu
logout
Authenticated users
Ends the current session
restart
Always
Deletes the current session and starts a new conversation
cancel
Authenticated users
Returns to the Main Menu (future workflows may override this)

Architecture Decision
Create a new component:

GlobalCommandHandler

This component is responsible for:
	•	Detecting global commands
	•	Executing them
	•	Returning the appropriate response
	•	Returning "not handled" when the message is not a global command
MessageDispatcher remains responsible only for routing conversation states.

Components
New

GlobalCommandHandler.js


Update

Constants.js

Messages.js

MessageDispatcher.js

SessionService.js

Tests.js


Do Not Modify

Repository.js

AuthenticationService.js

WhatsAppService.js

EmployeeHandler.js

DOBHandler.js

unless absolutely necessary.

Technical Requirements
Constants
Introduce

COMMANDS

No hardcoded command strings.

Messages
Add
	•	HELP
	•	LOGOUT_SUCCESS
	•	RESTART_SUCCESS

Session Service
Add

logout()

restart()


Dispatcher
Before state routing:

Incoming Message

↓

GlobalCommandHandler

↓

Handled?

↓

YES → Return response

↓

NO

↓

Continue normal dispatcher


Acceptance Criteria
AC-01
Authenticated employee types

menu

Main Menu is displayed.

AC-02
Employee types

help

Help message is displayed.
Conversation state is unchanged.

AC-03
Authenticated employee types

logout

Session is deleted.
Next message starts a new conversation.

AC-04
Employee types

restart

Conversation restarts.
Authentication begins again.

AC-05
Authenticated employee types

cancel

Main Menu is displayed.

Regression Requirements
The following must continue working without change:
	•	Employee Authentication
	•	DOB Validation
	•	Session Creation
	•	Session Authentication
	•	Main Menu
	•	Existing Tests

Definition of Done
	•	All five commands implemented.
	•	Existing authentication flow passes.
	•	New regression tests added.
	•	Code reviewed.
	•	Ready for clasp push.

Git Commit Message

US-001 Global Command Framework
