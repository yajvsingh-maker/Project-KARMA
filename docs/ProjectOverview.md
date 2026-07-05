# Project KARMA

**Karmadevi Automated Response Mechanism Assistant**

Version: v0.3.1 Authentication Pilot Baseline

Status: Active Development

Owner: Karmadevi Group of Institutions

Product Owner: Yajuvendra Vikram Singh (CIO)

---

# 1. Vision

Project KARMA (Karmadevi Automated Response Mechanism Assistant) is an enterprise conversational platform designed exclusively for employees of the Karmadevi Group of Institutions.

Its purpose is to provide a secure, simple and intuitive WhatsApp-based interface through which employees can access institutional services without requiring a traditional web portal or mobile application.

The long-term vision is to make WhatsApp the primary employee interaction channel for HR, Finance, Administration, Procurement and ERP services.

Project KARMA is intended to evolve into the digital assistant for every employee across the Karmadevi Group.

---

# 2. Project Objectives

The objectives of Project KARMA are:

• Reduce manual administrative work.

• Improve employee self-service.

• Standardize internal workflows.

• Provide a conversational user experience.

• Integrate multiple institutional systems through a single interface.

• Build a scalable platform that can evolve incrementally.

---

# 3. Current Status

Current Release

v0.3.1 Authentication Pilot

Current Sprint

Sprint 0.3.2 – Platform Hardening

Current Capabilities

✓ WhatsApp Cloud API Integration

✓ Employee Authentication

✓ Employee ID Verification

✓ Date of Birth Authentication

✓ Session Management

✓ Conversation State Machine

✓ Repository Pattern

✓ Google Sheets Data Layer

✓ Audit Logging

✓ Error Logging

---

# 4. Target Users

Project KARMA is intended exclusively for internal employees of the Karmadevi Group.

Typical users include:

• Faculty

• Administrative Staff

• Finance Team

• HR Team

• Procurement Team

• Management

The application is not intended for students or external users.

---

# 5. Technology Stack

Backend

Google Apps Script

Data Store

Google Sheets

Messaging Platform

Meta WhatsApp Cloud API

Development Environment

Visual Studio Code

Version Control

Git

Deployment

clasp

AI Development Assistants

ChatGPT

Codex

---

# 6. Architectural Principles

The architecture follows several fundamental principles.

## Simplicity

The solution should remain easy to understand and maintain.

Readability is preferred over clever implementation.

---

## Separation of Concerns

Each component has one responsibility.

Examples

Repository

↓

Data Access

Service

↓

Business Logic

Handler

↓

Conversation Logic

Dispatcher

↓

Routing

---

## Repository Pattern

All access to Google Sheets must occur through Repository.

Business Services must never directly access Google Sheets.

---

## State Machine

Every employee conversation is treated as a finite state machine.

Examples

WAITING_EMPLOYEE_ID

WAITING_DOB

MAIN_MENU

Future workflows will introduce additional conversation states.

---

## Extensibility

Every architectural decision should support future workflows without requiring significant redesign.

---

# 7. Development Principles

The project is intentionally built incrementally.

Every sprint should produce a stable and deployable application.

The main branch should always remain releasable.

No feature should introduce regressions into existing functionality.

---

# 8. AI Development Workflow

Project KARMA is developed collaboratively using AI.

Responsibilities are divided as follows.

Product Owner

Yajuvendra Vikram Singh

Responsible for

• Product Vision

• Business Requirements

• Prioritization

---

Solution Architect

ChatGPT

Responsible for

• Architecture

• Sprint Planning

• User Stories

• Design Reviews

• Technical Guidance

---

Lead Software Engineer

Codex

Responsible for

• Implementation

• Refactoring

• Unit Tests

• Code Improvements

• Debugging

Codex implements only the current approved story.

Future stories should never be implemented in advance.

---

# 9. Development Workflow

Every feature follows the same process.

1.

ChatGPT creates the Story.

↓

2.

Codex implements the Story.

↓

3.

Code Review

↓

4.

Git Commit

↓

5.

clasp Push

↓

6.

Deploy Apps Script

↓

7.

End-to-End WhatsApp Test

↓

8.

Update CHANGELOG

---

# 10. Current Roadmap

Completed

Sprint 0.3.1

Authentication Pilot

Current

Sprint 0.3.2

Platform Hardening

Upcoming

Sprint 0.4

Purchase Request Workflow

Sprint 0.5

Manager Approval Workflow

Sprint 0.6

HR Self-Service

Sprint 0.7

ERP Integration

Sprint 1.0

AI Assistant

---

# 11. Success Criteria

Project KARMA is successful when employees can perform common institutional tasks entirely through WhatsApp with minimal training.

The platform should remain:

• Reliable

• Secure

• Simple

• Extensible

• Easy to maintain

Every new feature should build upon the existing architecture rather than replacing it.

Long-term maintainability is more important than rapid feature development.

---

# 12. Guiding Philosophy

Project KARMA is not simply a chatbot.

It is an enterprise workflow platform delivered through WhatsApp.

Every architectural decision should contribute towards that long-term vision while maintaining simplicity, reliability and operational efficiency.