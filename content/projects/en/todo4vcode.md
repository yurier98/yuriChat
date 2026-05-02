---
slug: todo4vcode
locale: en
title: ToDo4VCode
description: Task management extension for VS Code and compatible editors, created to plan, prioritize, and connect tasks with code without leaving the development environment.
publishedAt: 2025/12/31
readingTime: 5
cover: todo4vcode/cover.webp
favorite: true
tags:
  - VS Code Extension
  - TypeScript
  - Productivity
  - Developer Tools
  - Open Source
  - Kanban
  - Planning
---

# ToDo4VCode

ToDo4VCode is a task management extension for VS Code and editors compatible with its ecosystem, such as Cursor, Antigravity, and other forks. I created it with a clear idea in mind: reduce the constant jump between the editor, planning tools, external boards, and priority managers.

The problem was familiar. Many developers write code in one place, plan tasks in another platform, prioritize in another system, and end up switching context too many times during the day. That workflow breaks focus, slows execution, and turns project organization into an extra burden. ToDo4VCode brings planning into the same space where technical work happens.

I launched the extension on December 31, New Year's Eve, as a first version focused on tasks, priorities, due dates, and reminders inside the editor. Since then, it has evolved into a more complete planning tool for real projects: list, Kanban, calendar, subtasks, filters, data shared through Git, and tasks connected directly to code snippets.

## Impact

The project is published on [Open VSX](https://open-vsx.org/extension/YurierHerrera/todo4vcode), on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=YurierHerrera.todo4vcode), and its source code is available on [GitHub](https://github.com/yurier98/ToDo4VCode).

On Open VSX, it passed 1,000 downloads, an important signal because that registry is the natural channel for many VS Code-compatible editors that do not depend directly on Microsoft's marketplace. The extension also maintains a public 5-star rating, with comments highlighting its usefulness and simplicity.

That growth validates the original hypothesis: developers do not need another isolated board; they need a more direct way to turn pending work into visible actions inside the editor.

## Main Features

- MoSCoW prioritization to classify tasks as Must, Should, Could, or Won't and keep the focus on real impact.
- Three connected views: list for fast execution, Kanban for status tracking, and calendar for time-based planning.
- Compact calendar in the sidebar and full calendar mode to move tasks visually between days or leave them unscheduled.
- Subtasks with progress tracking to split large tasks without losing context.
- VS Code reminders for important due dates.
- Status bar statistics with counts for critical, in-progress, completed, and overdue tasks.
- Filters by search, tags, and completed tasks.
- Links between code and tasks: an editor selection can become a new task or be attached to an existing task.
- Optional shared tasks in `.todo4vcode/shared-tasks.json`, designed to be versioned with Git and used by teams.
- JSON import and export to back up, migrate, or reuse data in workflows with agents and developer tools.

## Product Evolution

The first public version started with a simple foundation: task management, priority system, List and Kanban views, due dates, reminders, subtasks, statistics, and visual support for VS Code themes.

Version 1.1 improved the daily experience: independent state persistence between the sidebar and full-screen view, clickable cards, visual adjustments, prevention of multiple open panels, and task detail opening from reminder notifications.

Version 1.2 responded to control and portability needs: configuration panel, data import/export, automatic settings synchronization, and an important fix to prevent subtask loss when saving.

Version 1.3 expanded the product toward more professional planning: calendar in the sidebar and full-screen mode, drag-and-drop matrix, more consistent filters, better tag handling, direct code references, Git-shared tasks, and automatic import of `TODO`, `FIXME`, and `NOTE` comments from the workspace.

More than adding features for volume, the extension has moved closer to real work patterns: planning, executing, reviewing code, collaborating, and keeping the project backlog inside the editor.

## Learnings

This project taught me that a small tool can have impact when it removes friction from a frequent part of the development workflow. The key was not to create another project management system, but to integrate priority and tracking decisions into the place where the developer is already focused.

It also reinforced the importance of publishing through open channels like Open VSX. Many users work in Cursor, Antigravity, or other VS Code-compatible environments, and for them Open VSX can be more relevant than the traditional Microsoft marketplace.

![ToDo4VCode interface](/projects/todo4vcode/cover.webp)
![ToDo4VCode Kanban](/projects/todo4vcode/kanban.webp)
![ToDo4VCode calendar planning](/projects/todo4vcode/calendar.webp)
![ToDo4VCode task details](/projects/todo4vcode/task-details.webp)
