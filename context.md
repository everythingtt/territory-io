# Project Context: Territory.io (v2.3+)

This document provides essential context and instructions for AI assistants working on this project.

## Core Project Overview
Territory.io is a grid-based territorial expansion strategy game. It features a high-performance rendering engine using HTML5 Canvas and an optimized data structure for real-time strategy gameplay.

### Technical Stack
- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript (ES6+).
- **Rendering**: HTML5 Canvas (3840x2160 native resolution).
- **Data Management**: `Uint8Array` buffers for grid data (`tileTypes`, `tileOwners`, `cityLevels`, `tileFlags`) to ensure low memory footprint.
- **Hosting**: GitHub Pages (`https://toothpainsel.github.io/territory-io/`).

## Critical Architectural Patterns

### 1. Grid Logic
- The game uses a 1D array to represent a 2D grid.
- **Index Calculation**: `index = y * COLS + x`.
- **Coordinate Recovery**: `x = index % COLS`, `y = Math.floor(index / COLS)`.

### 2. Entity Management
- `state.entities[0]` is always `WILD` (unclaimed).
- `state.entities[1]` is always the `PLAYER`.
- Bots occupy indices `2` through `N`.
- **Stat Sync**: Always ensure `state.entities[1]` properties (balance, ownedCount, etc.) are synced with the global `state` variables during UI and Leaderboard updates.

### 3. Economy & Expansion
- **Tile Cost**: Per-entity basis (`entity.tileCost`). Costs increase by 0.25 per successful claim.
- **Income**: Calculated per tick based on tile count, city bonuses, and development levels.
- **Expansion**: Handled via the `claim(x, y, free, ownerIdx)` function.

### 4. Difficulty Settings
- **Insane Bots**: Update every tick (1s) rather than every cycle (10s) for aggressive expansion.

## Instructions for Future AI Assistants

### 1. Code Modification Rules
- **Maintain Performance**: When editing `gameLoop` or grid-traversal logic, prioritize $O(n)$ or better algorithms. Avoid nested loops over the grid whenever possible.
- **Buffer Integrity**: Respect the `Uint8Array` data types. Do not store complex objects inside these buffers.
- **Responsive UI**: Ensure all modals (`city-modal`, `diplomacy-modal`, etc.) remain centered and mobile-friendly via Tailwind.

### 2. Synchronization Requirements
- If you modify the core game logic in `index.html`, you **MUST** sync the changes to GitHub using the provided Personal Access Token (PAT) if available in the session context.
- **GitHub Info**:
  - Owner: `everythingtt`
  - Repo: `territory-io`
  - File: `index.html`

### 3. Feature Preservation
- Do not revert the **per-entity tile cost** logic.
- Ensure the **leaderboard sorting** remains numeric (using `parseFloat` or `Number`) to prevent lexicographical sorting bugs.
- Maintain the **anti-debugging** and **context menu disabling** scripts unless explicitly asked to remove them for development purposes.

## Key Files
- `index.html`: The monolithic game file (Code, CSS, and Assets).
- `ngrok.yml`: (Deprecated) Configuration for ngrok.
- `context.md`: This file.
