import asyncio
import os
import sys
from playwright.async_api import async_playwright

ARTIFACT_DIR = r"C:\Users\Akshay Kumar\.gemini\antigravity\brain\fe0681aa-ec1f-4588-b8b4-8e98d282e15a"
BASE_URL = "http://localhost:3045"

def calculate_relative_luminance(rgb_list):
    r, g, b = [x / 255.0 for x in rgb_list[:3]]
    def channel_luminance(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * channel_luminance(r) + 0.7152 * channel_luminance(g) + 0.0722 * channel_luminance(b)

def calculate_contrast_ratio(rgb1, rgb2):
    l1 = calculate_relative_luminance(rgb1)
    l2 = calculate_relative_luminance(rgb2)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)

async def run_audit():
    results = {}
    failures = []
    print("=" * 75)
    print("STARTING RIGOROUS IN-REPOSITORY VERIFICATION SUITE")
    print("=" * 75)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)

        # ─────────────────────────────────────────────────────────────
        # 1. Desktop Test (1440x900, Dark Scheme)
        # ─────────────────────────────────────────────────────────────
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            color_scheme="dark",
            has_touch=True
        )
        page = await context.new_page()
        await page.goto(BASE_URL, wait_until="networkidle")

        # 1A. Check Single H1 and Unbroken Name Tokens
        h1_locators = page.locator("h1")
        h1_count = await h1_locators.count()
        h1_text = await h1_locators.first.inner_text() if h1_count > 0 else ""
        h1_tokens = await page.evaluate("() => Array.from(document.querySelectorAll('h1 span')).map(s => s.innerText.trim())")
        passed_h1 = (h1_count == 1) and ("Akshay Kumar" in h1_text) and (h1_tokens == ["Akshay", "Kumar"])
        results["h1_check"] = {"count": h1_count, "text": h1_text.strip(), "tokens": h1_tokens, "passed": passed_h1}
        print(f"[CHECK 1] Single H1 & Tokens: '{h1_text.strip()}' {h1_tokens} -> Passed: {passed_h1}")
        if not passed_h1:
            failures.append(f"H1 check failed: count={h1_count}, text='{h1_text}', tokens={h1_tokens}")

        # 1B. Check Navigation (6 sections 00 to 05)
        nav_links = page.locator("nav[aria-label='Primary page navigation'] a")
        nav_count = await nav_links.count()
        expected_nav = [
            "00 · OVERVIEW",
            "01 · BACKGROUND & FOCUS",
            "02 · TRACK RECORD",
            "03 · FEATURED SYSTEMS",
            "04 · TECHNICAL WRITE-UPS & METHODOLOGY",
            "05 · CONTACT & HIRING"
        ]
        nav_labels = [(await nav_links.nth(i).inner_text()).strip() for i in range(nav_count)]
        nav_passed = len(nav_labels) == 6 and all(expected_nav[i] == nav_labels[i] for i in range(6))
        results["nav_check"] = {"labels": nav_labels, "passed": nav_passed}
        print(f"[CHECK 2] Navigation: {nav_labels} -> Passed: {nav_passed}")
        if not nav_passed:
            failures.append(f"Navigation check failed: {nav_labels}")

        # 1C. Check Non-Repetition: Sidebar has location, Hero has single authoritative availability badge
        sidebar_avail_count = await page.locator("aside:has-text('Available June 1, 2027')").count()
        hero_badge = page.locator("section#hero span:has-text('Targeting BI, Data Analytics & Operations Roles · Available June 1, 2027')")
        hero_badge_count = await hero_badge.count()
        non_repetition_passed = (sidebar_avail_count == 0) and (hero_badge_count == 1)
        results["availability_non_repetition"] = {
            "sidebar_avail_count": sidebar_avail_count,
            "hero_badge_count": hero_badge_count,
            "passed": non_repetition_passed
        }
        print(f"[CHECK 3] Availability Non-Repetition: sidebar={sidebar_avail_count}, hero={hero_badge_count} -> Passed: {non_repetition_passed}")
        if not non_repetition_passed:
            failures.append(f"Availability repetition detected: sidebar={sidebar_avail_count}")

        # 1D. Check 3 Featured Projects & Natural Image Load (naturalWidth > 0)
        img_irs = page.locator("section#projects img[src*='irs990.png']").first
        img_retail = page.locator("section#projects img[src*='retail-forecast.png']").first
        img_sched = page.locator("section#projects img[src*='scheduling-optimizer.png']").first

        await img_irs.scroll_into_view_if_needed()
        await img_retail.scroll_into_view_if_needed()
        await img_sched.scroll_into_view_if_needed()
        await page.wait_for_timeout(300)

        irs_loaded = await img_irs.evaluate("el => el.complete && el.naturalWidth > 0 && el.naturalHeight > 0")
        retail_loaded = await img_retail.evaluate("el => el.complete && el.naturalWidth > 0 && el.naturalHeight > 0")
        sched_loaded = await img_sched.evaluate("el => el.complete && el.naturalWidth > 0 && el.naturalHeight > 0")
        images_loaded_passed = irs_loaded and retail_loaded and sched_loaded
        results["featured_images_loaded"] = {
            "irs_loaded": irs_loaded,
            "retail_loaded": retail_loaded,
            "sched_loaded": sched_loaded,
            "passed": images_loaded_passed
        }
        print(f"[CHECK 4] Output Screenshots Verified Loaded: IRS={irs_loaded}, Retail={retail_loaded}, Sched={sched_loaded} -> Passed: {images_loaded_passed}")
        if not images_loaded_passed:
            failures.append(f"Images failed to load: IRS={irs_loaded}, Retail={retail_loaded}, Sched={sched_loaded}")

        # 1E. Check Pipeline Tab Labels Visual Separation & Zero Overlap
        irs_card = page.locator("section#projects").locator("text=IRS 990 Philanthropic Grant Miner").locator("xpath=ancestor::div[contains(@class, 'spotlight-card')]").first
        tablist = irs_card.locator("div[role='tablist']")
        tabs = tablist.locator("button[role='tab']")
        tab_count = await tabs.count()
        tab_boxes = []
        for i in range(tab_count):
            box = await tabs.nth(i).bounding_box()
            tab_boxes.append(box)

        has_overlap = False
        overlap_details = []
        for i in range(tab_count):
            for j in range(i + 1, tab_count):
                b1, b2 = tab_boxes[i], tab_boxes[j]
                if b1 and b2:
                    overlap_x = max(0, min(b1["x"] + b1["width"], b2["x"] + b2["width"]) - max(b1["x"], b2["x"]))
                    overlap_y = max(0, min(b1["y"] + b1["height"], b2["y"] + b2["height"]) - max(b1["y"], b2["y"]))
                    if overlap_x > 0.5 and overlap_y > 0.5:
                        has_overlap = True
                        overlap_details.append(f"Tab {i} and Tab {j} overlap by {overlap_x:.1f}x{overlap_y:.1f}px")

        tabs_no_overlap_passed = (tab_count == 4) and (not has_overlap)
        results["pipeline_tabs_no_overlap"] = {
            "tab_count": tab_count,
            "has_overlap": has_overlap,
            "passed": tabs_no_overlap_passed
        }
        print(f"[CHECK 5] Pipeline 2x2 Tabs No Overlap: count={tab_count}, overlap={has_overlap} -> Passed: {tabs_no_overlap_passed}")
        if not tabs_no_overlap_passed:
            failures.append(f"Pipeline tabs overlap detected: {overlap_details}")

        # 1F. Test ARIA Tablist Keyboard Navigation (ArrowRight, End, Home)
        initial_selected = -1
        for i in range(tab_count):
            if await tabs.nth(i).get_attribute("aria-selected") == "true":
                initial_selected = i
                break

        await tabs.nth(initial_selected).focus()
        await page.keyboard.press("ArrowRight")
        await page.wait_for_timeout(100)
        after_right = -1
        for i in range(tab_count):
            if await tabs.nth(i).get_attribute("aria-selected") == "true":
                after_right = i
                break

        await page.keyboard.press("End")
        await page.wait_for_timeout(100)
        after_end = -1
        for i in range(tab_count):
            if await tabs.nth(i).get_attribute("aria-selected") == "true":
                after_end = i
                break

        await page.keyboard.press("Home")
        await page.wait_for_timeout(100)
        after_home = -1
        for i in range(tab_count):
            if await tabs.nth(i).get_attribute("aria-selected") == "true":
                after_home = i
                break

        tab_keyboard_passed = (after_right == (initial_selected + 1) % 4) and (after_end == 3) and (after_home == 0)
        results["tab_keyboard_navigation"] = {
            "after_right": after_right,
            "after_end": after_end,
            "after_home": after_home,
            "passed": tab_keyboard_passed
        }
        print(f"[CHECK 6] ARIA Tab Keyboard Nav: right={after_right}, end={after_end}, home={after_home} -> Passed: {tab_keyboard_passed}")
        if not tab_keyboard_passed:
            failures.append("Tablist keyboard navigation failed")

        # 1G. Check Lightbox Modal Full Accessibility Suite & Exact Trigger Identity
        enlarge_btn = irs_card.locator("button:has-text('View Larger')").first
        await enlarge_btn.evaluate("el => { window._lightboxTrigger = el; }")
        await enlarge_btn.click()
        await page.wait_for_timeout(250)

        img_modal = page.locator("div[role='dialog'][aria-label*='preview']")
        img_modal_visible = await img_modal.is_visible()

        # Initial focus inside dialog
        initial_focus_in_dialog = await page.evaluate("""() => {
            const dialog = document.querySelector("div[role='dialog'][aria-label*='preview']");
            return dialog && dialog.contains(document.activeElement);
        }""")

        # Body scroll locked
        body_scroll_locked = await page.evaluate("() => document.body.style.overflow === 'hidden'")

        # Tab key wraps inside modal
        await page.evaluate("""() => {
            const dialog = document.querySelector("div[role='dialog'][aria-label*='preview']");
            const focusables = dialog.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
            if (focusables.length > 0) focusables[focusables.length - 1].focus();
        }""")
        await page.keyboard.press("Tab")
        await page.wait_for_timeout(100)
        tab_wrapped_to_first = await page.evaluate("""() => {
            const dialog = document.querySelector("div[role='dialog'][aria-label*='preview']");
            const focusables = dialog.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
            return focusables.length > 0 && document.activeElement === focusables[0];
        }""")

        # Escape closes, restores scroll, and restores exact trigger reference
        await page.keyboard.press("Escape")
        await page.wait_for_timeout(350)
        img_modal_closed = not (await img_modal.is_visible())
        body_scroll_restored = await page.evaluate("() => document.body.style.overflow === ''")
        exact_trigger_restored = await page.evaluate("() => document.activeElement === window._lightboxTrigger")

        lightbox_suite_passed = (
            img_modal_visible and
            initial_focus_in_dialog and
            body_scroll_locked and
            tab_wrapped_to_first and
            img_modal_closed and
            body_scroll_restored and
            exact_trigger_restored
        )
        results["lightbox_accessibility"] = {
            "opened": img_modal_visible,
            "initial_focus_in_dialog": initial_focus_in_dialog,
            "body_scroll_locked": body_scroll_locked,
            "tab_wrapped_to_first": tab_wrapped_to_first,
            "closed_on_esc": img_modal_closed,
            "body_scroll_restored": body_scroll_restored,
            "exact_trigger_restored": exact_trigger_restored,
            "passed": lightbox_suite_passed
        }
        print(f"[CHECK 7] Lightbox Accessibility: FocusInDialog={initial_focus_in_dialog}, ScrollLock={body_scroll_locked}, TabWrap={tab_wrapped_to_first}, EscClose={img_modal_closed}, ExactTrigger={exact_trigger_restored} -> Passed: {lightbox_suite_passed}")
        if not lightbox_suite_passed:
            failures.append(f"Lightbox accessibility suite failed: FocusIn={initial_focus_in_dialog}, Wrap={tab_wrapped_to_first}, TriggerRestored={exact_trigger_restored}")

        # 1H. Check ResumeModal Accessibility Suite & Exact Trigger Identity
        resume_trigger = page.locator("section#hero button:has-text('Interactive résumé')").first
        await resume_trigger.evaluate("el => { window._resumeTrigger = el; }")
        await resume_trigger.click()
        await page.wait_for_timeout(300)

        resume_modal = page.locator("div[role='dialog'][aria-label*='Curriculum Vitae']")
        modal_opened = await resume_modal.is_visible()

        initial_modal_focus_in_dialog = await page.evaluate("""() => {
            const m = document.querySelector("div[role='dialog'][aria-label*='Curriculum Vitae']");
            return m && m.contains(document.activeElement);
        }""")

        await page.evaluate("""() => {
            const m = document.querySelector("div[role='dialog'][aria-label*='Curriculum Vitae']");
            const els = m.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
            if (els.length > 0) els[els.length - 1].focus();
        }""")
        await page.keyboard.press("Tab")
        await page.wait_for_timeout(100)
        is_first_focused = await page.evaluate("""() => {
            const m = document.querySelector("div[role='dialog'][aria-label*='Curriculum Vitae']");
            const els = m.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
            return els.length > 0 && document.activeElement === els[0];
        }""")

        await page.keyboard.press("Shift+Tab")
        await page.wait_for_timeout(100)
        is_last_focused = await page.evaluate("""() => {
            const m = document.querySelector("div[role='dialog'][aria-label*='Curriculum Vitae']");
            const els = m.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
            return els.length > 0 && document.activeElement === els[els.length - 1];
        }""")

        await page.keyboard.press("Escape")
        await page.wait_for_timeout(500)
        modal_closed = not (await resume_modal.is_visible())
        resume_exact_trigger_restored = await page.evaluate("() => document.activeElement === window._resumeTrigger")

        modal_full_passed = (
            modal_opened and
            initial_modal_focus_in_dialog and
            is_first_focused and
            is_last_focused and
            modal_closed and
            resume_exact_trigger_restored
        )
        results["modal_accessibility_suite"] = {
            "opened": modal_opened,
            "initial_focus_in_dialog": initial_modal_focus_in_dialog,
            "tab_wrapped_to_first": is_first_focused,
            "shift_tab_wrapped_to_last": is_last_focused,
            "closed_on_esc": modal_closed,
            "exact_trigger_restored": resume_exact_trigger_restored,
            "passed": modal_full_passed
        }
        print(f"[CHECK 8] ResumeModal Suite: FocusInDialog={initial_modal_focus_in_dialog}, TabWrap={is_first_focused}, ShiftTabWrap={is_last_focused}, EscClose={modal_closed}, ExactTrigger={resume_exact_trigger_restored} -> Passed: {modal_full_passed}")
        if not modal_full_passed:
            failures.append(f"Modal accessibility suite failed: wrap={is_first_focused}, restore={resume_exact_trigger_restored}")

        # 1I. Reset Scroll to Top & Capture First-Screen Screenshot
        await page.evaluate("() => window.scrollTo(0, 0)")
        await page.wait_for_timeout(200)
        first_screen_path = os.path.join(ARTIFACT_DIR, "desktop_first_screen_simplified.png")
        await page.screenshot(path=first_screen_path, full_page=False)
        print(f"[SCREENSHOT 1] First Screen saved: {first_screen_path}")

        # 1J. Capture IRS 990 Card & Retail Card
        irs_shot_path = os.path.join(ARTIFACT_DIR, "irs990_showcase_card_after_apple_design.png")
        await irs_card.screenshot(path=irs_shot_path)
        print(f"[SCREENSHOT 2] IRS 990 card saved: {irs_shot_path}")

        retail_card = page.locator("section#projects").locator("text=U.S. Retail Demand Forecasting Engine").locator("xpath=ancestor::div[contains(@class, 'spotlight-card')]").first
        retail_shot_path = os.path.join(ARTIFACT_DIR, "retail_forecast_card_preview.png")
        await retail_card.screenshot(path=retail_shot_path)
        print(f"[SCREENSHOT 3] Retail forecast card saved: {retail_shot_path}")

        # 1K. Intermediate Desktop (1024x768)
        await page.set_viewport_size({"width": 1024, "height": 768})
        await page.wait_for_timeout(200)
        inter_shot = os.path.join(ARTIFACT_DIR, "intermediate_desktop_1024_after_apple_design.png")
        await page.screenshot(path=inter_shot, full_page=True)
        print(f"[SCREENSHOT 4] Intermediate desktop (1024px) saved: {inter_shot}")

        # 1L. Tablet Viewport (768x1024)
        await page.set_viewport_size({"width": 768, "height": 1024})
        await page.wait_for_timeout(200)
        tab_sw = await page.evaluate("() => document.documentElement.scrollWidth")
        tab_passed = tab_sw <= 768
        tablet_shot = os.path.join(ARTIFACT_DIR, "tablet_768_after_apple_design.png")
        await page.screenshot(path=tablet_shot, full_page=True)
        results["tablet_viewport"] = {"scrollWidth": tab_sw, "overflow": tab_sw - 768, "passed": tab_passed}
        print(f"[CHECK 9] Tablet (768px): scrollWidth={tab_sw}, overflow={tab_sw - 768}px -> Passed: {tab_passed}")
        if not tab_passed:
            failures.append(f"Tablet overflow detected: {tab_sw - 768}px")

        # 1M. Mobile Viewport (390x844) & touch-action check
        await page.set_viewport_size({"width": 390, "height": 844})
        await page.wait_for_timeout(250)
        mob_sw = await page.evaluate("() => document.documentElement.scrollWidth")
        mob_passed = mob_sw <= 390
        pipeline_svg = page.locator("svg[viewBox='0 0 380 280']").first
        touch_action = await pipeline_svg.evaluate("el => el.style.touchAction || window.getComputedStyle(el).touchAction")
        touch_action_passed = touch_action == "pan-y"
        mobile_shot = os.path.join(ARTIFACT_DIR, "mobile_390_after_apple_design.png")
        await page.screenshot(path=mobile_shot, full_page=True)
        results["mobile_viewport"] = {
            "scrollWidth": mob_sw,
            "overflow": mob_sw - 390,
            "touchAction": touch_action,
            "passed": mob_passed and touch_action_passed
        }
        print(f"[CHECK 10] Mobile (390px): scrollWidth={mob_sw}, touchAction={touch_action} -> Passed: {mob_passed and touch_action_passed}")
        if not (mob_passed and touch_action_passed):
            failures.append("Mobile viewport check failed")

        # ─────────────────────────────────────────────────────────────
        # 2. Scoped Representative Contrast Audit (Light Theme)
        # ─────────────────────────────────────────────────────────────
        await page.set_viewport_size({"width": 1440, "height": 900})
        await page.evaluate("() => window.scrollTo(0, 0)")
        theme_btn = page.locator("button[aria-label*='Switch to light mode']").first
        if await theme_btn.is_visible():
            await theme_btn.click()
            await page.wait_for_timeout(350)
            
            contrast_audit = await page.evaluate("""() => {
                function colorToRgb(colorStr) {
                    const canvas = document.createElement('canvas');
                    canvas.width = canvas.height = 1;
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = colorStr;
                    ctx.fillRect(0, 0, 1, 1);
                    const d = ctx.getImageData(0, 0, 1, 1).data;
                    return [d[0], d[1], d[2]];
                }

                const results = {};
                const bodyBg = colorToRgb(window.getComputedStyle(document.body).backgroundColor);
                
                // 1. H1 on Page Background
                const h1 = document.querySelector('h1');
                results.h1 = { fg: colorToRgb(window.getComputedStyle(h1).color), bg: bodyBg, label: "H1 Heading on Page Background" };
                
                // 2. Sidebar Subtitle on Page Background
                const sub = document.querySelector('aside h2');
                results.subtitle = { fg: colorToRgb(window.getComputedStyle(sub).color), bg: bodyBg, label: "Sidebar Subtitle on Page Background" };
                
                // 3. Card Title on Card Background
                const card = document.querySelector("section#projects div[class*='spotlight-card']");
                const cardBg = colorToRgb(window.getComputedStyle(card).backgroundColor);
                const cardTitle = card.querySelector('h4');
                results.cardTitle = { fg: colorToRgb(window.getComputedStyle(cardTitle).color), bg: cardBg, label: "Card Title on Card Background" };
                
                // 4. Card Secondary Body Copy on Card Background
                const cardBody = card.querySelector('p.text-zinc-600') || card.querySelectorAll('p')[2];
                results.cardBody = { fg: colorToRgb(window.getComputedStyle(cardBody).color), bg: cardBg, label: "Card Secondary Body Copy on Card Background" };
                
                // 5. Primary CTA Button (Launch Live System)
                const btn = card.querySelector("a[href*='irs990-grant-dashboard']");
                results.ctaButton = { fg: colorToRgb(window.getComputedStyle(btn).color), bg: colorToRgb(window.getComputedStyle(btn).backgroundColor), label: "Primary CTA Button Text on Button Background" };
                
                // 6. Action Link on Card Background
                const buttons = Array.from(card.querySelectorAll('button'));
                const viewLarger = buttons.find(b => b.innerText.includes('View Larger')) || buttons[0];
                results.actionLink = { fg: colorToRgb(window.getComputedStyle(viewLarger).color), bg: cardBg, label: "Action Link Text on Card Background" };
                
                return results;
            }""")

            all_contrast_passed = True
            contrast_details = {}
            for key, item in contrast_audit.items():
                ratio = calculate_contrast_ratio(item["fg"], item["bg"])
                passed = ratio >= 4.5
                contrast_details[key] = {
                    "label": item["label"],
                    "fg": item["fg"],
                    "bg": item["bg"],
                    "ratio": round(ratio, 2),
                    "passed": passed
                }
                if not passed:
                    all_contrast_passed = False
                    failures.append(f"Contrast failure on {item['label']}: ratio {ratio:.2f}:1 < 4.5:1")

            light_shot = os.path.join(ARTIFACT_DIR, "desktop_light_theme.png")
            await page.screenshot(path=light_shot, full_page=False)
            print(f"[SCREENSHOT 5] Light theme first screen saved: {light_shot}")
            results["scoped_contrast_audit"] = {
                "pairs_tested": len(contrast_details),
                "details": contrast_details,
                "passed": all_contrast_passed
            }
            print(f"[CHECK 11] Scoped Representative Contrast Audit (6 pairs): All >= 4.5:1 -> Passed: {all_contrast_passed}")
            for k, d in contrast_details.items():
                print(f"  - {d['label']}: {d['ratio']}:1 (min 4.5:1)")

        # ─────────────────────────────────────────────────────────────
        # 3. 200% Zoom: Container-Aware Stacked Layout
        # ─────────────────────────────────────────────────────────────
        await page.evaluate("() => { document.body.style.zoom = '200%'; }")
        await page.wait_for_timeout(350)
        
        css_zoom_audit = await page.evaluate("""() => {
            const h1 = document.querySelector('h1');
            const aside = document.querySelector('aside');
            const grid = document.querySelector('.portfolio-grid-layout');
            const h1Rect = h1.getBoundingClientRect();
            const h1Tokens = Array.from(h1.querySelectorAll('span')).map(s => s.innerText.trim());
            return {
                h1_text: h1.innerText,
                h1_tokens: h1Tokens,
                h1_x: h1Rect.left,
                h1_width: h1Rect.width,
                grid_flexDirection: window.getComputedStyle(grid).flexDirection,
                viewport_width: window.innerWidth
            };
        }""")
        
        zoom_shot = os.path.join(ARTIFACT_DIR, "desktop_200_zoom.png")
        await page.screenshot(path=zoom_shot, full_page=False)
        print(f"[SCREENSHOT 6] 200% Zoom screenshot saved: {zoom_shot}")
        await page.evaluate("() => { document.body.style.zoom = '100%'; }")

        css_zoom_passed = (
            css_zoom_audit["grid_flexDirection"] == "column" and
            css_zoom_audit["h1_tokens"] == ["Akshay", "Kumar"] and
            css_zoom_audit["h1_x"] >= 0 and
            (css_zoom_audit["h1_x"] + css_zoom_audit["h1_width"]) <= css_zoom_audit["viewport_width"]
        )
        results["css_zoom_200_stacked"] = {
            "flexDirection": css_zoom_audit["grid_flexDirection"],
            "h1_tokens": css_zoom_audit["h1_tokens"],
            "h1_bounds": {"x": css_zoom_audit["h1_x"], "width": css_zoom_audit["h1_width"]},
            "passed": css_zoom_passed
        }
        print(f"[CHECK 12] CSS Zoom 200% Stacked Layout: flexDirection='{css_zoom_audit['grid_flexDirection']}', tokens={css_zoom_audit['h1_tokens']} -> Passed: {css_zoom_passed}")
        if not css_zoom_passed:
            failures.append(f"CSS Zoom 200% check failed: {css_zoom_audit}")

        await browser.close()

        # ─────────────────────────────────────────────────────────────
        # 4. Narrow-Viewport Reflow Simulation (640px / 2x DPR)
        # ─────────────────────────────────────────────────────────────
        reflow_context = await p.chromium.launch(headless=True)
        reflow_page = await (await reflow_context.new_context(
            viewport={"width": 640, "height": 400},
            device_scale_factor=2,
            color_scheme="dark"
        )).new_page()
        await reflow_page.goto(BASE_URL, wait_until="networkidle")

        reflow_audit = await reflow_page.evaluate("""() => {
            const doc = document.documentElement;
            const h1 = document.querySelector('h1');
            const h1Rect = h1.getBoundingClientRect();
            const navLinks = document.querySelectorAll("nav[aria-label='Primary page navigation'] a");
            return {
                scrollWidth: doc.scrollWidth,
                clientWidth: doc.clientWidth,
                h1_text: h1.innerText,
                h1_x: h1Rect.left,
                h1_width: h1Rect.width,
                nav_count: navLinks.length
            };
        }""")
        reflow_passed = (
            reflow_audit["scrollWidth"] <= (reflow_audit["clientWidth"] + 1) and
            reflow_audit["h1_x"] >= 0 and
            "Akshay Kumar" in reflow_audit["h1_text"] and
            reflow_audit["nav_count"] == 6
        )
        results["narrow_viewport_reflow_simulation"] = {
            "scrollWidth": reflow_audit["scrollWidth"],
            "clientWidth": reflow_audit["clientWidth"],
            "h1_x": reflow_audit["h1_x"],
            "nav_count": reflow_audit["nav_count"],
            "simulation_note": "Narrow-viewport reflow simulation under 2x device pixel ratio (WCAG 1.4.10 200% reflow equivalent on 1280px display)",
            "passed": reflow_passed
        }
        print(f"[CHECK 13] Narrow-Viewport Reflow Simulation (640px / 2x DPR): scrollWidth={reflow_audit['scrollWidth']}, clientWidth={reflow_audit['clientWidth']}, H1_x={reflow_audit['h1_x']:.1f} -> Passed: {reflow_passed}")
        if not reflow_passed:
            failures.append(f"Narrow-viewport reflow simulation failed: {reflow_audit}")
        await reflow_context.close()

        # ─────────────────────────────────────────────────────────────
        # 5. Strengthened Reduced-Motion vs Ordinary-Motion Comparison
        # ─────────────────────────────────────────────────────────────
        motion_browser = await p.chromium.launch(headless=True)
        
        # 5A. Ordinary motion baseline (verify transform scaling occurs)
        norm_page = await (await motion_browser.new_context(
            reduced_motion="no-preference",
            viewport={"width": 1440, "height": 900}
        )).new_page()
        await norm_page.goto(BASE_URL, wait_until="networkidle")
        await norm_page.locator("button:has-text('View Larger')").first.click()
        await norm_page.wait_for_timeout(25)
        norm_transform = await norm_page.evaluate("""() => {
            const modal = document.querySelector("div[role='dialog'][aria-label*='preview'] > div:nth-child(2)");
            return modal ? window.getComputedStyle(modal).transform : null;
        }""")
        ordinary_motion_detected = norm_transform and norm_transform != "none"

        # 5B. Reduced-motion verification (verify transform scaling NEVER occurs during opening or exit)
        rm_page = await (await motion_browser.new_context(
            reduced_motion="reduce",
            viewport={"width": 1440, "height": 900}
        )).new_page()
        await rm_page.goto(BASE_URL, wait_until="networkidle")
        matches_rm = await rm_page.evaluate("() => window.matchMedia('(prefers-reduced-motion: reduce)').matches")
        
        await rm_page.locator("button:has-text('View Larger')").first.click()
        
        # Opening samples: require element to strictly exist AND be visible; assert transform === 'none'. Reject None/null!
        opening_samples = []
        for ms in [25, 50, 100]:
            await rm_page.wait_for_timeout(ms)
            sample = await rm_page.evaluate("""() => {
                const dialog = document.querySelector("div[role='dialog'][aria-label*='preview']");
                const modalContent = dialog ? dialog.querySelector("div:nth-child(2)") : null;
                if (!dialog || !modalContent) return { exists: false, visible: false, transform: null };
                const cs = window.getComputedStyle(modalContent);
                const rect = modalContent.getBoundingClientRect();
                const visible = rect.width > 0 && rect.height > 0 && cs.visibility !== 'hidden';
                return { exists: true, visible: visible, transform: cs.transform };
            }""")
            opening_samples.append((ms, sample))

        # Check: Every opening sample MUST have exists=True, visible=True, and transform='none'
        all_opening_valid = all(
            s[1]["exists"] is True and s[1]["visible"] is True and s[1]["transform"] == "none"
            for s in opening_samples
        )
        
        # Test Exit: trigger Escape to close dialog
        await rm_page.keyboard.press("Escape")
        await rm_page.wait_for_timeout(350)
        
        # Distinguish a properly unmounted dialog from a failed selector:
        exit_audit = await rm_page.evaluate("""() => {
            const dialogInDom = document.querySelector("div[role='dialog'][aria-label*='preview']");
            const buttons = Array.from(document.querySelectorAll("button"));
            const triggerInDom = buttons.find(b => b.innerText.includes('View Larger'));
            const activeElementIsTrigger = document.activeElement && document.activeElement.innerText.includes('View Larger');
            return {
                dialog_unmounted: dialogInDom === null,
                trigger_element_exists: Boolean(triggerInDom),
                active_element_is_trigger: Boolean(activeElementIsTrigger)
            };
        }""")
        
        exit_properly_unmounted = (
            exit_audit["dialog_unmounted"] is True and
            exit_audit["trigger_element_exists"] is True and
            exit_audit["active_element_is_trigger"] is True
        )
        
        reduced_motion_comparative_passed = (
            ordinary_motion_detected and
            matches_rm and
            all_opening_valid and
            exit_properly_unmounted
        )
        
        results["reduced_motion_comparative_audit"] = {
            "ordinary_motion_has_transform": ordinary_motion_detected,
            "ordinary_sample_at_25ms": norm_transform,
            "reduced_motion_media_match": matches_rm,
            "opening_samples": opening_samples,
            "all_opening_valid": all_opening_valid,
            "exit_audit": exit_audit,
            "exit_properly_unmounted": exit_properly_unmounted,
            "passed": reduced_motion_comparative_passed
        }
        print(f"[CHECK 14] Strengthened Motion Comparison: OrdinaryTransformDetected={ordinary_motion_detected} ('{norm_transform}'), OpeningSamplesAllNone={all_opening_valid}, ExitUnmounted={exit_properly_unmounted} -> Passed: {reduced_motion_comparative_passed}")
        if not reduced_motion_comparative_passed:
            failures.append("Reduced-motion comparative audit failed: opening transform not none or exit not unmounted")
            
        await motion_browser.close()

    print("\n" + "=" * 75)
    print("VERIFICATION SUITE SUMMARY")
    print("=" * 75)
    print(f"Total Verified Checks: {len(results)}")
    print(f"Failures: {len(failures)}")
    if failures:
        print("FAILURES DETECTED:")
        for f in failures:
            print(f" - {f}")
        sys.exit(1)
    else:
        print("ALL FALSIFIABLE ASSERTIONS PASSED WITH 100% ACCURACY")
        print("=" * 75)

if __name__ == "__main__":
    asyncio.run(run_audit())
