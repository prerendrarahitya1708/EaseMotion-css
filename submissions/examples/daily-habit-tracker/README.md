# Daily Habit Tracker

## What does this do?
A daily habit tracker where users can add habits, check off completion for
each day of the week (Mon-Sun), see weekly progress as a percentage, track
current streaks, and delete habits. All data persists via `localStorage`.

## How is it used?
Open `index.html`. Type a habit name and click **Add**. Click the day
boxes (M, T, W, T, F, S, S) to mark a habit complete for that day —
the weekly progress bar and streak counter update automatically. Click
✕ to delete a habit.

## Why is it useful?
Provides a complete, self-contained interactive example demonstrating
EaseMotion CSS utility classes (`.ease-card`, `.ease-flex`, `.ease-btn`,
`.ease-check`, `.ease-strike`) combined with vanilla JS CRUD and
`localStorage` persistence — a real-world reference for building stateful
UI components with the framework. Pure CSS transitions/animations for
checkboxes, progress bar, and new habit entries, with
prefers-reduced-motion support.