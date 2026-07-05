# Project KARMA

# Architecture Document

Version: 0.3.1

Status: Baseline

Last Updated: 05 July 2026

---

# 1. Purpose

This document defines the technical architecture of Project KARMA.

Its purpose is to ensure that every enhancement follows a consistent architecture regardless of whether the code is written by a human developer or an AI coding assistant.

Whenever architectural decisions conflict with implementation convenience, this document takes precedence.

---

# 2. System Overview

Project KARMA is an enterprise conversational platform built on Google Apps Script that enables employees of the Karmadevi Group to interact with institutional services through WhatsApp.

The application follows a layered architecture with strict separation between:

• Conversation Layer

• Business Layer

• Data Access Layer

The architecture is intentionally simple and optimized for long-term maintainability.

---

# 3. High-Level Architecture

                        Meta WhatsApp
                              │
                              ▼
                         Webhook Entry
                              │
                              ▼
                      WhatsAppService
                              │
                              ▼
                    MessageDispatcher
                              │
                 ┌────────────┴────────────┐
                 │                         │
                 ▼                         ▼
       GlobalCommandHandler       State Handler
                                            │
                                            ▼
                                 Business Services
                                            │
                                            ▼
                                     Repository
                                            │
                                            ▼
                                    Google Sheets

---

# 4. Layered Architecture

The application is divided into logical layers.

## Layer 1

Messaging Layer

Responsibilities

• Receive WhatsApp messages

• Send WhatsApp messages

• Parse Meta payloads

Classes

• Webhook

• WhatsAppService

---

## Layer 2

Conversation Layer

Responsibilities

• Route conversations

• Manage conversation states

• Execute handlers

Classes

• MessageDispatcher

• GlobalCommandHandler (Sprint 0.3.2)

• EmployeeHandler

• DOBHandler

• MainMenuHandler

---

## Layer 3

Business Services

Responsibilities

Implement business rules.

Examples

Authentication

Purchase Requests

Leave

HR

Approval Workflow

Services must never access Google Sheets directly.

---

## Layer 4

Repository

Responsibilities

Read and write data.

Nothing else.

Repository must never contain business logic.

---

## Layer 5

Persistence

Google Sheets

Acts as the persistence layer for Project KARMA.

---

# 5. Design Principles

## 5.1 Separation of Concerns

Every class should have one responsibility.

A class should have only one reason to change.

---

## 5.2 Repository Pattern

Repository is the only component allowed to access Google Sheets.

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

---

## 5.3 Service Layer

Business logic belongs inside Services.

Examples

Authentication

Purchase

Approval

Leave

Repository should never perform business decisions.

---

## 5.4 State Machine

Every employee conversation behaves as a finite state machine.

Examples

WAITING_EMPLOYEE_ID

WAITING_DOB

MAIN_MENU

Future workflows introduce additional states.

Handlers must only process the state they are responsible for.

---

## 5.5 Constants

Magic strings are prohibited.

Every constant should be centralized.

Examples

States

Commands

Messages

Sheet Names

Workflow Names

Result Codes

---

# 6. Conversation Flow

Incoming WhatsApp Message

↓

WhatsAppService

↓

MessageDispatcher

↓

Current State

↓

State Handler

↓

Business Service

↓

Repository

↓

Response Builder

↓

WhatsAppService

↓

Employee

---

# 7. Session Management

Every employee conversation has one active session.

A session stores:

Phone Number

Employee ID

Authentication Status

Current Workflow

Current State

Last Activity

Future versions may include:

Conversation ID

Language

Role

Current Transaction

---

# 8. Handler Responsibilities

Handlers manage conversations.

Handlers do NOT contain business rules.

Handlers do NOT access Google Sheets.

Handlers delegate work to Services.

---

# 9. Service Responsibilities

Services implement business logic.

Examples

AuthenticationService

PurchaseService

ApprovalService

LeaveService

Services should be reusable by multiple handlers.

---

# 10. Repository Responsibilities

Repository performs:

Read

Insert

Update

Delete

Nothing else.

Repository must never

Authenticate users

Validate data

Calculate business rules

Make workflow decisions

---

# 11. Logging

Current

Audit Log

Error Log

Future

Correlation ID

Conversation Timeline

Performance Metrics

Every error should be logged once.

---

# 12. Error Handling

Errors should never propagate directly to the employee.

System exceptions

↓

Logger

↓

Error Repository

↓

Friendly Message

Future

Central ErrorHandler

---

# 13. Security

Current

Employee ID

DOB Authentication

Future

Script Properties

Webhook Validation

Role-based Authorization

Rate Limiting

Replay Protection

Secrets must never be committed to Git.

---

# 14. Coding Standards

Every file contains one primary class.

No duplicated logic.

No hardcoded strings.

Meaningful method names.

Meaningful variable names.

Repository never contains business logic.

Services never access SpreadsheetApp.

Handlers never access SpreadsheetApp.

---

# 15. Development Workflow

Every enhancement follows the same process.

Architecture

↓

User Story

↓

Implementation

↓

Review

↓

Git Commit

↓

clasp Push

↓

Deployment

↓

Testing

---

# 16. Sprint Architecture Roadmap

Sprint 0.3.1

Authentication Pilot

Completed

---

Sprint 0.3.2

Platform Hardening

Global Commands

Session Timeout

Script Properties

Structured Logging

Central Error Handling

---

Sprint 0.4

Purchase Workflow

---

Sprint 0.5

Approval Engine

---

Sprint 0.6

HR Services

---

Sprint 0.7

ERP Integration

---

Sprint 1.0

AI Assistant

---

# 17. Architecture Rules

Every future enhancement must satisfy the following rules.

✓ Preserve layered architecture.

✓ Preserve Repository Pattern.

✓ Preserve State Machine.

✓ Minimize coupling.

✓ Maximize readability.

✓ No unnecessary complexity.

✓ Prefer extension over modification.

✓ Keep MessageDispatcher small.

✓ Repository accesses Google Sheets.

✓ Services implement business logic.

✓ Handlers manage conversations.

---

# 18. Future Direction

Project KARMA will evolve into a modular workflow platform.

Future modules include:

Authentication

Purchase

Approvals

Leave

HR

Finance

IT Helpdesk

Notifications

AI Assistant

Each module should plug into the existing architecture without requiring redesign of the core platform.

The architecture should remain stable even as functionality expands.

Architecture Decision Log (ADR)

Decision
Status
Reason
Google Apps Script as runtime
Accepted
Native integration with Google Workspace and low operational overhead
Google Sheets as datastore
Accepted
Low cost, simple administration, suitable for the initial scale
Repository Pattern
Accepted
Centralized data access and easier testing
State Machine conversation model
Accepted
Predictable workflows and extensibility
Git + clasp development workflow
Accepted
Professional version control and deployment process
Codex used only for implementation
Accepted
Keeps architecture and implementation responsibilities clearly separated

