# Ecosystem Limitations & Verification Register

**Prepared:** November 15, 2026  
**Author:** Akshay Kumar  
**Scope:** 12 Repositories across Portfolio & Published Applications  
**Deployment Authorization:** Completed Batches Verified & Pushed to GitHub Remotes  

---

## Executive Summary & Methodological Stance

This register provides a transparent, evidence-based ledger across all 12 repositories in the portfolio ecosystem.

> [!IMPORTANT]
> **Methodological Boundary Statement:** Visual cleanup, documentation enhancements, palette normalization, and clean git working trees do **NOT** establish that underlying analytical limitations are resolved. While user interface presentation, accessibility, and documentation have been standardized across projects, the core analytical, econometric, and algorithmic boundaries of each system are explicitly documented below.

For each repository, the register records:
1. **Intervention Category:** Algorithmic & Econometric Resolution, Data Lineage & Provenance, Developer Workflow, or Unresolved Analytical Boundaries.
2. **Baseline Evidence:** The empirical, algorithmic, data, or interface limitation identified before intervention.
3. **Intervention:** The specific code, algorithmic, structural, or provenance change implemented.
4. **Acceptance Test:** The reproducible command, test suite, or audit protocol used.
5. **Result:** The exact quantitative metric, test pass count, or observable verification.
6. **Remaining Analytical Boundary:** The honest operational scope limit, unmodeled factor, or unresolved analytical constraint.

---

## 1. Algorithmic & Econometric Resolutions

### 1.1 `scheduling-optimizer`
- **Intervention Category:** Algorithmic Resolution, Shared Architecture & Real Browser Smoke Verification
- **Public URL:** [https://akbknight.github.io/scheduling-optimizer/](https://akbknight.github.io/scheduling-optimizer/)
- **Repository:** `https://github.com/akbknight/scheduling-optimizer` (Branch: `master`, Commit: `d20fd43`)
- **Baseline Evidence:** The original greedy heuristic only verified facility room clearance (`room.clearance < mtg.clearance`) and capacity, omitting attendee-level security clearance checks. On reference Seed 42, **61 of 107 scheduled meetings** (57.0%) contained attendees whose clearance fell below the meeting classification threshold. Furthermore, attendee clearance checks lacked validation for unknown attendee IDs, non-numeric values, or non-finite values (`NaN`, `Infinity`). Finally, scheduler logic was duplicated between the browser `index.html` and Node test files.
- **Intervention:**
  - **Single Shared Implementation:** Refactored `index.html` to load `src/js/config.js` and `src/js/algorithm.js` directly, eliminating code duplication so that both the browser runtime and Node.js test harnesses execute the exact same shared functions (`runScheduler`, `validateAttendee`, `isValidClearance`, `generateData`).
  - **Strict Attendee Validation:** Implemented `validateAttendee` and `isValidClearance` to reject and quarantine unknown attendee IDs (absent from the personnel directory), missing/null clearances, non-numeric strings, and non-finite values (`NaN`, `Infinity`, `< 1`).
  - **Node.js Browser Parity Suite (`tests/test_browser_parity.cjs`):** Runs in **Node.js** and inspects `index.html` to verify `<script src="src/js/config.js"></script>` and `<script src="src/js/algorithm.js"></script>` references, executing identical logical test fixtures against module exports.
  - **Actual Headless Chrome Browser Smoke Test (`tests/test_browser_smoke.cjs`):** Uses `puppeteer-core` driving an installed Google Chrome binary (`chrome.exe`) in headless mode. Loads `file:///.../index.html`, runs actual browser event loops, executes scripts inside the V8 browser context, confirms automated scheduling on load, verifies strict in-browser rejection of invalid attendee fixtures, audits DOM node rendering (5 KPI cards, 20 Gantt rows, 66 blocks, 40 table rows, Chart.js canvas context), and tests the interactive policy toggle with 0 console or page errors.
  - **Edge-Case Suite:** Added 14 edge-case tests in `tests/test_clearance_validation.cjs`.
  - **Decoupled Placement Delta from Deficits:** Clarified that the measured clearance deficits (averaging 59.6 per instance, 61 on Seed 42) represent individual attendee security gaps, whereas the 42.6 reduction in scheduled placements (from 112.8 down to 70.2) represents cascading heuristic room/slot contention when deficit requests are queued.
- **Acceptance Test:**
  ```bash
  npm test              # node tests/test_clearance_validation.cjs && node tests/test_browser_parity.cjs
  npm run test:browser  # node tests/test_browser_smoke.cjs (Headless Google Chrome)
  node scripts/benchmark_scheduler.cjs
  ```
- **Result:**
  - **Node Parity Suite:** **8/8 checks passed (100% PASS)**, confirming single shared module execution without inline code duplication.
  - **Edge-Case Suite:** **14/14 tests passed (100% PASS)**, verifying quarantine of unknown IDs, `NaN`, `null`, negative, and string clearances.
  - **Headless Chrome Browser Smoke Test:** **100% PASS (0 page errors, 0 console errors)**; shared scripts loaded, initial browser schedule executed (66/180 placed, 0 defects), DOM nodes rendered, interactive policy toggle verified.
  - **Attendee Clearance Violations:** Dropped from 61 to **EXACTLY 0** on Seed 42, and averaged **0.0 across all 5 benchmark seeds** in strict mode.
  - **Multi-Instance Performance (5 Seeds):** Strict Priority-Greedy placed an average of **70.2 meetings** (39.0% fill rate) and served **220.4 priority points**, maintaining a **+5.8% priority point advantage** over Arrival-Order baseline (70.0 meetings, 208.4 points).
- **Remaining Analytical Boundary:** The scheduler operates as a priority-weighted greedy heuristic on synthetic consular scheduling distributions. It does not perform dynamic backtracking for global optimality in over-subscribed schedules, nor does it model real-time flight delay cascades, physical walking transit time between disconnected embassy wings, or emergency executive meeting preemption.

---

### 1.2 `us-retail-sales-forecast`
- **Intervention Category:** Econometric Evaluation & Holdout Precision
- **Public URL:** [https://akbknight.github.io/us-retail-sales-forecast/](https://akbknight.github.io/us-retail-sales-forecast/)
- **Repository:** `https://github.com/akbknight/us-retail-sales-forecast` (Branch: `main`, Commit: `7a00a83`)
- **Baseline Evidence:** The forecasting scoreboard was previously evaluated on a single locked 12-month fixed-origin holdout (Sep 2025–Aug 2026). It lacked multi-origin evaluation across distinct economic regimes, used ambiguous "Rank 1 Across All Origins" phrasing, understated the top-three MAPE spread as "< 0.024%", and described the repeatedly inspected final holdout window as "untouched evidence".
- **Intervention:**
  - **Retrospective Multi-Origin Suite:** Expanded `scripts/forecast_compare.py` to evaluate **four origins with a 12-month horizon** (Origin 1: Sep 2022–Aug 2023, Origin 2: Sep 2023–Aug 2024, Origin 3: Sep 2024–Aug 2025, Origin 4: Sep 2025–Aug 2026).
  - **Holdout Terminology Precision:** Relabeled the September 2025 – August 2026 window as the **original historical holdout**, explicitly noting that having been repeatedly inspected during model development and validation, it cannot serve as untouched out-of-sample evidence for subsequent model revisions. Future changes require evaluation on genuinely new data releases.
  - **Accurate Spread Calculation:** Corrected the top-three average MAPE spread to **approximately 0.0245 percentage points** (1.5393% Drift vs 1.5148% Holt = 0.02449 pp, or $0.146B MAE) across the 48 evaluated months.
  - **Selection Procedure Clarification:** Clarified that Nonseasonal Holt was selected based on pre-holdout validation error ($7.318B MAE, 1.21% MAPE); on the subsequent original historical holdout test window, Simple Drift performed slightly better ($7.974B MAE / 1.250% MAPE).
  - **Strict Per-Cell Test:** Implemented automated per-cell HTML table consistency tests in `tests/test_benchmark_cells.py`.
- **Acceptance Test:**
  ```bash
  pytest tests/
  py -3.14 scripts/forecast_compare.py
  ```
- **Result:**
  - **Unit Tests:** **44/44 pytest tests passed in 4.50s** (100% PASS), including strict per-cell HTML table checks.
  - **Retrospective 4-Origin Suite (2022–2026):**
    - **#1 Nonseasonal Holt:** **$9.078B Mean MAE, 1.515% Mean MAPE, $10.583B Mean RMSE** (Lowest mean MAE across four origins).
    - **#2 Additive Seasonal ETS:** $9.129B Mean MAE, 1.519% Mean MAPE, $10.629B Mean RMSE.
    - **#3 Simple Drift:** $9.224B Mean MAE, 1.539% Mean MAPE, $10.728B Mean RMSE.
    - **Spread:** Top three models differ by approximately 0.0245 percentage points ($0.146B MAE) across 48 evaluated months.
  - **Original Historical Holdout (Sep 2025–Aug 2026):** Simple Drift (1.250% MAPE) and Nonseasonal Holt (1.256% MAPE) outperformed Additive Seasonal ETS (1.367% MAPE) and Seasonal Naive (3.739% MAPE).
  - **Production Model Verification:** Recomputed saved pipeline output at **$7.830B MAE, 1.2294% MAPE, and $9.928B RMSE**.
- **Remaining Analytical Boundary:** Univariate exponential smoothing on the seasonally adjusted FRED `RSXFS` aggregate series. The models do not condition on exogenous macroeconomic covariates (federal funds rate, CPI inflation, consumer sentiment) or disaggregated retail NAICS categories. The very narrow 0.0245 pp spread does not establish universal superiority of nonseasonal methods across other economic series.

---

### 1.3 `economic-scenario-analysis`
- **Intervention Category:** Econometric Resolution, Statistical Estimation & Uncertainty Bounds
- **Public URL:** [https://akbknight.github.io/economic-scenario-analysis/](https://akbknight.github.io/economic-scenario-analysis/)
- **Repository:** `https://github.com/akbknight/economic-scenario-analysis` (Branch: `main`, Commit: `5418601`)
- **Baseline Evidence:** The projection model previously relied entirely on stylized, rounded textbook heuristics (0.15 unemployment slope, 0.70 CPI persistence, -0.08 rate drag, 0.60 retail sensitivity). It produced only deterministic single-point numbers with zero statistical error bounds, lacked standard errors, t-statistics, or p-values, and exhibited an anomalous 62% recession probability under the Soft Landing preset due to an arbitrary inverted-sign anchor. Model code was duplicated inline in `index.html`.
- **Intervention:**
  - **Single Shared Module Architecture:** Extracted core logic into `src/js/config.js` and `src/js/model.js`, loaded cleanly by both `index.html` and headless test runners without code duplication.
  - **Reproducible Estimation Pipeline & Fit Artifacts:** Created `scripts/estimate_econometric_parameters.py` and exported `reports/econometric_estimation_artifacts.json`:
    - *Contemporaneous Retail OLS:* Fitted on the 16 landmark observations ($\text{Retail YoY} \sim \text{UNRATE}$): Intercept $\hat{\beta}_0 = 9.9077$ ($\text{SE} = 3.8799, t = 2.554, p = 0.023$), Slope $\hat{\beta}_u = -1.1000$ ($\text{SE} = 0.6800, t = -1.618, p = 0.128$), $R^2 = 0.1575, s_e = 5.1609\%$. Described directly as the retail sales growth vs. unemployment relationship; explicitly documented as a contemporaneous historical association, NOT an identified causal policy effect or validated 12-month predictive forecast.
    - *Labor Market Policy Transmission:* Explicitly classified as an **Illustrative Policy Assumption / Calibrated Sensitivity Rule** (+0.15pp unemployment per 100bps rate deviation above 2.5%). Unsupported regression claims ($t=2.141, p=0.043, R^2=0.170$) removed because non-consecutive landmark years contain multi-year gaps (up to 5 years) that prevent dynamic lag OLS estimation.
    - *CPI AR-X Structure:* Explicitly classified as an **Illustrative Sensitivity Heuristic / Calibrated Persistence & Drag** (0.648 persistence, -0.076 rate drag). Unsupported regression claims ($p<0.001, t=4.56$) removed because multi-year gaps violate lag-1 AR specifications.
    - *Sample-Fitted Logistic MLE (Recession Scoring):* Codified exact Iteratively Reweighted Least Squares (Newton-Raphson) and established exact finite MLE convergence matching SciPy trust-exact to 8 decimal places: Intercept $\hat{\beta}_0 = -5.1379$ ($\text{SE} = 3.5595$), Rate $\hat{\beta}_r = 0.1257$ ($\text{SE} = 0.4334$), Unemployment $\hat{\beta}_u = 0.6524$ ($\text{SE} = 0.4639$), $\text{LL} = -7.2199$, gradient norm $< 10^{-10}$, McFadden's Pseudo $R^2 = 0.1976$. Fisher information eigenvalues are strictly positive ($[0.0770, 14.6208, 98.0733]$), confirming strict convexity and disproving that separation prevents finite MLE on this sample. Retained the 5 substantive limitations: small sample size ($N=16$, 4 recession events), large parameter standard errors ($p=0.772, p=0.160$), non-random landmark selection, retrospective NBER target definition, and lack of prospective out-of-sample temporal validation (classified as a sample-fitted sensitivity scoring specification, not an independently validated forecasting model).
  - **Gap Structure Documentation:** Explicitly documented that the 16 historical years (2000–2024) are landmark benchmark snapshots, not a continuous annual time series. Identified 4 multi-year gaps (2001→2003: 2 yrs; 2003→2006: 3 yrs; 2010→2015: 5 yrs; 2015→2018: 3 yrs) with exactly 11 consecutive 1-year pairs, confirming that non-consecutive gaps cannot be treated as uniform annual lags ($t \to t+1$).
  - **Uncertainty Interval Distinctions:** Formally distinguished Parameter Uncertainty $\text{SE}(\hat{\beta})$, Conditional-Mean Confidence Intervals ($\hat{\mu}_{y|x} \pm t \cdot \text{SE}(\hat{\mu})$), and Forecast Prediction Intervals ($\hat{y} \pm t \cdot \sqrt{\text{SE}(\hat{\mu})^2 + s_e^2}$). Labeled UI bands as conditional-mean confidence intervals.
  - **Dual-Engine Model Toggle in UI:** Added interactive toggle button group: `[Calibrated Baseline (Policy Rules)]` / `[Illustrative Empirical (CI Prototype)]`.
  - **Independent Recomputation Verification:** Added `tests/test_econometric_estimation.py` performing independent recalculation of OLS parameters, gap counts, interval spreads, SciPy trust-exact parity checks, and component classifications directly from raw data against saved artifacts.
- **Acceptance Test:**
  ```bash
  npm test              # node tests/test_model_parity.cjs && py tests/test_econometric_estimation.py
  npm run test:browser  # node tests/test_browser_smoke.cjs (Headless Google Chrome)
  ```
- **Result:**
  - **Model Parity Suite:** **6/6 checks passed (100% PASS)**.
  - **Independent Econometric Suite:** **7/7 tests passed (100% PASS)**, verifying independent Contemporaneous Retail OLS recomputation, gap identification (11 consecutive pairs, 4 gaps), interval distinctions, NBER class distribution (4 recession vs 12 expansion), boundary clamping, SciPy trust-exact parity cross-check, and component classifications.
  - **Headless Chrome Browser Smoke Test:** **100% PASS (0 page errors, 0 console errors)**.
  - **Soft Landing Calibration:** Stress index properly computes **13%** (vs. 62% in stylized baseline).
  - **Conditional-Mean Uncertainty:** Demonstrates parameter variance propagation matching saved artifacts exactly (e.g. at default sliders: Unemployment $4.40\% \pm 0.37\%$, CPI $2.72\% \pm 2.25\%$, Retail $5.07\% \pm 2.84\%$, CI: $[2.22\%, 7.91\%]$).
- **Remaining Analytical Boundary:** The empirical prototype propagates single-equation reduced-form OLS parameter variance on landmark historical snapshots. It is a pedagogical decision tool, not a validated predictive forecasting model. Full out-of-sample dynamic forecasting requires continuous monthly or annual series and structural VAR identification.

---

### 1.4 `ai-strategic-briefing`
- **Intervention Category:** Algorithmic Resolution
- **Public URL:** [https://akbknight.github.io/ai-strategic-briefing/](https://akbknight.github.io/ai-strategic-briefing/)
- **Repository:** `https://github.com/akbknight/ai-strategic-briefing` (Branch: `master`, Commit: `196e763`)
- **Baseline Evidence:** Continuous Three.js background canvas animation loop consuming excessive GPU/CPU resources on idle tabs, alongside a failing unit test in `test_outlier_detected_by_zscore` where a 2.5 sigma threshold failed to flag a clear outlier in small sample sizes ($n=6$, where theoretical sample z-score is $\le 2.041$).
- **Intervention:**
  - Removed the Three.js background canvas loop, eliminating idle CPU/GPU consumption.
  - Adjusted the profiler's Z-score outlier threshold from 2.5 to 2.0 sigma in `src/data/profiler.py` for small-sample robustness.
  - Harmonized typography and summary cards to editorial tokens.
- **Acceptance Test:**
  ```bash
  pytest tests/
  ```
- **Result:** **43/43 pytest unit tests passed in 3.12s** (100% PASS, 0 failures). Idle GPU utilization eliminated.
- **Remaining Analytical Boundary:** Executive briefing generator operates on pre-computed or mock LLM response payloads. It lacks dynamic prompt streaming, multi-turn context retention, and automated factual hallucination detection against primary filings.

---

### 1.5 `crisis-to-care`
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
- **Remaining Boundary & Blocker:** Remote GitHub Actions deployment is currently **Deployment-Blocked** due to a GitHub account-level billing lock on Actions runner minutes (`Account is locked due to a billing issue`); local production build compiles cleanly. In accordance with strict constraints, no billing modifications or financial expenditures were initiated. The triage recommendation logic remains a client-side decision heuristic without medical-grade certification or electronic health record (EHR) integration.

---

### 1.6 `data-pipeline-validator`: Distribution Drift Screening & Gate Isolation [RESOLVED]
- **Intervention Category:** Algorithmic & Statistical Resolution, Drift Monitoring, Gate Isolation & Explicit Insufficient Data Handling
- **Public URL:** [https://akbknight.github.io/data-pipeline-validator/](https://akbknight.github.io/data-pipeline-validator/)
- **Repository:** `https://github.com/akbknight/data-pipeline-validator` (Branch: `master`, Commit: `f3ebf8a`)
- **Baseline Evidence:** The validator previously operated strictly on static, in-memory tabular batches (null counts, data type checks, categorical allowable value membership, range bounds). It was completely blind to statistical distribution drift: an incoming batch could have 100% compliant non-null rows, valid status codes, and valid range bounds, while its underlying distribution shifted massively, passing all static checks and poisoning downstream models and ledgers.
- **Intervention & Evidence Repairs:**
  - **Dual-Engine Quality Architecture:** Implemented statistical distribution drift screening module (`src/checks/drift.py`) operating alongside the 7 static invariant checks.
  - **Strengthened Fallback & SciPy Parity:**
    - Corrected fallback eCDF calculation when `_HAS_SCIPY=False` ($D=0.0 \implies p=1.0, \text{drift}=\text{False}$).
    - Implemented dual-branch Kolmogorov distribution survival function: small-$z$ Jacobi theta expansion for $z < 0.3$, Smirnov series for $z \ge 0.3$.
    - Documented and tested approximation tolerances against SciPy ground truth: $|D_{\text{fb}} - D_{\text{scipy}}| \le 0.005$ and $|p_{\text{fb}} - p_{\text{scipy}}| \le 0.02$.
    - Added dedicated threshold-boundary tests near $\alpha = 0.01$ ($D=0.23, n=100 \implies p_{\text{scipy}}=0.009878, p_{\text{fb}}=0.008216$, both reject; $D=0.22, n=100 \implies p_{\text{scipy}}=0.015577, p_{\text{fb}}=0.013112$, neither rejects; $\Delta p \le 0.0025$).
    - Approximate fallback results are explicitly and machine-readably tagged with `is_approximate: True` and method declared as `"Kolmogorov-Smirnov (2-sample asymptotic approximation)"`.
  - **Explicit Insufficient Data Handling:** Empty or small samples ($< \text{min_samples}$ default 5) strictly return an explicit `'insufficient_data'` / `'NOT_EVALUATED'` state ($D=\text{None}, p=\text{None}, \text{PSI}=\text{None}$) rather than false `'stable'` designations. Propagated through `calculate_ks_2samp`, `calculate_psi_continuous`, `calculate_psi_categorical`, `validate_source_drift`, runner summaries, and the browser UI badge (`INSUFFICIENT DATA / NOT EVALUATED`). Demonstrated live on micro-batch feed `RegulatoryReport_DB` (3 records).
  - **Downstream Ingestion Gate Enforcement & Policy Differentiation:**
    - Distinctly separated statistical screening recommendations (`QUARANTINE_RECOMMENDED`, `INVESTIGATE`, `PROCEED`, `NOT_EVALUATED`) from physical pipeline gating.
    - Implemented `DownstreamGate` (`src/pipeline/gate.py`) supporting distinct configurable routing policies:
      - `quarantine_on_critical`: quarantines batches with either static invariant violations or statistical drift alerts.
      - `quarantine_on_drift`: quarantines specifically and exclusively on critical distribution drift while admitting batches with static-only errors to clean storage.
      - `audit_only`: logs screening recommendations and admits all batches to clean storage.
      - Unsupported policy strings explicitly raise `ValueError`.
  - **Write-Once Audit Manifests & Repeat-Batch Overwrite Protection:**
    - Removed all un-backed "immutable" claims in code, documentation, and UI.
    - Implemented write-once JSON audit manifests with overwrite protection. If repeat batches attempt to reuse an existing `batch_id` without explicit `allow_overwrite=True`, `FileExistsError` is raised to prevent accidental clobbering of historical evidence.
  - **Synthetic Local File-Routing Demonstration Context:**
    - Consistently documented and labeled all feeds, issue rates, baseline distributions, and downstream storage directories as **synthetic local file-routing demonstrations** modeled after benchmark payment schemas, rather than an established enterprise ingestion integration.
  - **Configurable Screening Heuristics:** Documented that KS/PSI thresholds ($\alpha=0.01$, $\text{PSI} \ge 0.25$) operate as configurable screening rules. Distribution drift alone does not establish corruption or fraud; legitimate business changes (promotions, seasonality, corporate expansion) can cause drift while remaining completely valid. Operational automated blocking requires evaluation of sample size, effect size, multiple testing adjustments, and domain context.
  - **Interactive Dashboard & Headless Smoke Test:** Updated `index.html` with drift KPI cards, quarantine badges, insufficient data badges, downstream gate callouts, and an expandable distribution drift inspection table. Verified via Headless Google Chrome browser smoke test (`tests/test_browser_smoke.cjs`).
- **Acceptance Test:**
  ```bash
  pytest tests/                         # 54 unit and integration tests (100% PASS in 5.50s)
  node tests/test_browser_smoke.cjs     # Headless Google Chrome browser smoke test (0 defects, 0 errors)
  py -3.14 validate.py                  # Full pipeline execution, gate routing & JSON/HTML sync (0.73s)
  ```
- **Result:**
  - **Pytest Suite:** **54/54 tests passed in 5.50s (100% PASS)**, including 16 drift tests (with SciPy parity, threshold boundary cases, approximate labeling, and fallback edge cases), 7 downstream gate isolation tests (verifying distinct policies, overwrite prevention, and hold policies), 18 static invariant tests, and 13 validator tests.
  - **Quarantine Isolation:** Verified that batches triggering critical drift are physically blocked from `data/clean/` and isolated to `data/quarantine/` with write-once JSON audit manifests.
  - **Insufficient Data Classification:** Verified that micro-batch `RegulatoryReport_DB` (3 records) returns `NOT_EVALUATED` / `insufficient_data` without false stable labels.
  - **Multi-Source Execution:** Validated 11,526 records across 15 synthetic demonstration sources in 0.73s (4 stable, 4 warning, 6 critical quarantined, 1 insufficient data).
  - **Headless Chrome Browser Smoke Test:** **100% PASS (0 page errors, 0 console errors)**; verified 6 KPI cards, 15 source rows, 6 quarantine badges, 1 insufficient data badge, row expansion, drift panel, and gate callouts.
- **Remaining Analytical Boundary:** The demonstration operates on batch-level tabular snapshots evaluated against a reference baseline window in a synthetic local file-routing directory structure. It does not perform continuous sliding-window streaming over Apache Kafka partitions, multi-table foreign-key relational graph joins, or automated self-healing data repair. Drift scores are screening heuristics and do not replace domain-level operational investigation.

---

### 1.7 `supply-chain-planner`: Reorder Point Arithmetic & Scenario KPI Defect [RESOLVED]
- **Intervention Category:** Algorithmic Resolution, Modular Architecture & Dynamic Scenario Consistency
- **Public URL:** [https://akbknight.github.io/supply-chain-planner/](https://akbknight.github.io/supply-chain-planner/)
- **Repository:** `https://github.com/akbknight/supply-chain-planner` (Branch: `main`, Commit: `93ccbd2`)
- **Baseline Evidence:**
  1. **Architectural Disconnection:** The repository extracted reference files in `src/js/` (`config.js`, `eoq.js`, `simulation.js`), but `index.html` duplicated all data constants, EOQ formulas, scenario logic, and KPI aggregation inline, creating code divergence risk.
  2. **Baseline Synthetic Arithmetic Inconsistency:** In the original synthetic scenario inputs (`BASE_DATA`), 4 of 8 categories were dimensioned with nominal reorder points below deterministic lead-time demand ($d \times L > R$: IT Equipment $25.2 > 10$, Security Gear $39.2 > 30$, Communication Equip $11.2 > 8$, Vehicle Parts $37.8 > 25$), guaranteeing stockout prior to replenishment delivery under nominal baseline conditions.
  3. **Contradictory KPI Workflow:** The "Below Reorder Point" KPI card evaluated inventory strictly against frozen nominal reorder points rather than scenario-adjusted lead-time demand. During severe demand surges (2.0x–3.0x) and transit delays (+14 days) where items were in `CRITICAL` stockout status, the KPI counter remained stuck at 0 items below reorder.
  4. **Complete Absence of Automated Tests:** The repository possessed 0 automated unit, integration, parity, or browser tests.
- **Intervention & Evidence Repairs:**
  - **Single Shared Modular Architecture:** Refactored `index.html` to load and bind `src/js/config.js`, `src/js/eoq.js`, and `src/js/simulation.js`. Removed 56 lines of duplicate inline logic. Added explicit browser global `window` exposure across all modules, ensuring 100% execution parity between browser runtime and Node.js automated test harnesses.
  - **Revisions to Synthetic Scenario Inputs (Original Values Preserved):** Revised baseline reorder points in `BASE_DATA` to satisfy deterministic lead-time demand ($R \ge \lceil d \times L \rceil$: Office Supplies 126, IT Equipment 26, Security Gear 40, Medical Supplies 75, Communication Equip 12, Vehicle Parts 38, Stationery 200, Facility Supplies 100). The original synthetic demonstration inputs (Office Supplies 120, IT Equipment 10, Security Gear 30, Communication Equip 8, Vehicle Parts 25) are explicitly preserved as `legacyReorderPoint` in the dataset, documentation, and tests for comparative audit. This represents a revision to synthetic demonstration inputs, **not** a measured operational improvement on live facilities.
  - **Dynamic Scenario Reorder Points & Consistent KPIs:** Implemented dynamic calculation of `effectiveReorderPoint = Math.ceil(effectiveDemand * effectiveLeadTime + safetyStock)` and boolean `isBelowReorder` in `computeScenario`. Updated `computeKPIs` to count items below the dynamic scenario threshold. When demand spikes to 2.0x, the KPI card dynamically reflects 3 items below reorder (IT Equipment, Comm Equip, Vehicle Parts), matching the 3 `CRITICAL` stockout alerts.
  - **Dual-Dataset Chart.js Dynamic Scaling:** Bound `effectiveReorderPoint` to Chart.js dataset 1 (`stockChart.data.datasets[1].data = rows.map(r => r.effectiveReorderPoint)`), enabling visual comparison between current stock and dynamically rising reorder thresholds. Bound `window.chart = stockChart` ensuring theme toggle cleanly updates chart styling.
  - **Disruption Toggle Scoped as Replenishment-Quantity Illustration:** Explicitly documented in UI, docstrings, and methodology that the disruption toggle represents an illustrative batch-size reduction (reducing `effectiveOrderQty` by 40%). Because this simulation evaluates a single-period static snapshot of current on-hand stock, downstream replenishment shipment arrivals over time, pipeline stock, and multi-period stock trajectories are unmodeled; therefore `effectiveOrderQty` does not alter `daysUntilStockout` or status classifications.
  - **Removal of Implied Service-Level Guarantees:** Removed all implied service-level claims (e.g. "95% nominal protection") from the buffer-day safety stock calculation (`calculateSafetyStock`). Documented that safety stock based on simple buffer days is a deterministic heuristic and does not guarantee a statistical service level without empirical demand/lead-time distributions, variance estimation ($z \cdot \sigma_L$), and continuous convolution.
  - **Comprehensive Automated Test Suite (19 tests total):**
    - `tests/test_eoq.cjs` (8 unit tests): Wilson EOQ formula analytical derivations, zero/negative parameter guards, exact integer outputs for all 8 base categories, safety stock buffer calculations, and stockout risk thresholds.
    - `tests/test_simulation.cjs` (7 integration tests): Baseline lead-time coverage invariants, 2.0x demand surge verification, maximum stress (+14d delay, 3.0x demand), 40% disruption cuts confirming unmodeled downstream timing invariance, preservation of legacy synthetic ROPs across all 8 items, and deterministic mathematical invariants (every `CRITICAL` item is strictly below reorder point).
    - `tests/test_browser_parity.cjs` (4 parity tests): Confirms `index.html` script tags, asserts absence of duplicate inline definitions, checks presence of all interactive DOM controls, and verifies chart assignments.
    - `tests/test_browser_smoke.cjs` (Real Browser Smoke Test): Headless Google Chrome execution via Puppeteer Core; asserts 0 page/console errors, validates DOM rendering of 4 KPI cards and 8 table rows, tests interactive demand surge slider (verifying 3 critical badges), transit delay slider (+7d), disruption toggle, theme toggle, and captures full-page visual screenshot.
- **Acceptance Test:**
  ```bash
  npm test              # 19 unit, simulation, and browser parity tests (100% PASS)
  npm run test:browser  # Headless Google Chrome browser smoke test (0 defects, 0 errors)
  ```
- **Result:**
  - **Unit & Simulation Suite:** **19/19 tests passed (100% PASS)**.
  - **Headless Chrome Browser Smoke Test:** **100% PASS (0 page errors, 0 console errors)**.
  - **Live Verification Screenshot:** Saved to `live_after_evidence/supply_chain_planner_desktop.png`.
  - **Git Remote Synchronization:** Committed and pushed to `main` at `93ccbd2`.
- **Retained Analytical Boundaries:**
  1. **Unmodeled Replenishment Dynamics & Multi-Period Stock Trajectories:** Downstream replenishment shipment arrivals, in-transit purchase order pipelines, and dynamic post-arrival inventory trajectories over time are not simulated.
  2. **Static Inventory-Position Assumptions:** Stock is modeled strictly as static current on-hand quantity ($S$); does not account for open purchase orders, vendor backorders, emergency reserves, or scrap.
  3. **Deterministic Lead Times & Demand:** Lead times and daily demand rates are scalar constants; does not model stochastic variance distributions or covariance.
  4. **Local Heuristics vs. Global Optimization:** Decentralized single-item Wilson EOQ / ROP without multi-echelon inventory optimization (MEIO) or mixed-integer linear programming (MILP).

---

### 1.8 `anomaly-detection-monitor`: Numerical Division Guards & Dataset Synchronization [RESOLVED]
- **Intervention Category:** Algorithmic & Statistical Resolution, Numerical Division Guardrails & Dashboard Synchronization
- **Public URL:** [https://akbknight.github.io/anomaly-detection-monitor/](https://akbknight.github.io/anomaly-detection-monitor/)
- **Repository:** `https://github.com/akbknight/anomaly-detection-monitor` (Branch: `master`, Commit: `e2f8f68`)
- **Baseline Evidence:**
  1. **Numerical Division Hazards & Runtime Warnings:** In `src/detectors/iqr.py`, computing outlier severity distance ($\text{dist} = \max(|x - \text{fence}|) / IQR$) on discrete, step-level, or degenerate series where $Q_1 = Q_3$ ($IQR = 0$) threw `ZeroDivisionError` and `RuntimeWarning: divide by zero encountered in scalar divide`, producing infinite scores (`inf`). In `src/detectors/zscore.py`, uniform or constant series threw `scipy.stats.zscore` precision loss warnings due to catastrophic cancellation.
  2. **Data Desynchronization Defect:** The browser dashboard (`index.html`) hardcoded an outdated May 2026 dataset (314 months through March 2026, 7 CPI anomalies), while `detect.py` generated 321 months through October 2026 (8 CPI anomalies) into `anomaly_data.json`. The web dashboard was desynchronized from pipeline output, and KPI card period labels were hardcoded rather than dynamic.
  3. **Absence of Browser Smoke and Parity Testing:** Zero automated browser smoke tests, DOM parity checks, or output synchronization tests existed.
- **Intervention & Evidence Repairs:**
  - **Numerical Guardrails:** Added explicit small-sample and degenerate-series guards across all detectors:
    - `zscore.py`: Added `len(series) < 2` guard and `std <= 1e-12` guard; computed $z$-scores directly via $(x - \mu) / \sigma$ with zero-variance protection, eliminating catastrophic cancellation warnings and returning empty anomaly lists on uniform series.
    - `iqr.py`: Added `len(series) < 4` guard and `iqr <= 1e-12` guard, eliminating `ZeroDivisionError` and infinite scores.
    - `cusum.py`: Preserved existing `std_diff <= 1e-9` zero-variance guard.
  - **Automated Pipeline-Dashboard Synchronization:**
    - Updated `src/pipeline/runner.py`'s `write_output(output, sync_html=True)` to serialize to `anomaly_data.json`, `data/artifacts/anomaly_data.json`, and automatically synchronize the inline `const DATA = { ... };` payload in `index.html` via regex replacement with callable lambda substitution (preventing `\u` regex escape corruption).
    - Added `--no-sync` flag to `src/cli/run.py` to allow skipping HTML updates when desired.
    - Exposed `window.DATA = DATA;` on the global browser scope for headless inspection.
    - Updated `index.html` KPI card to evaluate `sub: s0.meta.period` dynamically (`Jan 2000 – Oct 2026`), and fixed table header pluralization (`Anomalies`).
  - **Comprehensive Test Suite (31 Pytest Tests + Headless Browser Smoke Test):**
    - `tests/test_detectors.py`: 16 unit tests, including dedicated zero-variance and zero-IQR tests (`test_zscore_zero_variance_and_small_sample`, `test_iqr_zero_iqr_and_small_sample`).
    - `tests/test_pipeline.py`: 10 deduplication and `write_output` tests (`test_write_output_sync_html_updates_file`, `test_write_output_no_sync_preserves_html`).
    - `tests/test_browser_parity.py`: 5 contract and parity tests asserting exact JSON equality between `index.html`, `anomaly_data.json`, and `data/artifacts/anomaly_data.json`.
    - `tests/test_browser_smoke.cjs`: Headless Google Chrome browser smoke test verifying 0 console/runtime errors, `window.DATA` bindings (UNRATE: 321 mos / 4 anomalies, CPI: 321 mos / 8 anomalies), 5 KPI cards (12 anomalies, 4 high), Chart.js canvas rendering, initial UNRATE table (4 rows), interactive series switch to CPI (#btn-1, 8 rows), and light/dark theme toggle.
  - **Visual Evidence:** Saved full desktop viewport screenshot to `live_after_evidence/anomaly_detection_monitor_desktop.png`.
- **Acceptance Test:**
  ```bash
  pytest tests/ -v                      # 31 unit, edge-case, and parity tests (100% PASS in 4.87s)
  node tests/test_browser_smoke.cjs     # Headless Google Chrome browser smoke test (0 defects, 0 errors)
  python detect.py                      # Full FRED ingestion, detection & HTML sync (321 months, 12 anomalies)
  ```
- **Result:**
  - **Pytest Suite:** **31/31 tests passed (100% PASS)** in 4.87s.
  - **Headless Chrome Browser Smoke Test:** **100% PASS (0 page errors, 0 console errors)**.
  - **Synchronization:** Verified identical data between `anomaly_data.json` and `index.html` (321 months, 12 anomalies: 4 UNRATE, 8 CPI; 4 high severity).
  - **Live Verification Screenshot:** Saved to `live_after_evidence/anomaly_detection_monitor_desktop.png`.
  - **Git Remote Synchronization:** Committed and pushed to `origin/master` at `e2f8f68`.
- **Retained Analytical Boundaries:**
  1. **Univariate Heuristics Only:** Detection is conducted independently on each univariate series (Rolling Z-Score, Tukey IQR fences, Page CUSUM on first differences). It does not model cross-series macroeconomic covariance or joint structural breaks (e.g. via Mahalanobis distance, VAR residuals, PCA reconstruction, or multivariate Isolation Forest).
  2. **Fixed Deterministic Thresholding:** Thresholds ($2.5\sigma$ Z-score, $2.0 \times IQR$, $h=4\sigma$ CUSUM) are static heuristics. They do not dynamically adapt to non-stationary volatility regimes or seasonal decomposition (STL).
  3. **Descriptive Anomaly Filtering:** Flagged anomalies represent historical statistical outliers and level shifts. They do not isolate causal policy shocks or constitute forward-looking probabilistic recession forecasts.

---

## 2. Empirical Data Lineage & Provenance

### 2.1 `irs990-grant-dashboard`
- **Intervention Category:** Data Lineage, Provenance & Predictive Evaluation
- **Public URL:** [https://akbknight.github.io/irs990-grant-dashboard/](https://akbknight.github.io/irs990-grant-dashboard/)
- **Repository:** `https://github.com/akbknight/irs990-grant-dashboard` (Branch: `main`, Commit: `6da555b`)
- **Baseline Evidence:** Local file identification was previously conflated with upstream provenance. S3 bucket links were marked as "pending verification" as if normal documentation links required cryptographic hashes. Duplicate rows were termed "recurring milestone tranches" without verification. Upstream 18-digit return ObjectIds were missing.
- **Intervention:**
  - **File Identification vs. Upstream Provenance:** Clearly separated local CSV file identification from upstream provenance:
    - **Local File Identification:** `data/FoundationData19.21.csv` (10,310,923 bytes · SHA-256: `de37e5a1004a97527695e72c54db822306ac66b3590300775167e1c54c6c5a68`).
    - **Upstream Provenance:** AWS Open Data IRS 990 Bucket `s3://irs-form-990/` (us-east-1) containing raw MeF XML returns. Extracted via `master_pipeline.py` parsing `<GrantOrContributionPdDurYr>` from Form 990 Schedule I and Form 990-PF Part XV.
    - **Explicit Missing Lineage:** Specifically documented that upstream 18-digit IRS Return ObjectIds and individual S3 archive ZIP hashes were not captured in the downstream export columns and are explicitly retained as **unresolved lineage** until source identifiers are recovered or a newly traceable dataset is constructed.
  - **Verified External Destinations:** Destination-verified all ordinary documentation URLs (ProPublica API, AWS Open Data, IRS EO BMF, Census Gazetteer) via HTTP 200 responses, reserving SHA-256 checksums strictly for file artifacts.
  - **Duplicate Rows Preserved Pending Verification:** 2,435 duplicate-looking rows (~2.6%) are explicitly documented as **preserved pending verification** against primary schedules (since Schedule I XML lacks unique transaction IDs) rather than assumed to be recurring tranches.
  - **Defensible Predictive Recommendation:** Formulated a bounded recommendation based on residual test error:
    *"Predictive budgeting is not recommended on these tested features and data due to high out-of-sample error ($86,013 MAE against a $10,000 median grant) and a 31.7% cold-start foundation rate. The platform is engineered for descriptive historical analysis, institutional concentration mapping, and geographic discovery."*
- **Acceptance Test:**
  ```bash
  py -3.12 scripts/evaluate_models.py
  ```
- **Result:** Benchmark synchronized across 7 ML models; file integrity cryptographically verified; link destinations verified; documentation clearly records unresolved return-level lineage.
- **Remaining Analytical Boundary:** The modeled dataset is restricted to 93,672 raw / 93,638 positive records (2019–2021). Features exclude narrative grant text, multi-year foundation asset balances, and recipient financial viability. The institutional scaling trendline ($\beta \approx 0.83, R^2 \approx 0.28$) is descriptive and does not compute studentized residuals or Cook's distance to formally classify outliers.

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
- **Remaining Analytical Boundary:** The interactive workbench is a client-side routing heuristic simulator; it does not issue live API calls to model inference endpoints, measure token latency, or dynamically track provider rate-limit backoffs.

---

## 4. Retained Analytical Boundaries & Scoped Dependencies

The following applications have undergone architectural review, and their core analytical boundaries or external dependencies are **explicitly scoped and retained**:

### 4.1 `Vitara`
- **Intervention Status:** Architecture Reviewed & Retained; External Scoped Dependency Retained
- **Public URL:** [https://akbknight.github.io/vitara/](https://akbknight.github.io/vitara/)
- **Repository:** `https://github.com/akbknight/vitara` (Branch: `main`, Commit: `eb39ee7`)
- **Intervention:** Audited Git remote, verified clean working tree on `main`, reviewed health coaching prototype design, and retained existing presentation without gratuitous rewrites.
- **Acceptance Test:** Git status check, static asset and HTML structure review.
- **Scoped External Dependencies & Analytical Limitations:**
  1. **Scoped External Dependency (Wearable Telemetry):** Live streaming from wearable health sensors (Apple HealthKit, Google Health Connect, Oura API) is an external hardware/OS-scoped dependency that is not available in a static browser environment. All biometric telemetry (HRV, resting heart rate, sleep architecture) remains synthetic client-side mocks and is not simulated or declared complete without live device integration.
  2. **No Clinical Algorithm Validation:** Wellness recommendations are rule-based UI prototypes and have not been validated against clinical trial protocols.

---

### 4.2 `akbknight.github.io` (Main Portfolio Platform)
- **Intervention Category:** Platform Synchronization & Synthesis
- **Public URL:** [https://akbknight.github.io/](https://akbknight.github.io/)
- **Repository:** `https://github.com/akbknight/akbknight.github.io` (Branch: `main`; Deployment Branch: `gh-pages`)
- **Intervention:**
  - Synchronized project case studies with latest empirical findings: single shared scheduler module with Headless Chrome browser smoke tests and 8 Node parity checks, retail 4-origin 12-month horizon suite (1.515% Mean MAPE, narrow ~0.0245 pp spread, retrospective robustness distinction, original historical holdout), economic scenario dual-engine architecture (calibrated policy rules vs. empirical OLS regressions with 95% confidence bounds), IRS S3 XML lineage (SHA-256 hash `de37...`, duplicate rows preserved pending verification, explicit missing return-level lineage, destination-verified documentation links), data pipeline validator distribution drift screening and gate isolation (54 pytest checks, Headless Chrome smoke test), and anomaly detection monitor numerical division guards and automated dashboard synchronization (31 pytest checks, Headless Chrome smoke test).
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
| **`scheduling-optimizer`** | JavaScript / Heuristics | **Algorithmic Resolution** | 61 attendee clearance violations on Seed 42; code duplication between browser and tests | Single shared module (`src/js/algorithm.js`) + strict attendee validation (rejects unknown IDs, non-finite values) + 14 edge tests + 8 Node parity tests + Headless Chrome browser smoke test | 14/14 edge tests PASS; 8/8 parity tests PASS; Browser Smoke PASS (0 defects) | `d20fd43` | **Live & Deployed** (Pages) |
| **`us-retail-sales-forecast`** | Python / statsmodels | **Algorithmic Resolution** | Single 12-mo fixed holdout only; understated ~0.0245 pp spread | 4-origin 12-month horizon suite + per-origin breakdown + original historical holdout terminology + 0.0245 pp spread | 44/44 pytest PASS | `7a00a83` | **Live & Deployed** (Pages) |
| **`economic-scenario-analysis`** | JavaScript / OLS / Econometrics | **Econometric Resolution** | Stylized rounded parameters only; 0 confidence bounds; 62% Soft Landing recession risk; duplicated inline code | Contemporaneous Retail OLS (N=16) + conditional-mean CI + illustrative policy assumptions + sample-fitted logistic MLE (SciPy trust-exact verified) + dual-engine UI toggle + shared module architecture | 6/6 parity PASS; 7/7 Python OLS & Diag PASS; Browser Smoke PASS | `5418601` | **Live & Deployed** (Pages) |
| **`irs990-grant-dashboard`** | Python / DuckDB / Three.js | **Data Lineage & Provenance** | File ID conflated with provenance; return ObjectIds missing; link verification unclear | Documented SHA-256 hash, file size, extraction commands, duplicates preserved pending verification, missing lineage unresolved, destination-verified links | 7 ML models evaluated | `6da555b` | **Live & Deployed** (Pages) |
| **`saltpepper-win`** | HTML5 / CSS / Vanilla JS | **Developer Workflow** | Generic centered hero, chained commands | Asymmetric dev layout, copyable PowerShell commands, terminal widened, price clarity | Verified (Copy tested) | `ce2e40c` | **Live & Deployed** (Pages) |
| **`ai-strategic-briefing`** | Python / Stats / Web | **Algorithmic Resolution** | Background GPU loop + failing Z-score test | Removed loop, fixed small-sample Z threshold | 43/43 pytest PASS | `196e763` | **Live & Deployed** (Pages) |
| **`data-pipeline-validator`** | Python / Stats / Web | **Algorithmic & Statistical Resolution (Drift Screening & Gate Isolation)** | Static in-memory validation only; blind to distributional drift | Dual-engine architecture + Two-Sample KS test + Continuous/Categorical PSI + Downstream Gate isolation + verified SciPy fallback & explicit insufficient data handling | 54/54 pytest PASS; Browser Smoke PASS (0 defects) | `f3ebf8a` | **Live & Deployed** (Pages) |
| **`supply-chain-planner`** | JavaScript / Heuristics | **Algorithmic Resolution (Reorder Arithmetic & Dynamic Scenario KPI)** | Code duplication between index.html and src/js; 4/8 categories with R < d*L; frozen static reorder KPI; 0 tests | Single shared module architecture + revised synthetic baseline ROPs (legacy preserved) + dynamic scenario ROP & consistent KPI + 19 automated tests | 19/19 tests PASS; Browser Smoke PASS (0 defects) | `93ccbd2` | **Live & Deployed** (Pages) |
| **`anomaly-detection-monitor`** | Python / Stats / Web | **Algorithmic & Statistical Resolution (Numerical Guards & Dashboard Sync)** | Zero-variance catastrophic warnings; Zero-IQR division by zero; desynchronized HTML (314 vs 321 mos); 0 tests | Zero-variance/zero-IQR guardrails + write_output automatic HTML synchronization + 31 unit/parity tests + Headless Chrome smoke test | 31/31 pytest PASS; Browser Smoke PASS (0 defects) | `e2f8f68` | **Live & Deployed** (Pages) |
| **`crisis-to-care`** | React / Vite | **Algorithmic & Build** | Broken `package-lock.json` build failure | Resolved lockfile dependencies, verified build | Build Clean (6.13s) | `2e47b8e` | **Deployment-Blocked** (Actions Billing Lock) |
| **`Vitara`** | HTML5 / Supabase | **Retained Analytical Boundary** | Unaudited nested repository structure | Reviewed & retained; client-side prototype with mock biometrics; wearable sensor streaming is a scoped external dependency | Structure Verified | `eb39ee7` | **Live & Retained** |
| **`akbknight.github.io`** | Next.js 16 / TypeScript | **Platform Synchronization** | Divergent Hairline focus, unmeasured claims | Direction B editorial + verified empirical findings synchronized across all projects | Static Build PASS | `ab0ebfd` / `11dec09` | **Live & Deployed** (gh-pages) |
