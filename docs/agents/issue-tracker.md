# Issue tracker: GitHub

Issues and specs for this repo live in GitHub Issues. Use the `gh` CLI.

- Create: `gh issue create --title "..." --body "..."`
- Read: `gh issue view <number>`
- List: `gh issue list --state open`
- Comment, label, or close: use `gh issue comment`, `gh issue edit`, or `gh issue close`.
- Use GitHub sub-issues for child tickets and native issue dependencies for blockers.
- Before creating an issue, confirm the target with `gh repo view --json nameWithOwner`.
- PRs are not a triage request surface.

For Wayfinder, use one map issue with child issues as tickets. Label the map
`wayfinder:map`; record each child's type with `wayfinder:research`,
`wayfinder:prototype`, `wayfinder:grilling`, or `wayfinder:task`.
