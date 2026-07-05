/**
 * ==========================================================
 * Project KARMA
 * Messages.gs
 * ==========================================================
 */

const MESSAGES = {

  WELCOME:

`✅ Welcome to Project KARMA 👋

Karmadevi Automated Response Mechanism Assistant

Please enter your Employee ID.`,

  ASK_DOB:

"Please enter your Date of Birth (DD/MM/YYYY).",

  HELP:

`Available commands:

help - Show available commands
menu - Show main menu
logout - End your session
restart - Start again
cancel - Return to main menu`,

  LOGOUT_SUCCESS:

"You have been logged out successfully.",

  RESTART_SUCCESS:

`Conversation restarted.

Please enter your Employee ID.`,

  AUTHENTICATION_REQUIRED:

"Please authenticate first by entering your Employee ID.",

  INVALID_EMPLOYEE:

"❌ Employee ID not found.\n\nPlease try again.",

  INVALID_DOB:

"❌ Incorrect Date of Birth.\n\nPlease try again.",

  INACTIVE_EMPLOYEE:

"Your employee account is inactive.\nPlease contact HR.",

  MAIN_MENU(name){

return `✅ Welcome ${name}

1️⃣ New Purchase Request

2️⃣ Track My Requests

3️⃣ Help`;

  }

};
