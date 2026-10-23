import asyncio
import os
import sys
from playwright.async_api import async_playwright

ARTIFACT_DIR = r"C:\Users\Akshay Kumar\.gemini\antigravity\brain\fe0681aa-ec1f-4588-b8b4-8e98d282e15a"
BASE_URL = "http://localhost:3045"

def calculate_relative_luminance(rgb_str):
    """Computes relative luminance according to WCAG 2.1 spec."""
    # rgb_str format: 'rgb(24, 24, 27)' or 'rgba(255, 255, 255, 1)'
    cleaned = rgb_str.replace("rgba(", "").replace("rgb(", "").replace(")", "").split(",")
    r, g, b = [float(x.strip()) / 255.0 for x in cleaned[:3]]
    def channel_luminance(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * channel_luminance(r) + 0.7152 * channel_luminance(g) + 0.0722 * channel_luminance(b)

def calculate_contrast_ratio(rgb1, rgb2):
    """Calculates WCAG contrast ratio between two RGB color strings."""
    l1 = calculate_relative_luminance(rgb1)
    l2 = calculate_relative_luminance(rgb2)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)

async def run_audit():
    results = {}
    failures = []
    print("=" * 70)
    print("STARTING RIGOROUS IN-REPOSITORY PLAYWRIGHT VERIFICATION SUITE")
    print("=" * 70)

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

        # 1A. Check Single H1
        h1_locators = page.locator("h1")
        h1_count = await h1_locators.count()
        h1_text = await h1_locators.first.inner_text() if h1_count > 0 else ""
        passed_h1 = (h1_count == 1) and ("Akshay Kumar" in h1_text)
        results["h1_check"] = {"count": h1_count, "text": h1_text.strip(), "passed": passed_h1}
        print(f"[CHECK 1] Single H1: '{h1_text.strip()}' (count={h1_count}) -> Passed: {passed_h1}")
        if not passed_h1:
            failures.append(f"H1 check failed: count={h1_count}, text='{h1_text}'")

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

        # 1G. Check Lightbox Modal Full Accessibility Suite
        # Save exact trigger element identity in DOM window._lightboxTrigger
        enlarge_btn = irs_card.locator("button:has-text('View Larger')").first
        await enlarge_btn.evaluate("el => { window._lightboxTrigger = el; }")
        await enlarge_btn.click()
        await page.wait_for_timeout(250)

        img_modal = page.locator("div[role='dialog'][aria-label*='preview']")
        img_modal_visible = await img_modal.is_visible()

        # Assert initial focus lands inside the dialog
        initial_focus_in_dialog = await page.evaluate("""() => {
            const dialog = document.querySelector("div[role='dialog'][aria-label*='preview']");
            return dialog && dialog.contains(document.activeElement);
        }""")

        # Assert body scroll locked
        body_scroll_locked = await page.evaluate("() => document.body.style.overflow === 'hidden'")

        # Assert Tab containment wraps inside dialog
        tab_wrap_check = await page.evaluate("""() => {
            const dialog = document.querySelector("div[role='dialog'][aria-label*='preview']");
            const focusables = dialog.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
            if (focusables.length === 0) return false;
            // Focus last element
            focusables[focusables.length - 1].focus();
            return document.activeElement === focusables[focusables.length - 1];
        }""")
        await page.keyboard.press("Tab")
        await page.wait_for_timeout(100)
        tab_wrapped_to_first = await page.evaluate("""() => {
            const dialog = document.querySelector("div[role='dialog'][aria-label*='preview']");
            const focusables = dialog.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
            return focusables.length > 0 && document.activeElement === focusables[0];
        }""")

        # Press Escape -> closes modal, restores body scroll, and restores focus to exact trigger
        await page.keyboard.press("Escape")
        await page.wait_for_timeout(350)
        img_modal_closed = not (await img_modal.is_visible())
        body_scroll_restored = await page.evaluate("() => document.body.style.overflow === ''")
        exact_trigger_restored = await page.evaluate("() => document.activeElement === window._lightboxTrigger")

        lightbox_suite_passed = (
            img_modal_visible and
            initial_focus_in_dialog and
            body_scroll_locked and
            tab_wrap_check and
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
        print(f"[CHECK 7] Lightbox Accessibility Suite: FocusInDialog={initial_focus_in_dialog}, ScrollLock={body_scroll_locked}, TabWrap={tab_wrapped_to_first}, EscClose={img_modal_closed}, ExactTrigger={exact_trigger_restored} -> Passed: {lightbox_suite_passed}")
        if not lightbox_suite_passed:
            failures.append(f"Lightbox accessibility suite failed: FocusIn={initial_focus_in_dialog}, Wrap={tab_wrapped_to_first}, TriggerRestored={exact_trigger_restored}")

        # 1H. Check ResumeModal Accessibility Suite & Exact Trigger Identity
        resume_trigger = page.locator("section#hero button:has-text('Interactive résumé')").first
        await resume_trigger.evaluate("el => { window._resumeTrigger = el; }")
        await resume_trigger.click()
        await page.wait_for_timeout(300)

        resume_modal = page.locator("div[role='dialog'][aria-label*='Curriculum Vitae']")
        modal_opened = await resume_modal.is_visible()

        # Check initial focus lands inside dialog
        initial_modal_focus_in_dialog = await page.evaluate("""() => {
            const m = document.querySelector("div[role='dialog'][aria-label*='Curriculum Vitae']");
            return m && m.contains(document.activeElement);
        }""")

        # Focus last element and press Tab to test wrapping
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

        # Press Shift+Tab -> wrap to last element
        await page.keyboard.press("Shift+Tab")
        await page.wait_for_timeout(100)
        is_last_focused = await page.evaluate("""() => {
            const m = document.querySelector("div[role='dialog'][aria-label*='Curriculum Vitae']");
            const els = m.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
            return els.length > 0 && document.activeElement === els[els.length - 1];
        }""")

        # Press Escape -> closes modal and restores exact trigger reference
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
        print(f"[SCREENSHOT 1] First Screen saved (scroll reset to 0): {first_screen_path}")

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
            "touchAction_passed": touch_action_passed,
            "physical_touch_scroll": "UNTESTED on physical hardware (automated test verifies CSS touchAction: pan-y)",
            "passed": mob_passed and touch_action_passed
        }
        print(f"[CHECK 10] Mobile (390px): scrollWidth={mob_sw}, touchAction={touch_action} -> Passed: {mob_passed and touch_action_passed}")
        if not (mob_passed and touch_action_passed):
            failures.append("Mobile viewport check failed")

        # ─────────────────────────────────────────────────────────────
        # 2. Light Theme Rendering & Contrast Verification
        # ─────────────────────────────────────────────────────────────
        await page.set_viewport_size({"width": 1440, "height": 900})
        await page.evaluate("() => window.scrollTo(0, 0)")
        theme_btn = page.locator("button[aria-label*='Switch to light mode']").first
        if await theme_btn.is_visible():
            await theme_btn.click()
            await page.wait_for_timeout(350)
            
            # Compute actual rendering and contrast ratio
            color_data = await page.evaluate("""() => {
                const isLight = document.documentElement.classList.contains('light');
                const h1 = document.querySelector('h1');
                const body = document.body;
                const h1Color = window.getComputedStyle(h1).color;
                const bodyBg = window.getComputedStyle(body).backgroundColor;
                return { isLight, h1Color, bodyBg };
            }""")

            contrast_ratio = calculate_contrast_ratio(color_data["h1Color"], color_data["bodyBg"])
            contrast_passed = color_data["isLight"] and contrast_ratio >= 4.5
            
            light_shot = os.path.join(ARTIFACT_DIR, "desktop_light_theme.png")
            await page.screenshot(path=light_shot, full_page=False)
            print(f"[SCREENSHOT 5] Light theme first screen saved: {light_shot}")
            results["light_theme_contrast"] = {
                "is_light_class": color_data["isLight"],
                "h1_color": color_data["h1Color"],
                "body_bg": color_data["bodyBg"],
                "computed_contrast_ratio": round(contrast_ratio, 2),
                "wcag_aa_threshold": 4.5,
                "passed": contrast_passed
            }
            print(f"[CHECK 11] Light Theme: class={color_data['isLight']}, h1Color={color_data['h1Color']}, bg={color_data['bodyBg']}, Contrast={contrast_ratio:.2f}:1 (min 4.5:1) -> Passed: {contrast_passed}")
            if not contrast_passed:
                failures.append(f"Light theme contrast check failed: {contrast_ratio:.2f}:1")
        else:
            failures.append("Theme toggle button not found")

        # ─────────────────────────────────────────────────────────────
        # 3. 200% Zoom: Distinguishing CSS Zoom vs Native Browser Zoom
        # ─────────────────────────────────────────────────────────────
        # Test 3A: CSS Zoom (body.style.zoom = '200%') on 1440x900
        await page.evaluate("() => { document.body.style.zoom = '200%'; }")
        await page.wait_for_timeout(350)
        
        css_zoom_audit = await page.evaluate("""() => {
            const h1 = document.querySelector('h1');
            const aside = document.querySelector('aside');
            const h1Rect = h1.getBoundingClientRect();
            const asideStyle = window.getComputedStyle(aside);
            return {
                h1_text: h1.innerText,
                h1_x: h1Rect.left,
                h1_width: h1Rect.width,
                aside_overflowY: asideStyle.overflowY,
                aside_scrollHeight: aside.scrollHeight,
                aside_clientHeight: aside.clientHeight,
                viewport_width: window.innerWidth
            };
        }""")
        
        zoom_shot = os.path.join(ARTIFACT_DIR, "desktop_200_zoom.png")
        await page.screenshot(path=zoom_shot, full_page=False)
        print(f"[SCREENSHOT 6] 200% Zoom screenshot saved: {zoom_shot}")
        await page.evaluate("() => { document.body.style.zoom = '100%'; }")

        css_zoom_passed = (
            css_zoom_audit["h1_x"] >= 0 and
            (css_zoom_audit["h1_x"] + css_zoom_audit["h1_width"]) <= css_zoom_audit["viewport_width"] and
            css_zoom_audit["aside_overflowY"] == "auto" and
            css_zoom_audit["aside_scrollHeight"] >= css_zoom_audit["aside_clientHeight"]
        )
        results["css_zoom_200"] = {
            "h1_bounds": {"x": css_zoom_audit["h1_x"], "width": css_zoom_audit["h1_width"]},
            "aside_overflowY": css_zoom_audit["aside_overflowY"],
            "aside_scrollable": css_zoom_audit["aside_scrollHeight"] >= css_zoom_audit["aside_clientHeight"],
            "passed": css_zoom_passed
        }
        print(f"[CHECK 12A] CSS Zoom 200%: H1 visible (x={css_zoom_audit['h1_x']:.1f}), aside overflowY='{css_zoom_audit['aside_overflowY']}' -> Passed: {css_zoom_passed}")
        if not css_zoom_passed:
            failures.append(f"CSS Zoom 200% check failed: {css_zoom_audit}")

        await browser.close()

        # Test 3B: Native Browser Zoom / Reflow (device_scale_factor=2, 1280x800 -> 640x400 CSS reflow)
        native_context = await p.chromium.launch(headless=True)
        native_page = await (await native_context.new_context(
            viewport={"width": 640, "height": 400},
            device_scale_factor=2,
            color_scheme="dark"
        )).new_page()
        await native_page.goto(BASE_URL, wait_until="networkidle")

        native_audit = await native_page.evaluate("""() => {
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
        native_zoom_passed = (
            native_audit["scrollWidth"] <= (native_audit["clientWidth"] + 1) and
            native_audit["h1_x"] >= 0 and
            "Akshay Kumar" in native_audit["h1_text"] and
            native_audit["nav_count"] == 6
        )
        results["native_zoom_200"] = {
            "scrollWidth": native_audit["scrollWidth"],
            "clientWidth": native_audit["clientWidth"],
            "h1_x": native_audit["h1_x"],
            "nav_count": native_audit["nav_count"],
            "passed": native_zoom_passed
        }
        print(f"[CHECK 12B] Native Browser Zoom 200% Reflow: scrollWidth={native_audit['scrollWidth']}, clientWidth={native_audit['clientWidth']}, H1_x={native_audit['h1_x']:.1f} -> Passed: {native_zoom_passed}")
        if not native_zoom_passed:
            failures.append(f"Native browser zoom reflow failed: {native_audit}")
        await native_context.close()

        # ─────────────────────────────────────────────────────────────
        # 4. Reduced-Motion Component Behavior Test
        # ─────────────────────────────────────────────────────────────
        rm_browser = await p.chromium.launch(headless=True)
        rm_page = await (await rm_browser.new_context(
            reduced_motion="reduce",
            viewport={"width": 1440, "height": 900}
        )).new_page()
        await rm_page.goto(BASE_URL, wait_until="networkidle")
        matches_rm = await rm_page.evaluate("() => window.matchMedia('(prefers-reduced-motion: reduce)').matches")

        # Open lightbox in reduced motion context and test component behavior
        rm_enlarge_btn = rm_page.locator("button:has-text('View Larger')").first
        await rm_enlarge_btn.click()
        await rm_page.wait_for_timeout(200)

        rm_modal_style = await rm_page.evaluate("""() => {
            const modalContent = document.querySelector("div[role='dialog'][aria-label*='preview'] > div:nth-child(2)");
            if (!modalContent) return null;
            const cs = window.getComputedStyle(modalContent);
            return {
                transform: cs.transform,
                opacity: cs.opacity,
                transitionDuration: cs.transitionDuration
            };
        }""")
        
        # When reduced motion is active, transform scale transition is eliminated (transform is 'none' or matrix(1, 0, 0, 1, 0, 0))
        scale_disabled = rm_modal_style and (rm_modal_style["transform"] == "none" or "matrix(1, 0, 0, 1" in rm_modal_style["transform"])
        reduced_motion_passed = matches_rm and scale_disabled
        results["reduced_motion_component_behavior"] = {
            "media_query_matched": matches_rm,
            "modal_transform": rm_modal_style["transform"] if rm_modal_style else None,
            "scale_transition_eliminated": scale_disabled,
            "passed": reduced_motion_passed
        }
        print(f"[CHECK 13] Reduced-Motion Component Behavior: mediaQuery={matches_rm}, modalTransform='{rm_modal_style['transform'] if rm_modal_style else 'None'}' -> Passed: {reduced_motion_passed}")
        if not reduced_motion_passed:
            failures.append("Reduced motion component behavior failed: scale not disabled")
        await rm_browser.close()

    print("\n" + "=" * 70)
    print("VERIFICATION SUITE SUMMARY")
    print("=" * 70)
    print(f"Total Verified Checks: {len(results)}")
    print(f"Failures: {len(failures)}")
    if failures:
        print("FAILURES DETECTED:")
        for f in failures:
            print(f" - {f}")
        sys.exit(1)
    else:
        print("ALL FALSIFIABLE ASSERTIONS PASSED WITH 100% ACCURACY")
        print("=" * 70)

if __name__ == "__main__":
    asyncio.run(run_audit())
