# SOGICA Cursor Pack

This pack contains:
- `CURSOR_MASTER_PROMPT.md`
- project-specific Cursor skills in `.cursor/skills/`

## Install the custom skills

From the project root, copy the `.cursor` folder from this pack into the repository root.

Cursor discovers project skills in `.cursor/skills/` (and also supports `.agents/skills/`).

## Recommended external skills

Run from the SOGICA project root:

```bash
npx skills@latest add vercel-labs/agent-skills --skill vercel-react-best-practices --skill vercel-composition-patterns --skill web-design-guidelines --agent cursor -y

npx skills@latest add vercel/next.js --agent cursor -y

npx skills@latest add neondatabase/agent-skills --skill neon --skill neon-postgres --skill neon-postgres-branches --agent cursor -y
```

Also install the Neon plugin from Cursor's Customize / Marketplace if you want Cursor to have live Neon project tooling.

## Workflow

1. Put the supplied SOGICA documents, logo assets, photos and videos somewhere Cursor can inspect.
2. Install the external skills above.
3. Copy the custom skills into the repo.
4. Open `CURSOR_MASTER_PROMPT.md` and paste it into a fresh Cursor Agent session.
5. Give the Agent access to the relevant media/document folders.
6. Let it implement phase by phase, reviewing commits as you go.
