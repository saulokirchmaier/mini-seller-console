# Mini Seller Console

A lightweight Console application for managing leads and opportunities, built with React, TypeScript, and Tailwind CSS. Developed as a practical test for front-end developer.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Libraries and Technologies](#libraries-and-technologies)
- [Usage Guide](#usage-guide)
- [Development](#development)

## Overview

Mini Seller Console is a a lightweight console to triage Leads and convert them into Opportunities. The application provides an intuitive interface for tracking leads, converting them to opportunities, and managing the sales pipeline.

## Features

- **Lead Management**: View, filter, search, and sort leads
- **Opportunity Management**: Track sales opportunities through different stages
- **Lead Conversion**: Convert qualified leads into opportunities
- **Responsive Design**: Works on desktop and mobile devices
- **Persistent Settings**: User preferences are saved in local storage

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ssh:

   ```bash
   git clone git@github.com:saulokirchmaier/mini-seller-console.git
   cd mini-seller-console
   ```

   https:

   ```bash
   git clone https://github.com/saulokirchmaier/mini-seller-console.git
   cd mini-seller-console
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5174`

### Building for Production

```bash
 npm run build
 # or
 yarn build
```

## Project Structure

The project follows a component-based architecture with context-based state management:

```
src/
├── assets/           # Static assets
├── components/       # UI components
│   ├── leads/        # Lead-related components
│   ├── opportunities/ # Opportunity-related components
│   └── ui/           # Reusable UI components (shadcn/ui)
├── contexts/         # React context providers
├── lib/              # Utility functions
├── types/            # TypeScript type definitions
└── App.tsx          # Main application component
```

## Libraries and Technologies

- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: UI component collection
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **Vaul**: Drawer component
- **Radix UI**: Accessible UI primitives
- **Vite**: Build tool and development server

## Usage Guide

### Managing Leads

1. Navigate to the "Leads" tab
2. Use the search bar to find specific leads
3. Filter leads by status (New, Contacted, In Progress)
4. Sort leads by score
5. Click on a lead to view or edit details
6. Use the "Convert to Opportunity" button to create an opportunity from a lead

### Managing Opportunities

1. Navigate to the "Opportunities" tab
2. Use the search bar to find specific opportunities
3. Filter opportunities by stage (Discovery, Proposal, Negotiation, Closed Won, Closed Lost)
4. Click on an opportunity to view or edit details
5. Update opportunity stages as they progress through your sales pipeline

### Configuration

The application automatically saves your preferences for:

- Items per page
- Current page
- Filter settings
- Sort order

These settings persist between sessions using local storage.

## Development

### Code Quality Tools

The project includes several tools to maintain code quality:

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **Commitlint**: Enforce conventional commit messages

Run linting:

```bash
npm run lint
# or
yarn lint
```

Format code:

```bash
npm run format
# or
yarn format
```
