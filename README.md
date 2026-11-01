# JobTrack

A small single-user app for tracking job applications. Add an application, follow its status through the hiring process, and find it again with search, filter and sort. Everything is stored in the browser, so there is no backend and no account to create.

## Features

- **New application form** with validation (company and position are required), a date picker and a status selector. The form resets and shows a success message after saving.
- **Panel page** with a table of all applications.
- **Statistics cards** showing the total and the count for each status. The numbers update as applications are added, edited, removed or change status.
- **Search** by company or position (case-insensitive).
- **Status filter** and **date sorting** (newest first / oldest first). Search, filter and sort work together.
- **Inline status change** directly in the table, saved immediately.
- **View modal** with all details of an application, including a clickable link.
- **Edit modal** that reuses the same form component as the "new application" page.
- **Delete** with a confirmation prompt.
- **Light and dark mode** with a switch in the header. The choice is remembered.
- **Persistent data:** applications and the theme choice are saved to `localStorage` and survive a page refresh.

## Tech stack

| Area | Tool |
|---|---|
| Framework | React 19 with Vite |
| Language | TypeScript |
| UI components | Ant Design |
| State management | Zustand (with the `persist` middleware) |
| Routing | React Router |
| Dates | dayjs |

## Getting started

Requirements: Node.js 20.19+ (or 22.12+) and npm.

```bash
git clone https://github.com/Narminkerimovaa/JobTracker.git
cd JobTracker
npm install
npm run dev
```

The app opens at `http://localhost:5173`.

Other scripts:

```bash
npm run build     # type-check and create a production build
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## Project structure

```
src/
├── components/
│   ├── ApplicationForm.tsx   # form used for both creating and editing
│   └── Header.tsx            # logo, navigation menu, theme switch
├── constants/
│   └── status.ts             # status labels, colors and select options
├── pages/
│   ├── NewApplicationPage.tsx  # "/"
│   └── PanelPage.tsx           # "/panel"
├── store/
│   ├── useApplicationStore.ts  # applications: add, remove, update, update status
│   └── useThemeStore.ts        # light/dark mode
├── types/
│   └── application.ts        # Application and Status types
├── App.tsx                   # layout, routes, theme provider
└── main.tsx
```

## Design decisions

- **One form, two uses.** `ApplicationForm` takes optional props (`initialData`, `submitText`, `onCancel`), so the same component powers the "new application" page and the edit modal.
- **Status as a union type.** `Status` is `'sent' | 'interview' | 'offer' | 'rejected'`. Labels and colors live in one place (`constants/status.ts`) as `Record<Status, string>` lookups, so TypeScript reports a missing entry if a status is ever added.
- **Dates stored as strings.** Dates are saved as `YYYY-MM-DD` text because `localStorage` can only hold JSON. They are converted to dayjs objects only inside the form and formatted for display. This format also sorts correctly as plain text.
- **Derived data is not stored.** Statistics, filtered and sorted lists are calculated from the single `applications` array on every render, so there is no second copy that can fall out of sync.
- **Theme through tokens.** Colors come from Ant Design theme tokens and `ConfigProvider`, so switching to dark mode needs no extra CSS.

## Data and privacy

All data stays in your browser's `localStorage` under the keys `jobtrack-application` and `jobtrack-theme`. Nothing is sent to a server. Clearing site data removes your applications, and data is not shared between browsers or devices.

## Possible next steps

- Export and import applications as a JSON file
- Azerbaijani translation of Ant Design's built-in texts
- Empty-state message for a new user
- Reminder for applications that stay in "Sent" for a long time
