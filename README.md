# Personal Website

Personal portfolio and blog site built with React, Vite, and Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

## CTF Writeups

The site features an interactive writeups viewer with sidebar navigation for browsing challenges from multiple repositories:
- **picoCTF** - 16 beginner-level web exploitation challenges
- **webhacking.kr** - 12 intermediate web security challenges
- **LA CTF 2025** - 7 advanced CTF challenges
- **pwnable.kr** - 13 advanced binary exploitation challenges

### Fetch writeups from GitHub

```bash
npm run fetch-writeups
```

This scans repositories defined in `writeups-config.json` and downloads markdown content from each challenge's `solution.md` file. Files are stored in `blogs/_includes/` and automatically copied to the build directory.

### Writeups Viewer

Access at `/writeups.html` to browse all 48 writeups with:
- Sidebar navigation grouped by repository
- Live markdown rendering with syntax highlighting
- Difficulty indicators (beginner/intermediate/advanced)
- Mobile-responsive design with hamburger menu

### Add a new repository

1. Edit `writeups-config.json` with repository details
2. Run `npm run fetch-writeups` to download writeups
3. Update the REPOS array in `src/Writeups.jsx` with writeup titles

### Configuration

`writeups-config.json` controls repositories, difficulty levels, and categories. The fetch script automatically handles different default branch names (main/master).

## Build

```bash
npm run build:site
```

Output will be in `docs/` directory. The build process automatically copies writeups to the public directory.
