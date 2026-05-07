# task-dashboard-react

React (Vite + JavaScript) task management dashboard: create tasks with title, description, status (Pending / In Progress / Completed), and due date; filter and sort the list; see status counts at the top; tasks persist in `localStorage`. Routes: **`/`** (all tasks) and **`/completed`** (completed only).

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173/`).

**Environment:** Node.js **18+** (LTS is fine). This project uses Vite 5 and React 18.

```bash
npm run build    # production bundle
npm run preview  # serve the build locally
npm run lint     # eslint
```

## Stack

- React 18, Vite 5
- Tailwind CSS
- Context API + `useTasks` hook
- `react-router-dom` v6 for client-side routing

## Data

No backend: tasks are stored in the browser under the key `task-dashboard:tasks` (JSON). Clearing site data removes them.
