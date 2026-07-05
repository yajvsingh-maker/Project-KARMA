# Project KARMA

## Changelog

All notable changes to Project KARMA are documented in this file.

Project KARMA follows an incremental sprint-based development approach.

---

# Version 0.3.1
## Authentication Pilot Baseline

**Release Date**

05 July 2026

**Status**

Stable Baseline

---

### Overview

This release establishes the first stable end-to-end implementation of Project KARMA.

Employees can authenticate themselves through WhatsApp using Employee ID and Date of Birth. The platform now supports session management, conversation state management, audit logging and Google Apps Script deployment through Git and clasp.

This version is considered the baseline for all future development.

---

### New Features

#### WhatsApp Platform

- Integrated Meta WhatsApp Cloud API.
- Implemented webhook endpoint.
- Added inbound message processing.
- Added outbound messaging service.
- Added payload parsing.

---

#### Authentication

- Employee authentication using Employee ID.
- Date of Birth verification.
- Active employee validation.
- Authentication result codes.
- Authentication service layer.

---

#### Conversation Engine

- Session creation.
- Session retrieval.
- Session updates.
- Conversation state machine.
- Main Menu after successful authentication.

---

#### Architecture

- Repository Pattern.
- Service Layer.
- Message Dispatcher.
- Conversation Handlers.
- Response Builder.
- Centralized Constants.

---

#### Persistence

- Google Sheets integration.
- Employee repository.
- Session repository.
- Audit logging.
- Error logging.

---

#### Development Environment

- Local development using Visual Studio Code.
- Git repository initialized.
- clasp deployment pipeline established.
- Codex integrated into development workflow.

---

### Bugs Fixed

- Fixed authentication regression introduced during Sprint 0.
- Fixed session update issues.
- Fixed Message Dispatcher routing.
- Fixed DOB authentication flow.
- Fixed WhatsApp response handling.
- Fixed Apps Script deployment issues.
- Fixed clasp deployment configuration.

---

### Technical Improvements

- Repository refactored to use column constants.
- Authentication result codes standardized.
- Session management simplified.
- Repository responsibilities clarified.
- Improved code readability.

---

### Testing

Successfully validated:

- Employee authentication.
- Invalid employee handling.
- Invalid DOB handling.
- Successful authentication.
- Session persistence.
- WhatsApp end-to-end communication.
- Apps Script deployment.
- Meta webhook integration.

---

### Known Limitations

The following capabilities are intentionally deferred to future sprints.

- Global commands.
- Session timeout.
- Logout.
- Restart conversation.
- Help command.
- Correlation IDs.
- Script Properties for secrets.
- Centralized error handling.
- Automated regression tests.
- Purchase workflow.
- Approval workflow.

---

### Repository

Baseline Tag

v0.3.1-authentication-pilot

Baseline Branch

main

Development Branch

sprint-0.3.2-platform-hardening

---

# Upcoming

## Sprint 0.3.2

Platform Hardening

Planned Features

- Global Commands
- Session Timeout
- Structured Logging
- Script Properties
- Central Error Handling
- Regression Test Suite

---

## Sprint 0.4

Purchase Request Workflow

Planned Features

- Create Purchase Request
- Draft Requests
- Request Tracking
- Manager Approval Integration

---

## Sprint 0.5

Approval Workflow

Planned Features

- Multi-level approvals
- Escalation
- Notifications

---

## Sprint 0.6

HR Self Service

Planned Features

- Leave Management
- Attendance
- Employee Services

---

## Sprint 0.7

ERP Integration

Planned Features

- Ekal Sutra ERP integration
- Finance synchronization
- HR synchronization

---

## Version 1.0

Enterprise AI Assistant

Target Vision

Project KARMA becomes the unified conversational platform for employees across the Karmadevi Group.