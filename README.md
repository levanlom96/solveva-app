# Travel Route Builder — Project Summary

## Overview
A small, class-based **graph editor** built with **Vite + React (TypeScript)** that lets you design travel routes on a canvas using **React Flow (@xyflow/react)**. The **graph domain logic** (cycles + forbidden paths) is **decoupled** from the React UI.

---

## Tech Stack
- **Build/Runtime:** Vite (React + TS), Node **22.18**
- **UI Canvas:** @xyflow/react (React Flow)
- **Routing:** react-router-dom
- **State:** React Context + `useReducer`
- **Notifications:** react-toastify
- **Schema Validation:** Zod (runtime type safety & JSON validation)
- **CSS Utilities:** classnames (conditional CSS classes)
- **Testing:** Vitest (configured; partial coverage)
- **Linting:** ESLint + Prettier

---

## Getting Started
- Install: `npm install`
- Dev server: `npm run dev`
- Tests: `npm run test` (Vitest)
- Lint: `npm run lint`

---

## Project Structure (high level)
- `src/App.tsx` – App shell, routing, base includes.
- `index.scss` – Reset + small shared styles (kept simple for prototype scope).
- `graph-management/` – **Core domain** classes (`TravelGraph`, `EdgeChecker`, node/edge models).
- `pages/`, `components/`, `hooks/`, `assets/` – UI and helpers.
- `store/` – App-wide state (Context + `useReducer`), used for sharing route state and import/export.
- `utils/` – Validation schemas (Zod), import/export utilities, and data sanitization.

---

## Architecture at a Glance
- **UI layer (React Flow):** Renders nodes/edges and handles user interactions.
- **Domain layer (graph-management):** Pure classes for nodes, edges, and graph rules.
- **Validation layer (Zod):** Runtime schema validation for data integrity and type safety.
- **Route checks:** `TravelGraph` receives an `EdgeChecker` instance, keeping traversal/validation logic separate from storage/mutation.
- **Error-first communication:** UI attempts a domain mutation in a `try/catch`; only on success does it update React Flow state—preventing invalid states from ever reaching the renderer.
- **Type-safe data flow:** Zod schemas ensure compile-time and runtime type consistency across import/export operations.

---

## Graph Domain Model
- **GraphNode / GraphEdge:** Minimal, ID-focused representations (no UI metadata).
- **TravelGraph:**
    - Holds nodes/edges plus dictionaries for O(1) lookups.
    - Validates before mutating:
        - Node/edge existence checks
        - Self-loop prevention
        - **Cycle prevention:** checks reachability (BFS) of `target → source`; if reachable, adding `source → target` would create a cycle.
        - **Forbidden routes:** enforced via `EdgeChecker`.
- **EdgeChecker:**
    - Accepts a JSON list of `{ from, to }` forbidden pairs.
    - Uses BFS reachability to detect violations.
    - For forbidden detection, **temporarily** adds the candidate edge, evaluates reachability, then rolls back—ensuring correctness without permanently mutating.

---

## React Flow Integration (UI)
- The canvas component **initializes** `TravelGraph(new EdgeChecker(forbiddenPaths))`. Essentially this component acts as initializator and provider of dependency for the travel graph.
- On connect/drop/delete:
    1. Ask the domain to validate/mutate.
    2. If accepted, mirror the change in React Flow’s local state.
    3. Errors are surfaced via toasts.
- This keeps **UI rendering state** and **graph validation state** cleanly separated.

---

## Import / Export
- Utilities for JSON **export/import** of React Flow's nodes/edges (which the domain has already validated).
- A sample `premade-graph/import.json` is included to reproduce a graph with multiple node types and different metadata.
- Import path rebuilds the in-memory graph, validating edges as they're re-added.

### Security & Validation
- **Zod Schema Validation:** All imported data is validated against strict TypeScript schemas before processing.
- **Data Sanitization:** Custom string sanitization removes potentially dangerous content (script tags, event handlers, control characters).
- **Error Handling:** Comprehensive try/catch blocks with user-friendly toast notifications for import failures.
- **Type Safety:** `z.infer` ensures runtime validation aligns perfectly with compile-time types.
- **Safe JSON Parsing:** All `JSON.parse` operations are wrapped in error handling to prevent crashes.

---

## Prototype Notes
This is a **quick prototype** aimed at demonstrating architectural decisions and domain separation. Non-critical UI components were implemented rapidly to meet time constraints.

---

## What I'd Improve for Production
1. **Test coverage:** Broaden unit tests, especially around edge cases in graph validation and Zod schema validation logic.
2. **Data fetching:** If API usage grows, use React Query for caching and request lifecycle management (overkill for the current single-call flow).
3. **Forbidden-routes algorithm:** Replace the temporary-mutation approach with a more direct reachability prediction to avoid transient writes while keeping correctness.
4. **Theming/UX:** Add a theming system and responsive design polish once the domain layer is fully settled.
5. **Performance optimization:** Consider lazy loading for large graphs and virtualization for better scalability.
6. **Enhanced error boundaries:** Add React error boundaries to gracefully handle unexpected runtime errors.

---

## Recent Improvements
Since the initial prototype, several production-ready enhancements have been implemented:

### Code Quality & Type Safety
- **Zod Integration:** Complete runtime validation with compile-time type inference using `z.infer<typeof Schema>`
- **Component Modernization:** All function components converted to consistent arrow function syntax
- **Import Optimization:** Removed unused React imports and applied type-only imports where appropriate
- **CSS Standardization:** Converted all `rem` units to `px` for consistent sizing across browsers

### Security & UX Enhancements  
- **JSON Security:** Safe parsing with comprehensive error handling and data sanitization
- **User Notifications:** Replaced browser alerts with modern toast notifications throughout the app
- **Async/Await Consistency:** Standardized async patterns across the codebase for better maintainability

---

## Closing
The project showcases a clear **separation of concerns**: React handles rendering and interaction; the **domain layer** enforces graph rules and integrity; and the **validation layer** ensures data integrity at runtime. The recent enhancements demonstrate a production-ready approach to type safety, security, and user experience. I'm happy to discuss design trade-offs, validation strategies, and next steps in more depth.

# THANK YOU!