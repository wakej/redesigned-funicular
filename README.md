# redesigned-funicular — Homepage

This commit overwrites the repository's default branch (main) with a simple homepage for the redesigned-funicular project.

Files added:
- index.html
- styles.css
- script.js
- custom/fields.yml

How to customize:
- Edit custom/fields.yml to set site metadata used by templates.
- Replace the copy in index.html with project-specific content, images, or links.
- To make the repo public, visit Settings → General → Change repository visibility or run the GitHub CLI:
  gh repo edit wakej/redesigned-funicular --visibility public

Contact form:
- The form in index.html is client-side only. Wire it to a backend or a form provider to receive messages.
