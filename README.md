# Agentic AI Telecom Support Chatbot

An Agentic AI-powered customer support chatbot for mobile telecom services, inspired by the Airtel Thanks Assistant.

Unlike traditional rule-based chatbots, this project uses an **LLM tool-calling architecture**. The AI reasons about every user message, decides which backend tools to invoke, gathers information from multiple sources (database + knowledge base), and returns structured, mobile-friendly responses.

The project serves as a Proof of Concept (POC) demonstrating how modern LLM agents can automate customer support while maintaining safety for account operations and payment-related actions.

---

# Overview

The chatbot is capable of:

- Answering account-related questions using live customer data
- Searching telecom FAQs using Retrieval-Augmented Generation (RAG)
- Handling compound questions requiring multiple tools
- Recommending recharge plans
- Safely performing recharge requests through a confirmation workflow
- Escalating unresolved issues to human support
- Returning structured responses optimized for mobile applications

---

# Key Features

## Account Support

- Check account balance
- View remaining data
- View active plan
- Check plan expiry
- Fetch customer information from PostgreSQL

---

## Knowledge Base (RAG)

Retrieve answers from Airtel FAQ pages using semantic search.

Supports questions like:

- How do I check my bill?
- How do I claim OTT benefits?
- How do I activate roaming?
- How do I change my plan?

---

## Recharge Workflow

Recharge requests follow a secure two-step process.

```
User
    │
    ▼
Request Recharge
    │
    ▼
Pending Action Created
    │
    ▼
User Confirmation
    │
    ▼
Recharge Executed
```

The chatbot **never claims a recharge is complete until explicit confirmation is received.**

---

## Human Escalation

The chatbot automatically escalates conversations when:

- The user requests a human agent
- Complaints are detected
- Refund requests are made
- Multiple unsuccessful attempts occur

---

## Structured Responses

Each response may include:

- Natural language reply
- Quick reply suggestions
- Recharge cards
- Confirmation requirements
- Pending action identifiers

---

# Tech Stack

## Backend

- Django
- PostgreSQL
- pgvector


## AI

- Gemini 2.5 Flash
- Gemini Embeddings

## Vector Search

- pgvector
- Cosine Similarity Search

## Web Scraping

- BeautifulSoup
- Requests

---

# System Architecture

```
Client
    │
    ▼
FastAPI
    │
    ▼
Agent Loop
    │
 ┌──┴───────────────┐
 │                  │
 ▼                  ▼
Database          RAG Search
 │                  │
 ▼                  ▼
Account Data    Knowledge Base
```

---

# Agent Workflow

Every user message is processed through an agent loop.

The LLM can decide to:

- Read customer account information
- Search the knowledge base
- List recharge plans
- Propose a recharge
- Escalate to a human agent

Multiple tools may be invoked within a single conversation turn.

---

# Tool Inventory

| Tool | Purpose |
|------|---------|
| get_account_summary | Retrieve customer account information |
| list_plans | List available recharge plans |
| propose_recharge | Create a pending recharge request |
| search_knowledge | Search the FAQ knowledge base |
| escalate_to_human | Create a customer support ticket |

---

# Knowledge Base

The chatbot builds a semantic knowledge base from Airtel FAQ pages.

Pipeline:

```
FAQ Pages
     │
     ▼
BeautifulSoup Parser
     │
     ▼
Q&A Chunking
     │
     ▼
Gemini Embeddings
     │
     ▼
pgvector Database
```

Each FAQ is stored as an individual semantic chunk for efficient retrieval.

---

# Database

Main entities include:

- Customer
- Plan
- ChatSession
- Message
- PendingAction
- Ticket
- KnowledgeChunk

The system combines transactional customer data and vector embeddings within PostgreSQL.

---

# API Endpoints

## Chat

```
POST /api/chat
```

Processes user messages through the agent loop.

---

## Confirm Recharge

```
POST /api/confirm
```

Executes pending recharge requests after user confirmation.

---

## Knowledge Ingestion

```
POST /api/ingest
```

Adds new knowledge to the vector database.

---

# Security

The architecture separates AI reasoning from business-critical operations.

Safety mechanisms include:

- Recharge confirmation gate
- Database transactions
- Ownership validation
- Prompt injection resistance
- Conversation isolation
- Controlled tool access
- Iteration limits
- Input validation

---

# Acceptance Tests

The project includes acceptance tests covering:

- Account queries
- Recharge workflow
- FAQ retrieval
- Compound questions
- Human escalation
- Prompt injection attempts
- Hallucination prevention

---

# Project Goals

- Demonstrate modern agentic AI workflows
- Combine structured data with semantic search
- Provide safe automation for telecom customer support
- Build a production-ready architecture that can evolve into a full-scale AI assistant

---

# License

This project is intended for educational purposes and proof-of-concept development.
