# Ecosystem Limitations & Verification Register

**Prepared:** November 14, 2026  
**Author:** Akshay Kumar  
**Scope:** 12 Repositories across Portfolio & Published Applications  
**Deployment Authorization:** Completed Batches Verified & Pushed to GitHub Remotes  

---

## Executive Summary

This register provides a transparent, evidence-based ledger across all 12 repositories in the portfolio ecosystem. Interventions are explicitly categorized to distinguish **algorithmic and code resolutions**, **empirical data provenance**, **developer workflow restructuring**, and **documentation and visual alignment**.

For each repository, the register records:
1. **Intervention Category:** Algorithmic Resolution, Data Lineage & Provenance, Developer Workflow, or Documentation Alignment.
2. **Baseline Evidence:** The empirical, algorithmic, data, or interface limitation identified before intervention.
3. **Intervention:** The specific code, algorithmic, structural, or provenance change implemented.
4. **Acceptance Test:** The reproducible command, test suite, or audit protocol used.
5. **Result:** The exact quantitative metric, test pass count, or observable verification.
6. **Remaining Boundary:** The honest operational scope limit, unmodeled factor, or external constraint.

---

## 1. Algorithmic & Code Resolutions

### 1.1 `scheduling-optimizer`
- **Intervention Category:** Algorithmic Resolution
- **Public URL:** [https://akbknight.github.io/scheduling-optimizer/](https://akbknight.github.io/scheduling-optimizer/)
- **Repository:** `https://github.com/akbknight/scheduling-optimizer` (Branch: `master`, Commit: `c069e52`)
- **Baseline Evidence:** The original greedy heuristic only verified facility room clearance (`room.clearance < mtg.clearance`) and capacity, omitting attendee-level security clearance checks. On reference Seed 42, **61 of 107 scheduled meetings** (57.0%) contained attendees whose clearance fell below the meeting classification threshold. Furthermore, attendee clearance checks lacked validation for unknown attendee IDs, non-numeric values, or non-finite values (`NaN`, `Infinity`).
- **Intervention:**
  - Implemented `validateAttendee` and `isValidClearance` in `src/js/algorithm.js` and `index.html`. Strict mode explicitly rejects/quarantines unknown attendee IDs (absent from personnel map), missing/null clearances, non-numeric strings, and non-finite values (`NaN`, `Infinity`, `< 1`).
  - Added an interactive UI policy toggle (`Security: Strict Clearance` vs. `Security: Unconstrained`).
  - Decoupled measured clearance deficits (averaging 59.6 per instance, 61 on Seed 42) from the scheduled placement delta (averaging 42.6 fewer placements across seeds, and 41 on Seed 42), clarifying that the placement difference reflects downstream cascading heuristic room/slot contention rather than an exact deficit count.
  - Added 14 automated edge-case and multi-seed tests in `tests/test_clearance_validation.cjs`.
- **Acceptance Test:**
  ```bash
  node tests/test_clearance_validation.cjs
  node scripts/benchmark_scheduler.cjs
  ```
- **Result:**
  - **Edge-Case Suite:** **14/14 tests passed (100% PASS)**, verifying quarantine of unknown IDs, `NaN`, `null`, negative, and string clearances.
  - **Attendee Clearance Violations:** Dropped from 61 to **EXACTLY 0** on Seed 42, and averaged **0.0 across all 5 benchmark seeds** in strict mode.
  - **Multi-Instance Performance (5 Seeds):** Strict Priority-Greedy placed an average of **70.2 meetings** (39.0% fill rate) and served **220.4 priority points**, maintaining a **+5.8% priority point advantage** over Arrival-Order baseline (70.0 meetings, 208.4 points).
  - **Placement Trade-Off:** Clarified that while an average of 59.6 requests had clearance deficits, net scheduled placements decreased by 42.6 due to shifting room/slot contention dynamics.
- **Remaining Boundary:** Evaluated on synthetic consular scheduling distributions; does not model live last-minute cancellation cascades, physical transit time between detached facility wings, or emergency executive overrides.

---

### 1.2 `us-retail-sales-forecast`
- **Intervention Category:** Algorithmic Resolution
- **Public URL:** [https://akbknight.github.io/us-retail-sales-forecast/](https://akbknight.github.io/us-retail-sales-forecast/)
- **Repository:** `https://github.com/akbknight/us-retail-sales-forecast` (Branch: `main`, Commit: `0e6c94d`)
- **Baseline Evidence:** The forecasting scoreboard was evaluated on a single locked 12-month fixed-origin holdout (Sep 2025–Aug 2026). It lacked multi-origin evaluation across distinct economic regimes, used ambiguous "Rank 1 Across All Origins" phrasing, and omitted per-origin breakdown tables.
- **Intervention:**
  - Expanded `scripts/forecast_compare.py` to evaluate **four origins with a 12-month horizon** (Origin 1: Sep 2022–Aug 2023, Origin 2: Sep 2023–Aug 2024, Origin 3: Sep 2024–Aug 2025, Origin 4: Sep 2025–Aug 2026).
  - Replaced "Rank 1 Across All Origins" with "Lowest mean MAE across four origins".
  - Published full per-origin breakdown tables (MAE and MAPE across Origins 1–4) in `reports/baseline_benchmarks.md` and `index.html`.
  - Qualified the very narrow accuracy spread (< 0.024% MAPE between Nonseasonal Holt, Additive ETS, and Drift), removing unsupported claims of universal model dominance or absence of seasonal utility.
  - Preserved the strict distinction between retrospective multi-origin robustness analysis and the untouched locked final holdout window.
- **Acceptance Test:**
  ```bash
  pytest tests/
  py -3.14 scripts/forecast_compare.py
  ```
- **Result:**
  - **Unit Tests:** **44/44 pytest tests passed in 2.75s** (100% PASS), including strict per-cell HTML table checks.
  - **Four Origins with a 12-Month Horizon (2022–2026):**
    - **#1 Nonseasonal Holt:** **$9.078B Mean MAE, 1.515% Mean MAPE, $10.583B Mean RMSE** (Lowest mean MAE across four origins).
    - **#2 Additive Seasonal ETS:** $9.129B Mean MAE, 1.519% Mean MAPE, $10.629B Mean RMSE.
    - **#3 Simple Drift:** $9.224B Mean MAE, 1.539% Mean MAPE, $10.728B Mean RMSE.
    - **Spread:** Top three models differ by less than 0.024% MAPE ($0.146B MAE) across 48 evaluated months.
  - **Single Holdout (Sep 2025–Aug 2026):** Simple Drift (1.250% MAPE) and Nonseasonal Holt (1.256% MAPE) outperformed Additive Seasonal ETS (1.367% MAPE) and Seasonal Naive (3.739% MAPE).
  - **Production Model Verification:** Recomputed saved pipeline output at **$7.830B MAE, 1.2294% MAPE, and $9.928B RMSE**.
- **Remaining Boundary:** Univariate time-series smoothing on seasonally adjusted FRED `RSXFS` aggregate series. Does not incorporate exogenous macroeconomic indicators (interest rates, CPI, consumer confidence) or disaggregated retail subcategories.

---

### 1.3 `ai-strategic-briefing`
- **Intervention Category:** Algorithmic Resolution
- **Public URL:** [https://akbknight.github.io/ai-strategic-briefing/](https://akbknight.github.io/ai-strategic-briefing/)
- **Repository:** `https://github.com/akbknight/ai-strategic-briefing` (Branch: `master`, Commit: `196e763`)
- **Baseline Evidence:** Continuous Three.js background canvas animation loop consuming excessive GPU/CPU resources on idle tabs, alongside a failing unit test in `test_outlier_detected_by_zscore` where a 2.5 sigma threshold failed to flag a clear outlier in small sample sizes ($n=6$, where the theoretical maximum sample z-score is $\le 2.041$).
- **Intervention:**
  - Removed the Three.js background canvas loop, eliminating idle CPU/GPU consumption.
  - Adjusted the profiler's Z-score outlier threshold from 2.5 to 2.0 sigma in `src/data/profiler.py` for small-sample robustness.
  - Harmonized typography and summary cards to editorial tokens.
- **Acceptance Test:**
  ```bash
  pytest tests/
  ```
- **Result:** **43/43 pytest unit tests passed in 3.12s** (100% PASS, 0 failures). Idle GPU utilization eliminated.
- **Remaining Boundary:** Executive briefing generator operates on pre-computed or mock LLM response payloads rather than live streaming APIs.

---

### 1.4 `crisis-to-care`
- **Intervention Category:** Algorithmic & Build Resolution
- **Public URL:** [https://akbknight.github.io/crisis-to-care/](https://akbknight.github.io/crisis-to-care/)
- **Repository:** `https://github.com/akbknight/crisis-to-care` (Branch: `main`, Commit: `2e47b8e`)
- **Baseline Evidence:** Reported build failure due to broken `package-lock.json` dependency tree preventing production compilation.
- **Intervention:** Resolved package-lock dependencies, audited React/Vite build pipeline, and verified production compilation locally.
- **Acceptance Test:**
  ```bash
  npm run build
  ```
- **Result:** `vite build` completed cleanly in 6.13s with exit code 0 (`dist/index.html` built, 0 errors). Working tree clean and pushed to GitHub (`7d8224e..2e47b8e`).
- **Remaining Boundary:** Remote GitHub Actions deployment is currently **Deployment-Blocked** due to a GitHub account-level billing lock on Actions runner minutes (`Account is locked due to a billing issue`); local production build compiles cleanly. In accordance with constraints, no billing modifications or financial expenditures were initiated.

---

## 2. Empirical Data Lineage & Provenance

### 2.1 `irs990-grant-dashboard`
- **Intervention Category:** Data Lineage & Provenance
- **Public URL:** [https://akbknight.github.io/irs990-grant-dashboard/](https://akbknight.github.io/irs990-grant-dashboard/)
- **Repository:** `https://github.com/akbknight/irs990-grant-dashboard` (Branch: `main`, Commit: `b745f18`)
- **Baseline Evidence:** S3 data lineage, parser commands, cryptographic hashes, and exact file metrics were absent from the interface. Duplicate rows were previously termed "recurring milestone tranches" without primary schedule verification. ML predictive limits were phrased as "statistically prohibits" rather than a bounded empirical recommendation based on residual test error.
- **Intervention:**
  - Documented complete cryptographic provenance for `data/FoundationData19.21.csv`:
    - **SHA-256 Checksum:** `de37e5a1004a97527695e72c54db822306ac66b3590300775167e1c54c6c5a68`
    - **File Byte Size:** 10,310,923 bytes (~10.3 MB)
    - **Row Reconciliation:** 93,676 lines total (Header + 93,672 raw records: 2019: 49,570 · 2020: 23,588 · 2021: 20,514). Excluded 29 negative adjustments and 5 zero-dollar rows = 93,638 positive records (`AWARD > 0`). Reconciles to Train 2019 (49,547) + Val 2020 (23,583) + Test 2021 (20,508).
    - **Upstream Source Object:** AWS Open Data Registry S3 Bucket `s3://irs-form-990/` (us-east-1; MeF XML returns, Schedule I `<GrantOrContributionPdDurYr>`, Form 990-PF Part XV `<GrantOrContributionPdDuringYr>`).
    - **Extraction Command:** `python master_pipeline.py` streaming XML DOM parsing with ZCTA spatial lookup.
  - Described 2,435 exact duplicate rows (~2.6%) as **preserved pending verification** against primary schedules (since Schedule I XML lacks unique transaction IDs), not assumed recurring tranches.
  - Explicitly marked all external reference links without cryptographic verification as `(external link pending verification)`.
  - Replaced "statistically prohibits predictive budgeting" with a bounded recommendation:
    *"Predictive budgeting is not recommended on these tested features and data due to high out-of-sample error ($86,013 MAE against a $10,000 median award) and a 31.7% cold-start foundation rate. The platform is therefore explicitly engineered for descriptive historical analysis, institutional concentration mapping, and geographic discovery."*
  - Synchronized reports via `py -3.12 scripts/evaluate_models.py` and updated `index.html` Cards 05 & 06.
- **Acceptance Test:**
  ```bash
  Get-FileHash data/FoundationData19.21.csv -Algorithm SHA256
  py -3.12 scripts/evaluate_models.py
  ```
- **Result:** File hash verified; audit report synchronized; platform defensibly positioned for descriptive exploration rather than automated budgeting.
- **Remaining Boundary:** Modeled partition covers 93,672 raw / 93,638 positive records (2019–2021). Features exclude narrative proposal text, multi-year asset histories, and recipient balance sheets. The scatter trendline is an institutional scaling baseline ($\beta \approx 0.83, R^2 \approx 0.28$) and does not calculate studentized residuals for formal outlier classification.

---

## 3. Developer Workflow Restructuring

### 3.1 `saltpepper-win`
- **Intervention Category:** Developer Workflow Restructuring
- **Public URL:** [https://akbknight.github.io/saltpepper-win/](https://akbknight.github.io/saltpepper-win/)
- **Repository:** `https://github.com/akbknight/saltpepper-win` (Branch: `main`, Commit: `ce2e40c`)
- **Baseline Evidence:** Centered generic slogan-and-metrics hero, uppercase promotional badges, illustrative routing described ambiguously as "real prompt classification", chained semicolon PowerShell setup commands that could fail silently, and undifferentiated pricing claims.
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

## 4. Documentation & Visual System Alignment

### 4.1 `data-pipeline-validator`
- **Intervention Category:** Documentation & Visual Alignment
- **Public URL:** [https://akbknight.github.io/data-pipeline-validator/](https://akbknight.github.io/data-pipeline-validator/)
- **Repository:** `https://github.com/akbknight/data-pipeline-validator` (Branch: `master`, Commit: `1f25b89`)
- **Baseline Evidence:** Decorative calipers, pseudo-sci-fi scanlines, and arbitrary color accents that cluttered validation telemetry and obscured data quality checks.
- **Intervention:** Aligned visual tokens to the Editorial Quantitative Craft design system, removed decorative calipers and scanline overlays, and applied clean tabular typography for validation check tables.
- **Acceptance Test:** `pytest tests/`
- **Result:** **28/28 pytest unit tests passed in 1.33s** (100% PASS). Clean visual hierarchy with neutral surfaces and semantic status indicators.
- **Remaining Boundary:** In-memory schema, null-rate, and distribution validation on static batch files; does not connect to distributed Kafka/Spark streaming clusters.

---

### 4.2 `anomaly-detection-monitor`
- **Intervention Category:** Documentation & Visual Alignment
- **Public URL:** [https://akbknight.github.io/anomaly-detection-monitor/](https://akbknight.github.io/anomaly-detection-monitor/)
- **Repository:** `https://github.com/akbknight/anomaly-detection-monitor` (Branch: `master`, Commit: `561e566`)
- **Baseline Evidence:** Neon cyberpunk accents, dark scanlines, and non-standard number formatting across anomaly scorecards.
- **Intervention:** Refactored palette to Editorial Quantitative Craft standards, aligned tabular numbers, and improved anomaly detection telemetry charts.
- **Acceptance Test:** `pytest tests/`
- **Result:** **22/22 pytest unit tests passed in 1.85s** (100% PASS).
- **Remaining Boundary:** Time-series anomaly detection algorithms (Z-score, IQR, Rolling MAD) evaluated on simulated telemetry series; does not ingest live Prometheus or Datadog alert feeds.

---

### 4.3 `economic-scenario-analysis`
- **Intervention Category:** Documentation & Visual Alignment
- **Public URL:** [https://akbknight.github.io/economic-scenario-analysis/](https://akbknight.github.io/economic-scenario-analysis/)
- **Repository:** `https://github.com/akbknight/economic-scenario-analysis` (Branch: `main`, Commit: `f224750`)
- **Baseline Evidence:** Palette inconsistencies across theme modes and missing technical documentation on the underlying econometric vector autoregression (VAR) equations.
- **Intervention:** Applied editorial tokens, harmonized light/dark theme palettes, and added an Econometric Model Architecture section detailing the 3-variable VAR simulation equations and impulse response mechanisms.
- **Acceptance Test:** Interactive scenario slider verification, theme toggle check, and console error audit.
- **Result:** Error-free browser execution, instant theme toggling, and explicit mathematical documentation.
- **Remaining Boundary:** 3-variable macroeconomic simulation (Inflation, GDP Growth, Fed Funds Rate); does not model dynamic stochastic general equilibrium (DSGE) or international exchange rate spillovers.

---

### 4.4 `supply-chain-planner`
- **Intervention Category:** Documentation & Visual Alignment
- **Public URL:** [https://akbknight.github.io/supply-chain-planner/](https://akbknight.github.io/supply-chain-planner/)
- **Repository:** `https://github.com/akbknight/supply-chain-planner` (Branch: `main`, Commit: `1edd093`)
- **Baseline Evidence:** Lack of unified light/dark theme toggle, inconsistent typography, and cramped tabular figures.
- **Intervention:** Added universal light/dark theme toggle, editorial design tokens, and tabular monospace figure styling.
- **Acceptance Test:** Theme toggle audit and responsive desktop/mobile layout inspection.
- **Result:** Instant theme toggling, consistent contrast ratios, and clear inventory flow tables.
- **Remaining Boundary:** Deterministic heuristic multi-echelon inventory model; does not account for real-time maritime vessel rerouting or customs detention delays.

---

### 4.5 `Vitara`
- **Intervention Category:** Documentation & Review
- **Public URL:** [https://akbknight.github.io/vitara/](https://akbknight.github.io/vitara/)
- **Repository:** `https://github.com/akbknight/vitara` (Branch: `main`, Commit: `eb39ee7`)
- **Baseline Evidence:** Nested under `Vitara App Repository` with unverified Git remote alignment.
- **Intervention:** Audited Git remote, verified clean working tree on `main`, reviewed health coaching prototype design, and retained existing presentation without gratuitous rewrites.
- **Acceptance Test:** Git status check, static asset and HTML structure review.
- **Result:** Reviewed and retained; clean working tree on `main`.
- **Remaining Boundary:** Static product prototype with client-side Supabase integration; live wearable device synchronization (Apple HealthKit, Oura) remains a future roadmap phase.

---

### 4.6 `akbknight.github.io` (Main Portfolio Platform)
- **Intervention Category:** Platform Synchronization
- **Public URL:** [https://akbknight.github.io/](https://akbknight.github.io/)
- **Repository:** `https://github.com/akbknight/akbknight.github.io` (Branch: `main`; Deployment Branch: `gh-pages`)
- **Baseline Evidence:** Previous iterations over-emphasized standalone experimental canvas components, contained a mislabeled dark screenshot captioned as "Light", included an unmeasured "zero memory leaks" assertion, and lacked the latest multi-instance scheduling and multi-origin retail findings.
- **Intervention:**
  - Restored Direction B editorial portfolio on `main` branch, isolating the authentic Hairline experiment safely on `feat/hairline-unslop-redesign` (commit `21f30f3`).
  - Synchronized project case studies with latest empirical findings: strict attendee validation (0 defects across 5 seeds, decoupling 59.6 deficits from 42.6 placement delta), retail 4-origin 12-month horizon suite (1.515% Mean MAPE, narrow < 0.024% spread, retrospective robustness distinction), and IRS S3 XML lineage (SHA-256 hash `de37...`, duplicate rows preserved pending verification, bounded predictive budgeting recommendation).
  - Removed unsupported performance assertions (e.g. "zero memory leaks").
  - Captured true light theme screenshot (`deployed_portfolio_desktop_light.png`).
  - Built production static export (`npm run build`) and deployed to `gh-pages` branch.
- **Acceptance Test:**
  ```bash
  npm run build
  ```
- **Result:** Next.js static build generated cleanly. Live portfolio verified on `https://akbknight.github.io/`.
- **Remaining Boundary:** Static portfolio hosted on GitHub Pages; private career notes and resumes are strictly excluded and preserved locally.

---

## 5. Comprehensive Ecosystem Status Matrix

| Repository | Primary Technology | Intervention Category | Baseline Limitation | Intervention Status | Test Status | Deployed Commit | Deployment Status |
|:---|:---|:---|:---|:---|:---|:---|:---|
| **`scheduling-optimizer`** | JavaScript / Heuristics | **Algorithmic Resolution** | 61 attendee clearance violations on Seed 42 | Strict attendee validation (rejects unknown IDs, non-finite values) + 14 edge tests + 5-seed suite | 14/14 tests PASS (0 defects) | `c069e52` | **Live & Deployed** (Pages) |
| **`us-retail-sales-forecast`** | Python / statsmodels | **Algorithmic Resolution** | Single 12-mo fixed holdout only | 4-origin 12-month horizon suite + per-origin breakdown + narrow spread qualification | 44/44 pytest PASS | `0e6c94d` | **Live & Deployed** (Pages) |
| **`irs990-grant-dashboard`** | Python / DuckDB / Three.js | **Data Lineage & Provenance** | S3 lineage, hashes, & ML boundaries undocumented | Documented SHA-256 hash, file size, extraction commands, duplicates preserved pending verification, bounded recommendation | 7 ML models evaluated | `b745f18` | **Live & Deployed** (Pages) |
| **`saltpepper-win`** | HTML5 / CSS / Vanilla JS | **Developer Workflow** | Generic centered hero, chained commands | Asymmetric dev layout, copyable PowerShell commands, terminal widened, price clarity | Verified (Copy tested) | `ce2e40c` | **Live & Deployed** (Pages) |
| **`ai-strategic-briefing`** | Python / Stats / Web | **Algorithmic Resolution** | Background GPU loop + failing Z-score test | Removed loop, fixed small-sample Z threshold | 43/43 pytest PASS | `196e763` | **Live & Deployed** (Pages) |
| **`crisis-to-care`** | React / Vite | **Algorithmic & Build** | Broken `package-lock.json` build failure | Resolved lockfile dependencies, verified build | Build Clean (6.13s) | `2e47b8e` | **Deployment-Blocked** (Actions Billing Lock) |
| **`data-pipeline-validator`** | Python / Dash | **Documentation & Visual** | Cluttered calipers & neon scanlines | Editorial Quantitative Craft alignment | 28/28 pytest PASS | `1f25b89` | **Live & Deployed** (Pages) |
| **`anomaly-detection-monitor`** | Python / Dash | **Documentation & Visual** | Neon cyberpunk accents & scanlines | Editorial tokens & tabular typography | 22/22 pytest PASS | `561e566` | **Live & Deployed** (Pages) |
| **`economic-scenario-analysis`** | JavaScript / Math | **Documentation & Visual** | Inconsistent palettes & missing VAR docs | Editorial alignment & VAR model docs | Verified (0 errors) | `f224750` | **Live & Deployed** (Pages) |
| **`supply-chain-planner`** | JavaScript / Heuristics | **Documentation & Visual** | No light/dark toggle, cramped tables | Added theme toggle & tabular figures | Verified (Theme tested) | `1edd093` | **Live & Deployed** (Pages) |
| **`Vitara`** | HTML5 / Supabase | **Documentation & Review** | Unaudited nested repository structure | Audited & verified clean tree on `main` | Structure Verified | `eb39ee7` | **Live & Retained** |
| **`akbknight.github.io`** | Next.js 16 / TypeScript | **Platform Synchronization** | Divergent Hairline focus, unmeasured claims | Direction B editorial + verified empirical findings | Static Build PASS | Current `main` / `gh-pages` | **Live & Deployed** (gh-pages) |
