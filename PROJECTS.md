# Adding New Projects

Edit `projects-config.json` to add new projects. Each entry requires:

- id: unique identifier
- name: repository name
- displayName: project title
- description: brief description
- technologies: array of technologies used
- category: must match existing category
- url: GitHub repository URL

Categories are defined in the same config file. After editing, run `npm run build`.
