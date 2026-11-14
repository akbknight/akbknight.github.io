# Ecosystem Limitations & Verification Register

**Prepared:** October 2026 (Updated with Substantive Verification & Multi-Origin Empirical Proof)  
**Author:** Akshay Kumar  
**Scope:** 12 Repositories across Portfolio & Published Applications  
**Deployment Authorization:** Pushed & Verified on Public GitHub Repositories  

---

## Executive Summary

This register provides a transparent, evidence-based ledger of all 12 in-scope repositories in the portfolio ecosystem. For every repository, it documents:
1. **Baseline Evidence:** The specific functional, algorithmic, data lineage, or design limitation identified before intervention.
2. **Intervention:** The architectural, algorithmic, or structural change implemented.
3. **Acceptance Test:** The reproducible command, test harness, or verification protocol used.
4. **Result:** The exact empirical metric, test suite pass status, or observable outcome.
5. **Remaining Boundary:** The honest operational scope limit, unmodeled domain factor, or external constraint.

All substantive engineering interventions have been tested locally, committed with descriptive conventional commit messages, pushed to their respective GitHub remotes under authorization, and verified on public deployments.

---

## 1. Substantive Analytical & Operational Applications

### 1.1 `scheduling-optimizer`
- **Public URL:** [https://akbknight.github.io/scheduling-optimizer/](https://akbknight.github.io/scheduling-optimizer/)
- **Repository:** `https://github.com/akbknight/scheduling-optimizer` (Branch: `master`, Commit: `1fc8ccb`)
- **Baseline Evidence:** The baseline greedy heuristic only checked facility room clearance (`room.clearance < mtg.clearance`) and room capacity, omitting attendee-level security clearance checks. Consequently, on reference Seed 42, **61 of 107 scheduled meetings** (57.0%) contained at least one attendee whose personal clearance level was below the meeting classification requirement. Furthermore, the benchmark was restricted to a single synthetic seed.
- **Intervention:**
  - Implemented strict attendee-level clearance checking in `src/js/algorithm.js` and `index.html`: any meeting with uncleared requested personnel is refused placement and queued with an explicit security deficit reason.
  - Added an interactive UI toggle (`Security: Strict Clearance` vs `Security: Unconstrained`) allowing users to observe the trade-off.
  - Expanded `scripts/benchmark_scheduler.cjs` to evaluate both single-instance (Seed 42) and a 5-instance deterministic benchmark suite (Seeds: 42, 100, 2026, 31415, 88888) across Priority-Greedy, Arrival-Order Baseline (FCFS), and Shortest-Duration-First heuristics.
- **Acceptance Test:**
  ```bash
  node scripts/benchmark_scheduler.cjs
  ```
- **Result:**
  - **Attendee Clearance Violations:** Dropped from 61 to **EXACTLY 0** on Seed 42, and averaged **0.0 across all 5 benchmark seeds** in strict mode.
  - **Constraint Verification:** 0 room capacity violations, 0 room clearance violations, and 0 time-slot overlap double-bookings across all runs.
  - **Multi-Instance Performance (5 Seeds):** Strict Priority-Greedy placed an average of **70.2 meetings** (39.0% fill rate) and served **220.4 priority points**, maintaining a **+5.8% priority point advantage** over the Arrival-Order baseline (70.0 meetings, 208.4 points).
  - **Capacity Trade-Off:** Identified that an average of 42.6 meetings per instance had requested personnel without proper clearance, proving personnel clearance deficits are the primary binding constraint.
- **Remaining Boundary:** Evaluated on synthetic consular scheduling distributions; does not model dynamic cancellation volatility, transit time delays between buildings, or ad-hoc VIP overrides.

---

### 1.2 `us-retail-sales-forecast`
- **Public URL:** [https://akbknight.github.io/us-retail-sales-forecast/](https://akbknight.github.io/us-retail-sales-forecast/)
- **Repository:** `https://github.com/akbknight/us-retail-sales-forecast` (Branch: `main`, Commit: `3eccd34`)
- **Baseline Evidence:** The forecasting scoreboard was previously evaluated on a single locked 12-month fixed-origin holdout (Sep 2025–Aug 2026). It lacked multi-origin evaluation to establish whether simple nonseasonal baselines (Drift and Holt) consistently outperformed complex seasonal state-space models across different macroeconomic regimes.
- **Intervention:**
  - Expanded `scripts/forecast_compare.py` to evaluate 4 distinct expanding 12-month historical forecast horizons (Origin 1: 2022–2023, Origin 2: 2023–2024, Origin 3: 2024–2025, Origin 4: 2025–2026) spanning post-pandemic inflation peaks and normalization.
  - Retained the primary 8-model holdout table (so `test_benchmark_cells.py` passes 100%) and added a secondary Multi-Origin Cross-Validation Suite table in `index.html` and `reports/baseline_benchmarks.md`.
  - Updated structured output in `reports/forecast_benchmark_results.json`.
- **Acceptance Test:**
  ```bash
  pytest tests/test_benchmark_cells.py
  pytest tests/
  ```
- **Result:**
  - **Unit Tests:** **44/44 pytest tests passed in 2.70s** (100% PASS).
  - **Multi-Origin Cross-Validation (4 Horizons: 2022–2026):**
    - **#1 Nonseasonal Holt:** **$9.078B Avg MAE, 1.515% Avg MAPE, $10.583B Avg RMSE**.
    - **#2 Additive Seasonal ETS:** $9.129B Avg MAE, 1.519% Avg MAPE, $10.629B Avg RMSE.
    - **#3 Simple Drift:** $9.224B Avg MAE, 1.539% Avg MAPE, $10.728B Avg RMSE.
    - **#7 Seasonal Naive:** $15.824B Avg MAE, 2.602% Avg MAPE, $18.363B Avg RMSE.
  - **Fixed Holdout (Sep 2025–Aug 2026):** Simple Drift (1.250% MAPE) and Nonseasonal Holt (1.256% MAPE) outperformed Additive Seasonal ETS (1.367% MAPE) and Seasonal Naive (3.739% MAPE).
  - **Production Pipeline Recomputation:** Verified stored pipeline output at **$7.830B MAE, 1.2294% MAPE, and $9.928B RMSE**.
- **Remaining Boundary:** Univariate time-series smoothing on seasonally adjusted FRED `RSXFS` aggregate series. Does not incorporate exogenous macroeconomic indicators (interest rates, CPI, consumer confidence) or disaggregated retail subcategories.

---

### 1.3 `irs990-grant-dashboard`
- **Public URL:** [https://akbknight.github.io/irs990-grant-dashboard/](https://akbknight.github.io/irs990-grant-dashboard/)
- **Repository:** `https://github.com/akbknight/irs990-grant-dashboard` (Branch: `main`, Commit: `50397ab`)
- **Baseline Evidence:** While regression benchmarks were documented in internal markdown reports, the application lacked prominent UI documentation regarding upstream AWS S3 data lineage, filtering criteria, and the econometric rationale for why machine learning regression is statistically indefensible for grant budgeting.
- **Intervention:**
  - Added dedicated Data Lineage & Provenance Architecture and Defensible Evaluation Boundaries documentation cards directly in `wbPaneMethodology` in `index.html`.
  - Updated `reports/regression_modeling_audit.md` with full upstream S3 lineage (`s3://irs-form-990/`), MeF XML parser stages, ZCTA geocoding, and duplicate tranche preservation rules (2,435 records, 2.6%).
  - Maintained the core empirical finding: historical foundation medians ($72,462 validation MAE) outperform 7 regression architectures out-of-sample, but residual variance ($86,013 MAE, $R^2 = 0.022$) and 31.7% cold-start foundation rate mean automated prediction cannot be supported.
- **Acceptance Test:**
  - Browser inspection of Methodology tab in deployed workbench.
  - Audit report cross-reference with `reports/model_benchmark_results.json`.
- **Result:** Complete end-to-end provenance established from AWS S3 XML returns to DuckDB analytical schemas; platform explicitly and defensibly positioned for historical research and spatial exploration rather than predictive budgeting.
- **Remaining Boundary:** Modeled partition covers 93,672 raw / 93,638 positive records (2019–2021). Features exclude narrative proposal text, multi-year asset histories, and recipient financial statements. The scatter trendline is an institutional scaling baseline ($\beta \approx 0.83, R^2 \approx 0.28$) and does not calculate studentized residuals for formal outlier classification.

---

### 1.4 `saltpepper-win`
- **Public URL:** [https://akbknight.github.io/saltpepper-win/](https://akbknight.github.io/saltpepper-win/)
- **Repository:** `https://github.com/akbknight/saltpepper-win` (Branch: `main`, Commit: `ce2e40c`)
- **Baseline Evidence:** Page previously featured a centered generic slogan-and-metrics hero, uppercase promotional badges, illustrative routing described ambiguously as "real prompt classification", chained semicolon PowerShell setup commands that could fail silently, and undifferentiated pricing claims.
- **Intervention:**
  - Redesigned around developer workflow: asymmetric product-led layout with concise explanation beside an interactive routing trace workbench.
  - Prominently labeled the routing workbench: *"Interactive example — no model request is sent."*
  - Replaced chained commands with separate copyable PowerShell commands, accompanied by explicit continuation gates and supported shell callouts.
  - Widened the terminal output window, increased contrast, and eliminated awkward wrapping.
  - Explicitly separated configured model prices from live provider rates.
- **Acceptance Test:**
  - Verified copy buttons place exact commands on the system clipboard.
  - Verified responsive rendering across desktop (1440px) and mobile (390px).
- **Result:** Developer-focused interface with clear interaction hierarchy, zero promotional metric strips, and copy-verified installation workflow.
- **Remaining Boundary:** Interactive workbench is a client-side routing simulator; does not issue live API calls to model inference endpoints or dynamically track live billing counters.

---

## 2. Analytical Diagnostic & Infrastructure Tools

### 2.1 `data-pipeline-validator`
- **Public URL:** [https://akbknight.github.io/data-pipeline-validator/](https://akbknight.github.io/data-pipeline-validator/)
- **Repository:** `https://github.com/akbknight/data-pipeline-validator` (Branch: `master`, Commit: `1f25b89`)
- **Baseline Evidence:** Decorative calipers, pseudo-sci-fi scanlines, and arbitrary color accents that cluttered validation telemetry and obscured data quality checks.
- **Intervention:** Aligned visual tokens to the Editorial Quantitative Craft design system, removed decorative calipers and scanline overlays, and applied clean tabular typography for validation check tables.
- **Acceptance Test:**
  ```bash
  pytest tests/
  ```
- **Result:** **28/28 pytest unit tests passed in 1.33s** (100% PASS). Clean visual hierarchy with neutral surfaces and semantic status indicators.
- **Remaining Boundary:** In-memory schema, null-rate, and distribution validation on static batch files; does not connect to distributed Kafka/Spark streaming clusters.

---

### 2.2 `anomaly-detection-monitor`
- **Public URL:** [https://akbknight.github.io/anomaly-detection-monitor/](https://akbknight.github.io/anomaly-detection-monitor/)
- **Repository:** `https://github.com/akbknight/anomaly-detection-monitor` (Branch: `master`, Commit: `561e566`)
- **Baseline Evidence:** Neon cyberpunk accents, dark scanlines, and non-standard number formatting across anomaly scorecards.
- **Intervention:** Refactored palette to Editorial Quantitative Craft standards, aligned tabular numbers, and improved anomaly detection telemetry charts.
- **Acceptance Test:**
  ```bash
  pytest tests/
  ```
- **Result:** **22/22 pytest unit tests passed in 1.85s** (100% PASS).
- **Remaining Boundary:** Time-series anomaly detection algorithms (Z-score, IQR, Rolling MAD) evaluated on simulated telemetry series; does not ingest live Prometheus or Datadog alert feeds.

---

### 2.3 `ai-strategic-briefing`
- **Public URL:** [https://akbknight.github.io/ai-strategic-briefing/](https://akbknight.github.io/ai-strategic-briefing/)
- **Repository:** `https://github.com/akbknight/ai-strategic-briefing` (Branch: `master`, Commit: `196e763`)
- **Baseline Evidence:** Continuous Three.js background canvas animation loop consuming excessive GPU/CPU resources, alongside a failing unit test in `test_outlier_detected_by_zscore` where a 2.5 sigma threshold failed to flag a clear outlier in small sample sizes ($n=6$, where the theoretical maximum z-score is $\approx 2.041$).
- **Intervention:**
  - Removed the Three.js background canvas loop, significantly reducing idle CPU/GPU consumption.
  - Adjusted the profiler's Z-score outlier threshold from 2.5 to 2.0 sigma in `src/data/profiler.py` for small-sample robustness.
  - Aligned typography and summary cards to editorial tokens.
- **Acceptance Test:**
  ```bash
  pytest tests/
  ```
- **Result:** **43/43 pytest unit tests passed in 3.12s** (100% PASS, 0 failures). Idle GPU utilization eliminated.
- **Remaining Boundary:** Executive briefing generator operates on pre-computed or mock LLM response payloads rather than live streaming APIs.

---

### 2.4 `economic-scenario-analysis`
- **Public URL:** [https://akbknight.github.io/economic-scenario-analysis/](https://akbknight.github.io/economic-scenario-analysis/)
- **Repository:** `https://github.com/akbknight/economic-scenario-analysis` (Branch: `main`, Commit: `f224750`)
- **Baseline Evidence:** Palette inconsistencies across theme modes and missing technical documentation on the underlying econometric vector autoregression (VAR) equations.
- **Intervention:** Applied editorial tokens, harmonized light/dark theme palettes, and added an Econometric Model Architecture section detailing the 3-variable VAR simulation equations and impulse response mechanisms.
- **Acceptance Test:** Interactive scenario slider verification, theme toggle check, and console error audit.
- **Result:** Error-free browser execution, instant theme toggling, and explicit mathematical documentation.
- **Remaining Boundary:** 3-variable macroeconomic simulation (Inflation, GDP Growth, Fed Funds Rate); does not model dynamic stochastic general equilibrium (DSGE) or international exchange rate spillovers.

---

### 2.5 `supply-chain-planner`
- **Public URL:** [https://akbknight.github.io/supply-chain-planner/](https://akbknight.github.io/supply-chain-planner/)
- **Repository:** `https://github.com/akbknight/supply-chain-planner` (Branch: `main`, Commit: `1edd093`)
- **Baseline Evidence:** Lack of unified light/dark theme toggle, inconsistent typography, and cramped tabular figures.
- **Intervention:** Added universal light/dark theme toggle, editorial design tokens, and tabular monospace figure styling.
- **Acceptance Test:** Theme toggle audit and responsive desktop/mobile layout inspection.
- **Result:** Instant theme toggling, consistent contrast ratios, and clear inventory flow tables.
- **Remaining Boundary:** Deterministic heuristic multi-echelon inventory model; does not account for real-time maritime vessel rerouting or customs detention delays.

---

## 3. Retained & Reviewed Applications

### 3.1 `crisis-to-care`
- **Public URL:** [https://akbknight.github.io/crisis-to-care/](https://akbknight.github.io/crisis-to-care/)
- **Repository:** `https://github.com/akbknight/crisis-to-care` (Branch: `main`, Commit: `2e47b8e`)
- **Baseline Evidence:** Reported build failure due to broken `package-lock.json` dependency tree preventing production compilation.
- **Intervention:** Resolved package-lock dependencies, audited React/Vite build pipeline, and verified production compilation.
- **Acceptance Test:**
  ```bash
  npm run build
  ```
- **Result:** `vite build` completed cleanly in 6.13s with exit code 0 (`dist/index.html` built, 0 errors). Working tree clean and pushed to GitHub (`7d8224e..2e47b8e`).
- **Remaining Boundary:** Remote GitHub Actions deployment is currently blocked by a GitHub account-level billing lock on Actions runner minutes (`Account is locked due to a billing issue`); local production build compiles cleanly.

---

### 3.2 `Vitara`
- **Public URL:** [https://akbknight.github.io/vitara/](https://akbknight.github.io/vitara/)
- **Repository:** `https://github.com/akbknight/vitara` (Branch: `main`, Commit: `eb39ee7` in `Vitara App Repository`)
- **Baseline Evidence:** Identified in filesystem as nested under `Vitara App Repository` with unclear maintenance status.
- **Intervention:** Audited Git remote (`https://github.com/akbknight/vitara.git`), verified clean working tree on `main`, reviewed health coaching prototype design, and retained existing presentation without gratuitous rewrites.
- **Acceptance Test:** Git status check, static asset and HTML structure review.
- **Result:** Reviewed and retained; clean working tree on `main`.
- **Remaining Boundary:** Static product prototype with client-side Supabase integration; live wearable device synchronization (Apple HealthKit, Oura) remains a future roadmap phase.

---

## 4. Main Portfolio Platform (`akbknight.github.io`)
- **Public URL:** [https://akbknight.github.io/](https://akbknight.github.io/)
- **Repository:** `https://github.com/akbknight/akbknight.github.io` (Branch: `main`, Commit: `67c393e`; Deployment Branch: `gh-pages`, Commit: `00d8c7e`)
- **Baseline Evidence:** Previous iterations over-emphasized standalone experimental canvas components, contained a mislabeled dark screenshot captioned as "Light", included an unmeasured "zero memory leaks" assertion, and lacked the latest multi-instance scheduling and multi-origin retail findings.
- **Intervention:**
  - Restored Direction B editorial portfolio on `main` branch, isolating the authentic Hairline experiment safely on `feat/hairline-unslop-redesign` (commit `21f30f3`).
  - Synchronized project case studies with latest empirical findings: strict attendee clearance enforcement (0 defects), retail 4-horizon multi-origin suite (1.515% Avg MAPE), and IRS S3 XML lineage.
  - Removed unsupported performance assertions (e.g. "zero memory leaks").
  - Captured true light theme screenshot (`deployed_portfolio_desktop_light.png`).
  - Built production static export (`npm run build`) and deployed to `gh-pages` branch.
- **Acceptance Test:**
  ```bash
  npm run build
  gh run view 43552931040 --repo akbknight/akbknight.github.io
  ```
- **Result:** Next.js static build generated in 4.9s. GitHub Pages deployment `43552931040` completed successfully (green check). Live portfolio verified on `https://akbknight.github.io/`.
- **Remaining Boundary:** Static portfolio hosted on GitHub Pages; private career notes and resumes are strictly excluded and preserved locally.

---

## 5. Comprehensive Ecosystem Status Matrix

| Repository | Primary Technology | Baseline Limitation | Intervention Status | Test Status | Remote Commit | Deployment Status |
|:---|:---|:---|:---|:---|:---|:---|
| **`scheduling-optimizer`** | JavaScript / Heuristics | 61 attendee clearance violations on Seed 42 | Strict clearance rule + 5-seed suite | Verified (0 violations) | `1fc8ccb` | **Live & Deployed** (Pages) |
| **`us-retail-sales-forecast`** | Python / statsmodels | Single 12-mo fixed holdout only | 4-horizon multi-origin suite (2022–2026) | 44/44 pytest PASS | `3eccd34` | **Live & Deployed** (Pages) |
| **`irs990-grant-dashboard`** | Python / DuckDB / Three.js | S3 lineage & ML boundaries undocumented in UI | Added S3 provenance & defensible ML cards | Benchmark Verified | `50397ab` | **Live & Deployed** (Pages) |
| **`saltpepper-win`** | HTML5 / CSS / Vanilla JS | Generic centered hero, chained commands | Asymmetric dev workflow + separate commands | Verified (Copy tested) | `ce2e40c` | **Live & Deployed** (Pages) |
| **`data-pipeline-validator`** | Python / Dash | Cluttered calipers & neon scanlines | Editorial Quantitative Craft alignment | 28/28 pytest PASS | `1f25b89` | **Live & Deployed** (Pages) |
| **`anomaly-detection-monitor`** | Python / Dash | Neon cyberpunk accents & scanlines | Editorial tokens & tabular typography | 22/22 pytest PASS | `561e566` | **Live & Deployed** (Pages) |
| **`ai-strategic-briefing`** | Python / Stats / Web | Background GPU loop + failing Z-score test | Removed loop, fixed small-sample Z threshold | 43/43 pytest PASS | `196e763` | **Live & Deployed** (Pages) |
| **`economic-scenario-analysis`** | JavaScript / Math | Inconsistent palettes & missing VAR docs | Editorial alignment & VAR model docs | Verified (0 errors) | `f224750` | **Live & Deployed** (Pages) |
| **`supply-chain-planner`** | JavaScript / Heuristics | No light/dark toggle, cramped tables | Added theme toggle & tabular figures | Verified (Theme tested) | `1edd093` | **Live & Deployed** (Pages) |
| **`crisis-to-care`** | React / Vite | Broken `package-lock.json` build failure | Resolved lockfile dependencies | Build Clean (6.13s) | `2e47b8e` | Actions Billing Lock |
| **`Vitara`** | HTML5 / Supabase | Unaudited nested repository structure | Audited & verified clean tree on `main` | Structure Verified | `eb39ee7` | **Live & Retained** |
| **`akbknight.github.io`** | Next.js 16 / TypeScript | Divergent Hairline focus, unmeasured claims | Direction B editorial + verified case studies | Static Build PASS | `67c393e` | **Live & Deployed** (gh-pages) |
