# Travel Route Builder (React + React Flow)

---

## Tech Stack

- **Build:** Vite (React + TypeScript)
- **Runtime:** Node **22.18**
- **Canvas/Graph UI:** `@xyflow/react` (React Flow)
- **State:** React Context + `useReducer`
- **Tests:** Vitest (configured; coverage is partial due to time constraints)
- **Linting:** ESLint
- **Toasts:** `react-toastify`

---

## Quick Start

> Pull the code, go to the project root and run `npm install`.  
> Use `npm run dev` to run the application.

```bash
git clone https://github.com/levanlom96/solveva-app
cd solveva-app

# Recommended: match the project's Node version
# nvm use 22.18

npm install
npm run dev
```

### Scripts

```bash
npm run dev     # start Vite dev server
npm run test    # run Vitest (covered only graph class)
npm run lint    # run ESLint
```

```bash

src/
  App.tsx                 # Routing and application bootstrap point.            
  index.scss              # reset css and global classes
  assets/
  components/             # standalone, reusable components
    Navigation/
    Footer/
    ...
  hooks/                  # custom hooks
    ...
  pages/
    Home/
    NotFound/
    TravelRouteBuilder/
      TravelRouteBuilder.tsx
      RouteCanvas/        # Main application logic
      SidePanel/
        ...
  store/                  # Simple state management solution.
    ...
  utils/
    export.utils.ts        # export JSON
    import.utils.ts        # import JSON
    search.utils.ts        # normalization helpers
  graph-management/        # graph management using JS class
    ...
premade-graph/
  import.json              # demo data to import (from header)
```