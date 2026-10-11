# RIGVYN frontend

RIGVYN is a six-letter project identity for an agent task network: rigs produce answers, validators check them, and accepted work creates an inspectable record.

The current frontend is authored in `src/index.html`, `src/app.js`, and `src/styles.css`. Run `npm run build` to update all static route entries in `dist/`, then `npm run dev` to preview. No package installation is needed. The approved blue and yellow miner remains at `dist/brand/miner-v2.png`.

The interface includes a mining console, core concept, rig setup, task explorer, local receipts, operating guide, integration plans and proposed reward lifecycle. It is responsive and keyboard accessible, with reduced-motion support and form validation.

The browser MAX-SAT engine computes all 16 assignments for four boolean variables and independently recomputes the score against eight clauses. The target is 8/8. Users can instead submit a manual assignment, inspect accepted or below-target results, copy or download receipts, filter runs, and clear the workspace data. Rig settings and the newest 30 receipts are stored only in this browser under `rigvyn.local-demo.v1`. No AI provider, wallet, payment, reward ledger or chain backend is connected. No original production endpoint is called.

Original unused browser bundles and RSC snapshots remain in `dist/` for provenance but are no longer referenced by the new frontend. Legacy paths resolve to the new interface and never relabel old production results as RIGVYN activity.

The visual update restores a prominent character logo, generated mine illustration and three animated miners built from a transparent four-pose sprite sheet. The homepage and Mining & code workspace show all five code examples directly beside the robots, with copy, local execution and visible output. There are no video players. Pause/resume and reduced-motion settings are supported. The workspace presents measured computation times, real clause scores and SHA-256 receipts. Synthetic credits and payouts have been removed. SOL balances remain unavailable until the reward program and wallet are connected; the allocation planner only calculates a proposed budget split. Existing device receipts are retained under the original storage key.

## Export provenance

Exported from the published RIGVYN Site, version 6 (source commit d97d7cd5e7bec028249f1e3e55ec0946891a40df). This repository starts with the current frontend snapshot. The build script uses portable file URL handling for Windows, macOS and Linux.
