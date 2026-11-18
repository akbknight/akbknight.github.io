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

The following applications have undergone visual cleanup and documentation alignment, and their core analytical limitations or external dependencies are **explicitly scoped and retained**:

### 4.1 `data-pipeline-validator`
- **Intervention Status:** Visual & Typographic Alignment Completed; Analytical Limitations Retained
- **Public URL:** [https://akbknight.github.io/data-pipeline-validator/](https://akbknight.github.io/data-pipeline-validator/)
- **Repository:** `https://github.com/akbknight/data-pipeline-validator` (Branch: `master`, Commit: `1f25b89`)
- **Visual Intervention:** Removed decorative calipers and pseudo-sci-fi scanline overlays; applied Editorial Quantitative Craft design tokens and clean tabular typography.
- **Acceptance Test:** `pytest tests/` (28/28 tests passed in 1.13s).
- **Retained Analytical Limitations:**
  1. **Static In-Memory Validation Only:** The validator operates strictly on static, in-memory tabular batches (null counts, data type checks, categorical allowable value membership).
  2. **No Statistical Distribution Drift:** It lacks continuous statistical drift detection algorithms (e.g., Kolmogorov-Smirnov two-sample tests, Population Stability Index (PSI), or Wasserstein distance) to detect subtle feature shift over time.
  3. **No Streaming Schema Evolution:** It does not handle streaming schema changes, out-of-order event ingestion, or distributed partitions (Kafka/Spark).

---

### 4.2 `anomaly-detection-monitor`
- **Intervention Status:** Visual Alignment Completed; Analytical Limitations Retained
- **Public URL:** [https://akbknight.github.io/anomaly-detection-monitor/](https://akbknight.github.io/anomaly-detection-monitor/)
- **Repository:** `https://github.com/akbknight/anomaly-detection-monitor` (Branch: `master`, Commit: `561e566`)
- **Visual Intervention:** Refactored palette to Editorial Quantitative Craft standards, aligned tabular numbers, and replaced neon accents.
- **Acceptance Test:** `pytest tests/` (22/22 tests passed in 1.85s).
- **Retained Analytical Limitations:**
  1. **Univariate Heuristics Only:** The anomaly detector relies on independent univariate rolling heuristics (Rolling Z-Score, IQR fences, CUSUM regime shift).
  2. **No Multivariate Covariate Correlation:** It does not model joint multi-sensor correlations or multidimensional anomalies (e.g., Mahalanobis distance, PCA reconstruction error, or Isolation Forests).
  3. **No Dynamic Regime Adaptation:** The detection thresholds are fixed and do not adapt autonomously to seasonality, periodic maintenance cycles, or non-stationary baseline shifts.

---

### 4.3 `supply-chain-planner`
- **Intervention Status:** Theme & Monospace Alignment Completed; Analytical Limitations Retained
- **Public URL:** [https://akbknight.github.io/supply-chain-planner/](https://akbknight.github.io/supply-chain-planner/)
- **Repository:** `https://github.com/akbknight/supply-chain-planner` (Branch: `main`, Commit: `1edd093`)
- **Visual Intervention:** Added universal light/dark theme toggle, editorial design tokens, and tabular monospace figure styling.
- **Acceptance Test:** Theme toggle audit and responsive desktop/mobile layout inspection.
- **Retained Analytical Limitations:**
  1. **Deterministic Lead Times:** The multi-echelon safety stock formulation assumes constant, deterministic lead times between stages.
  2. **No Stochastic Disruption Modeling:** It does not model stochastic lead-time variance, maritime shipping bottlenecks, customs detention risks, or catastrophic supplier outages.
  3. **Heuristic vs. Optimal Allocation:** Inventory reorder points are computed via local decoupled heuristics rather than global mixed-integer linear programming (MILP) or multi-echelon inventory optimization (MEIO).

---

### 4.4 `Vitara`
- **Intervention Status:** Architecture Reviewed & Retained; External Scoped Dependency Retained
- **Public URL:** [https://akbknight.github.io/vitara/](https://akbknight.github.io/vitara/)
- **Repository:** `https://github.com/akbknight/vitara` (Branch: `main`, Commit: `eb39ee7`)
- **Intervention:** Audited Git remote, verified clean working tree on `main`, reviewed health coaching prototype design, and retained existing presentation without gratuitous rewrites.
- **Acceptance Test:** Git status check, static asset and HTML structure review.
- **Scoped External Dependencies & Analytical Limitations:**
  1. **Scoped External Dependency (Wearable Telemetry):** Live streaming from wearable health sensors (Apple HealthKit, Google Health Connect, Oura API) is an external hardware/OS-scoped dependency that is not available in a static browser environment. All biometric telemetry (HRV, resting heart rate, sleep architecture) remains synthetic client-side mocks and is not simulated or declared complete without live device integration.
  2. **No Clinical Algorithm Validation:** Wellness recommendations are rule-based UI prototypes and have not been validated against clinical trial protocols.

---

### 4.5 `akbknight.github.io` (Main Portfolio Platform)
- **Intervention Category:** Platform Synchronization & Synthesis
- **Public URL:** [https://akbknight.github.io/](https://akbknight.github.io/)
- **Repository:** `https://github.com/akbknight/akbknight.github.io` (Branch: `main`; Deployment Branch: `gh-pages`)
- **Intervention:**
  - Synchronized project case studies with latest empirical findings: single shared scheduler module with Headless Chrome browser smoke tests and 8 Node parity checks, retail 4-origin 12-month horizon suite (1.515% Mean MAPE, narrow ~0.0245 pp spread, retrospective robustness distinction, original historical holdout), economic scenario dual-engine architecture (calibrated policy rules vs. empirical OLS regressions with 95% confidence bounds), and IRS S3 XML lineage (SHA-256 hash `de37...`, duplicate rows preserved pending verification, explicit missing return-level lineage, destination-verified documentation links).
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
| **`scheduling-optimizer`** | JavaScript / Heuristics | **Algorithmic Resolution** | 61 attendee clearance violations on Seed 42; code duplication between browser and tests | Single shared module (`src/js/algorithm.js`) + strict attendee validation (rejects unknown IDs, non-finite values) + 14 edge tests + 8 Node parity tests + Headless Chrome browser smoke test | 14/14 edge tests PASS; 8/8 parity tests PASS; Browser Smoke PASS (0 defects) | `d20fd43` | **Live & Deployed** (Pages) |
| **`us-retail-sales-forecast`** | Python / statsmodels | **Algorithmic Resolution** | Single 12-mo fixed holdout only; understated ~0.0245 pp spread | 4-origin 12-month horizon suite + per-origin breakdown + original historical holdout terminology + 0.0245 pp spread | 44/44 pytest PASS | `7a00a83` | **Live & Deployed** (Pages) |
| **`economic-scenario-analysis`** | JavaScript / OLS / Econometrics | **Econometric Resolution** | Stylized rounded parameters only; 0 confidence bounds; 62% Soft Landing recession risk; duplicated inline code | Contemporaneous Retail OLS (N=16) + conditional-mean CI + illustrative policy assumptions + sample-fitted logistic MLE (SciPy trust-exact verified) + dual-engine UI toggle + shared module architecture | 6/6 parity PASS; 7/7 Python OLS & Diag PASS; Browser Smoke PASS | `5418601` | **Live & Deployed** (Pages) |
| **`irs990-grant-dashboard`** | Python / DuckDB / Three.js | **Data Lineage & Provenance** | File ID conflated with provenance; return ObjectIds missing; link verification unclear | Documented SHA-256 hash, file size, extraction commands, duplicates preserved pending verification, missing lineage unresolved, destination-verified links | 7 ML models evaluated | `6da555b` | **Live & Deployed** (Pages) |
| **`saltpepper-win`** | HTML5 / CSS / Vanilla JS | **Developer Workflow** | Generic centered hero, chained commands | Asymmetric dev layout, copyable PowerShell commands, terminal widened, price clarity | Verified (Copy tested) | `ce2e40c` | **Live & Deployed** (Pages) |
| **`ai-strategic-briefing`** | Python / Stats / Web | **Algorithmic Resolution** | Background GPU loop + failing Z-score test | Removed loop, fixed small-sample Z threshold | 43/43 pytest PASS | `196e763` | **Live & Deployed** (Pages) |
| **`crisis-to-care`** | React / Vite | **Algorithmic & Build** | Broken `package-lock.json` build failure | Resolved lockfile dependencies, verified build | Build Clean (6.13s) | `2e47b8e` | **Deployment-Blocked** (Actions Billing Lock) |
| **`data-pipeline-validator`** | Python / Dash | **Retained Analytical Boundary** | Cluttered calipers & neon scanlines | Visual alignment done; in-memory batch checks only; no statistical drift detection (KS/PSI/Wasserstein) | 28/28 pytest PASS (1.13s) | `1f25b89` | **Live & Deployed** (Pages) |
| **`anomaly-detection-monitor`** | Python / Dash | **Retained Analytical Boundary** | Neon cyberpunk accents & scanlines | Visual alignment done; univariate heuristics only; no multivariate correlation (Mahalanobis/Isolation Forest) | 22/22 pytest PASS (1.85s) | `561e566` | **Live & Deployed** (Pages) |
| **`supply-chain-planner`** | JavaScript / Heuristics | **Retained Analytical Boundary** | No light/dark toggle, cramped tables | Visual alignment done; deterministic heuristic with constant lead times; no stochastic disruption modeling | Verified (Theme tested) | `1edd093` | **Live & Deployed** (Pages) |
| **`Vitara`** | HTML5 / Supabase | **Retained Analytical Boundary** | Unaudited nested repository structure | Reviewed & retained; client-side prototype with mock biometrics; wearable sensor streaming is a scoped external dependency | Structure Verified | `eb39ee7` | **Live & Retained** |
| **`akbknight.github.io`** | Next.js 16 / TypeScript | **Platform Synchronization** | Divergent Hairline focus, unmeasured claims | Direction B editorial + verified empirical findings synchronized across all projects | Static Build PASS | Current `main` / `gh-pages` | **Live & Deployed** (gh-pages) |
