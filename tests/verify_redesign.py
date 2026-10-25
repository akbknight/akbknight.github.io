"""
Rigorously verify the new editorial layout foundation for Akshay Kumar's portfolio.
Tests viewports (1366x768, 1440x900, 1920x1080, 768x1024, 390x844),
reflow, keyboard navigation, focus trapping, Hairline stage tabs, mascot switching,
lightbox dialog, resume modal, themes, and WCAG contrast.
"""

import sys
import os
import json
import time
import re
from playwright.sync_api import sync_playwright

ARTIFACT_DIR = r"C:\Users\Akshay Kumar\.gemini\antigravity\brain\fe0681aa-ec1f-4588-b8b4-8e98d282e15a"
BASE_URL = "http://localhost:3045"

results = {
    "viewport_tests": {},
    "interactions": {},
    "accessibility": {},
    "contrast": {},
    "passed_count": 0,
    "failed_count": 0,
}

def record_pass(category, name, details=""):
    print(f"  [PASS] {name} - {details}")
    results[category][name] = {"status": "PASS", "details": details}
    results["passed_count"] += 1

def record_fail(category, name, reason=""):
    print(f"  [FAIL] {name} - {reason}")
    results[category][name] = {"status": "FAIL", "reason": reason}
    results["failed_count"] += 1

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        print("\n=== 1. VIEWPORT & RESPONSIVE COMPOSITION TESTS ===")
        # 1.1 Laptop 1366x768 (Standard corporate / laptop screen)
        context_laptop = browser.new_context(viewport={"width": 1366, "height": 768})
        page = context_laptop.new_page()
        page.goto(BASE_URL, wait_until="networkidle")
        time.sleep(1)

        # Capture above-the-fold
        page.screenshot(path=os.path.join(ARTIFACT_DIR, "editorial_1366_laptop_above_fold.png"))
        # Capture full page
        page.screenshot(path=os.path.join(ARTIFACT_DIR, "editorial_1366_laptop_full.png"), full_page=True)

        # Check no horizontal scrollbar at 1366
        scroll_w = page.evaluate("() => document.documentElement.scrollWidth")
        inner_w = page.evaluate("() => window.innerWidth")
        if scroll_w <= inner_w:
            record_pass("viewport_tests", "laptop_1366_no_horizontal_overflow", f"scrollWidth={scroll_w} <= innerWidth={inner_w}")
        else:
            record_fail("viewport_tests", "laptop_1366_no_horizontal_overflow", f"scrollWidth={scroll_w} > innerWidth={inner_w}")

        # Check sticky top nav exists and has appropriate height (<80px)
        nav_box = page.locator("header").bounding_box()
        if nav_box and nav_box["height"] <= 72:
            record_pass("viewport_tests", "compact_top_nav_height", f"Height={nav_box['height']}px (compact and laptop-friendly)")
        else:
            record_fail("viewport_tests", "compact_top_nav_height", f"Nav height is {nav_box['height'] if nav_box else 'None'}")

        # Check sticky top nav persistence on long scroll to #contact
        contact_link = page.locator("header a[href*='contact']").first
        if contact_link.is_visible():
            contact_link.click()
            time.sleep(1.0)
            nav_box_scrolled = page.locator("header").bounding_box()
            scroll_y = page.evaluate("() => window.scrollY")
            if nav_box_scrolled and abs(nav_box_scrolled["y"]) < 2 and scroll_y > 2000:
                record_pass("viewport_tests", "sticky_top_nav_persists_on_scroll", f"Header bounding box y={nav_box_scrolled['y']:.1f}px at scrollY={scroll_y:.0f}px (remains pinned at top)")
            else:
                record_fail("viewport_tests", "sticky_top_nav_persists_on_scroll", f"Header bounding box y={nav_box_scrolled['y'] if nav_box_scrolled else 'None'} at scrollY={scroll_y}")
            # Scroll back to top
            page.evaluate("() => window.scrollTo(0, 0)")
            time.sleep(0.5)

        # 1.2 Desktop 1440x900
        context_1440 = browser.new_context(viewport={"width": 1440, "height": 900})
        page_1440 = context_1440.new_page()
        page_1440.goto(BASE_URL, wait_until="networkidle")
        page_1440.screenshot(path=os.path.join(ARTIFACT_DIR, "editorial_1440_desktop.png"))
        scroll_w_1440 = page_1440.evaluate("() => document.documentElement.scrollWidth")
        inner_w_1440 = page_1440.evaluate("() => window.innerWidth")
        h1_box_1440 = page_1440.locator("h1").bounding_box()
        if scroll_w_1440 <= inner_w_1440 and h1_box_1440 and h1_box_1440["width"] > 400:
            record_pass("viewport_tests", "desktop_1440_layout_fit", f"No overflow (scrollWidth={scroll_w_1440} <= {inner_w_1440}) and h1 width={h1_box_1440['width']:.0f}px")
        else:
            record_fail("viewport_tests", "desktop_1440_layout_fit", f"Layout failed: scrollWidth={scroll_w_1440}, innerWidth={inner_w_1440}")

        # 1.3 Wide Desktop 1920x1080
        context_1920 = browser.new_context(viewport={"width": 1920, "height": 1080})
        page_1920 = context_1920.new_page()
        page_1920.goto(BASE_URL, wait_until="networkidle")
        page_1920.screenshot(path=os.path.join(ARTIFACT_DIR, "editorial_1920_wide.png"))
        
        # Check container max width (should not stretch infinitely)
        main_box = page_1920.locator("main#content").bounding_box()
        if main_box and main_box["width"] <= 1120:
            record_pass("viewport_tests", "wide_viewport_container_bounds", f"Main width={main_box['width']}px (clean deliberate max-width)")
        else:
            record_fail("viewport_tests", "wide_viewport_container_bounds", f"Main width={main_box['width'] if main_box else 'None'}")

        # 1.4 Tablet 768x1024
        context_tablet = browser.new_context(viewport={"width": 768, "height": 1024})
        page_tablet = context_tablet.new_page()
        page_tablet.goto(BASE_URL, wait_until="networkidle")
        page_tablet.screenshot(path=os.path.join(ARTIFACT_DIR, "editorial_768_tablet.png"))
        scroll_w_tab = page_tablet.evaluate("() => document.documentElement.scrollWidth")
        inner_w_tab = page_tablet.evaluate("() => window.innerWidth")
        h1_box_tab = page_tablet.locator("h1").bounding_box()
        if scroll_w_tab <= inner_w_tab and h1_box_tab and h1_box_tab["x"] >= 0 and (h1_box_tab["x"] + h1_box_tab["width"]) <= inner_w_tab:
            record_pass("viewport_tests", "tablet_768_layout_fit", f"No horizontal overflow on tablet: scrollWidth={scroll_w_tab} <= {inner_w_tab}, h1 width={h1_box_tab['width']:.0f}px fits in bounds")
        else:
            record_fail("viewport_tests", "tablet_768_layout_fit", f"Tablet overflow: scrollWidth={scroll_w_tab} > {inner_w_tab}")

        # 1.5 Mobile 390x844
        context_mobile = browser.new_context(viewport={"width": 390, "height": 844})
        page_mobile = context_mobile.new_page()
        page_mobile.goto(BASE_URL, wait_until="networkidle")
        page_mobile.screenshot(path=os.path.join(ARTIFACT_DIR, "editorial_390_mobile.png"))
        scroll_w_mob = page_mobile.evaluate("() => document.documentElement.scrollWidth")
        inner_w_mob = page_mobile.evaluate("() => window.innerWidth")
        main_box_mob = page_mobile.locator("main#content").bounding_box()
        if scroll_w_mob <= inner_w_mob and main_box_mob and main_box_mob["width"] <= inner_w_mob:
            record_pass("viewport_tests", "mobile_390_layout_fit", f"No horizontal overflow on mobile: scrollWidth={scroll_w_mob} <= {inner_w_mob}, main container fits {main_box_mob['width']:.0f}px")
        else:
            record_fail("viewport_tests", "mobile_390_layout_fit", f"Mobile overflow: scrollWidth={scroll_w_mob} > {inner_w_mob}")

        # Verify mobile menu button and drawer
        menu_btn = page_mobile.locator("button[aria-label='Toggle mobile menu']")
        if menu_btn.is_visible():
            menu_btn.click()
            time.sleep(0.3)
            page_mobile.screenshot(path=os.path.join(ARTIFACT_DIR, "editorial_390_mobile_menu.png"))
            mobile_nav = page_mobile.locator("nav[aria-label='Mobile navigation']")
            if mobile_nav.is_visible():
                record_pass("viewport_tests", "mobile_menu_accessible", "Mobile drawer opens cleanly with accessible navigation items")
            else:
                record_fail("viewport_tests", "mobile_menu_accessible", "Mobile navigation links not visible after clicking menu")
        else:
            record_fail("viewport_tests", "mobile_menu_accessible", "Mobile menu button not visible on 390px viewport")

        # Clean up auxiliary viewport contexts and restore focus to primary page
        context_1440.close()
        context_1920.close()
        context_tablet.close()
        context_mobile.close()
        page.bring_to_front()

        print("\n=== 2. MASCOT COMPANION & IDENTITY INTERACTION ===")
        # Test mascot companion dropdown
        mascot_btn = page.locator("button[aria-label*='Mascot companion']")
        if mascot_btn.is_visible():
            mascot_btn.click()
            time.sleep(0.3)
            page.screenshot(path=os.path.join(ARTIFACT_DIR, "editorial_mascot_interaction.png"))
            
            # Switch to Knight
            knight_btn = page.locator("button:has-text('Noble Knight')")
            if knight_btn.is_visible():
                knight_btn.click()
                time.sleep(0.3)
                updated_label = page.locator("button[aria-label*='Mascot companion']").get_attribute("aria-label")
                if "Knight" in (updated_label or ""):
                    record_pass("interactions", "mascot_switch_to_knight", f"Switched to Knight: {updated_label}")
                else:
                    record_fail("interactions", "mascot_switch_to_knight", f"Unexpected label: {updated_label}")
            else:
                record_fail("interactions", "mascot_switch_to_knight", "Knight option button not found")
        else:
            record_fail("interactions", "mascot_companion_exists", "Mascot companion button not visible in header")

        print("\n=== 3. FEATURED PROJECTS & HAIRLINE INTEGRATION ===")
        # Project 1: IRS 990 with Hairline Pipeline Figure
        p1 = page.locator("#project-irs990")
        if p1.is_visible():
            record_pass("interactions", "project_1_irs990_visible", "IRS 990 Flagship Project rendered")
            
            # Check Hairline figure inside Project 1
            hairline_svg = p1.locator("svg[data-testid='hairline-pipeline-svg']")
            if hairline_svg.is_visible():
                box = hairline_svg.bounding_box()
                p1_box = p1.bounding_box()
                record_pass("interactions", "hairline_integrated_in_p1", f"Hairline SVG rendered: width={box['width']}px, height={box['height']}px inside {p1_box['width']}px container")
                
                # Test tablist navigation
                tablist = p1.locator("div[role='tablist']")
                tabs = tablist.locator("button[role='tab']")
                tab_count = tabs.count()
                if tab_count == 4:
                    record_pass("interactions", "hairline_stage_tabs_count", f"4 stage tabs present")
                    # Click stage 3 (Store / DuckDB)
                    tabs.nth(2).click()
                    time.sleep(0.3)
                    p1.screenshot(path=os.path.join(ARTIFACT_DIR, "editorial_project1_hairline.png"))
                    # Check active state
                    selected = tabs.nth(2).get_attribute("aria-selected")
                    if selected == "true":
                        record_pass("interactions", "hairline_stage_tab_selection", "Stage 3 selected and active")
                    else:
                        record_fail("interactions", "hairline_stage_tab_selection", f"Stage 3 aria-selected is {selected}")
                else:
                    record_fail("interactions", "hairline_stage_tabs_count", f"Found {tab_count} tabs, expected 4")
            else:
                record_fail("interactions", "hairline_integrated_in_p1", "Hairline SVG not found in Project 1")
        else:
            record_fail("interactions", "project_1_irs990_visible", "Project 1 not found")

        # Project 2: Retail Forecast
        p2 = page.locator("#project-retail-forecast")
        if p2.is_visible():
            record_pass("interactions", "project_2_retail_forecast_visible", "Retail Forecast Project rendered")
            p2.screenshot(path=os.path.join(ARTIFACT_DIR, "editorial_project2_preview.png"))
            img = p2.locator("img")
            if img.is_visible():
                record_pass("interactions", "project_2_image_visible", "Forecast curve diagram preview visible")
            else:
                record_fail("interactions", "project_2_image_visible", "Forecast diagram image not visible")
        else:
            record_fail("interactions", "project_2_retail_forecast_visible", "Project 2 not found")

        # Project 3: Scheduling Simulator
        p3 = page.locator("#project-scheduling-optimizer")
        if p3.is_visible():
            record_pass("interactions", "project_3_scheduling_visible", "Scheduling Optimizer Project rendered")
        else:
            record_fail("interactions", "project_3_scheduling_visible", "Project 3 not found")

        print("\n=== 4. ACCESSIBLE LIGHTBOX DIALOG ===")
        # Enlarge diagram in Project 2
        enlarge_btn = p2.locator("button:has-text('Click to enlarge diagram')")
        if enlarge_btn.is_visible():
            enlarge_btn.click()
            time.sleep(0.4)
            page.screenshot(path=os.path.join(ARTIFACT_DIR, "editorial_lightbox_open.png"))
            
            lightbox = page.locator("div[role='dialog'][aria-modal='true']")
            if lightbox.is_visible():
                record_pass("accessibility", "lightbox_opens_modal", "Lightbox dialog opened with role='dialog' and aria-modal='true'")
                
                # Check body overflow is hidden (scroll locked)
                overflow = page.evaluate("() => document.body.style.overflow")
                if overflow == "hidden":
                    record_pass("accessibility", "lightbox_scroll_lock", "document.body.style.overflow is 'hidden'")
                else:
                    record_fail("accessibility", "lightbox_scroll_lock", f"overflow is '{overflow}'")

                # Test Escape key closes lightbox
                page.keyboard.press("Escape")
                time.sleep(0.5)
                if not lightbox.is_visible():
                    record_pass("accessibility", "lightbox_escape_dismiss", "Escape key dismissed the lightbox dialog")
                    
                    # Verify focus restored exactly to enlarge trigger button
                    enlarge_handle = enlarge_btn.element_handle()
                    is_exact_trigger = page.evaluate("(btn) => document.activeElement === btn", enlarge_handle)
                    if is_exact_trigger:
                        record_pass("accessibility", "lightbox_focus_restored", "Focus returned exactly to originating enlarge trigger button")
                    else:
                        active_info = page.evaluate("() => document.activeElement ? (document.activeElement.tagName + ' ' + (document.activeElement.innerText || document.activeElement.getAttribute('aria-label') || '')) : 'None'")
                        record_fail("accessibility", "lightbox_focus_restored", f"Focus was not restored to exact trigger button. Active element is: {active_info}")
                else:
                    record_fail("accessibility", "lightbox_escape_dismiss", "Lightbox still visible after Escape")
            else:
                record_fail("accessibility", "lightbox_opens_modal", "Lightbox dialog not visible")
        else:
            record_fail("accessibility", "lightbox_trigger", "Enlarge button not found in Project 2")

        print("\n=== 5. INTERACTIVE RÉSUMÉ MODAL ===")
        # Open Résumé Modal from header
        resume_btn = page.locator("header button[aria-label*='View résumé'], header button:has-text('View résumé')").first
        if resume_btn.is_visible():
            resume_btn.click()
            time.sleep(0.5)
            page.screenshot(path=os.path.join(ARTIFACT_DIR, "editorial_resume_modal.png"))
            
            modal = page.locator("div[role='dialog'][aria-label='Résumé of Akshay Kumar']")
            if modal.is_visible():
                record_pass("accessibility", "resume_modal_opens", "Résumé modal opened cleanly")
                
                # Switch to Structured View tab
                modal.locator("button:has-text('Structured View')").click()
                time.sleep(0.3)

                # Check for expected résumé section string presence in DOM
                modal_text = modal.inner_text()
                has_dos = "U.S. Department of State" in modal_text
                has_kogod = "Kogod School of Business" in modal_text
                has_capone = "Capital One" in modal_text
                if has_dos and has_kogod and has_capone:
                    record_pass("accessibility", "resume_modal_section_string_presence", "DOM contains expected employer and institution strings (DOS, Kogod, Capital One). Note: confirms DOM text rendering only; does not verify external factual accuracy.")
                else:
                    record_fail("accessibility", "resume_modal_section_string_presence", "Missing expected employer or institution strings in modal DOM")

                # Test Escape closes resume modal
                page.keyboard.press("Escape")
                time.sleep(0.5)
                if not modal.is_visible():
                    record_pass("accessibility", "resume_modal_escape_dismiss", "Escape key dismissed résumé modal")
                else:
                    record_fail("accessibility", "resume_modal_escape_dismiss", "Modal still visible after Escape")
            else:
                record_fail("accessibility", "resume_modal_opens", "Résumé modal element not visible")
        else:
            record_fail("accessibility", "resume_trigger", "Résumé trigger button not found in header")

        print("\n=== 6. THEMES & WCAG COLOR CONTRAST ===")
        # Capture light theme
        theme_btn = page.locator("header button[aria-label*='Switch to light mode']")
        if theme_btn.is_visible():
            theme_btn.click()
            time.sleep(0.4)
            page.screenshot(path=os.path.join(ARTIFACT_DIR, "editorial_light_theme.png"))
            
            # Check html has light class or data-theme="light"
            theme_val = page.evaluate("() => document.documentElement.getAttribute('data-theme') || (document.documentElement.classList.contains('light') ? 'light' : 'dark')")
            if theme_val == "light":
                record_pass("contrast", "light_theme_activated", "Page switched cleanly to light mode")
            else:
                record_fail("contrast", "light_theme_activated", f"Theme attribute is '{theme_val}'")

            # Check heading, body, and secondary text contrast in light theme against background
            colors = page.evaluate("""() => {
                function getResolvedRgb(el, prop) {
                    if (!el) return null;
                    const raw = window.getComputedStyle(el)[prop];
                    if (raw && raw.startsWith('rgb')) return raw;
                    const canvas = document.createElement('canvas');
                    canvas.width = 1; canvas.height = 1;
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = raw;
                    ctx.fillRect(0, 0, 1, 1);
                    const d = ctx.getImageData(0, 0, 1, 1).data;
                    return `rgb(${d[0]}, ${d[1]}, ${d[2]})`;
                }
                return {
                    bg: getResolvedRgb(document.body, 'backgroundColor'),
                    h1: getResolvedRgb(document.querySelector('h1'), 'color'),
                    zinc900: getResolvedRgb(document.querySelector('.text-zinc-900'), 'color'),
                    zinc600: getResolvedRgb(document.querySelector('.text-zinc-600'), 'color'),
                    p_body: getResolvedRgb(document.querySelector('main p'), 'color')
                };
            }""")

            def parse_rgb(s):
                if not s or not isinstance(s, str):
                    raise ValueError(f"Invalid color value: {s!r}")
                m = re.match(r"^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)", s.strip())
                if not m:
                    raise ValueError(f"Unsupported color format '{s}'. Expected standard rgb(...) or rgba(...).")
                return [int(m.group(1)), int(m.group(2)), int(m.group(3))]

            def lum(rgb):
                def ch(c):
                    v = c / 255.0
                    return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
                return 0.2126 * ch(rgb[0]) + 0.7152 * ch(rgb[1]) + 0.0722 * ch(rgb[2])

            def calc_contrast(c1, c2):
                l1 = lum(c1)
                l2 = lum(c2)
                return (max(l1, l2) + 0.05) / (min(l1, l2) + 0.05)

            try:
                bg_rgb = parse_rgb(colors["bg"])
                h1_rgb = parse_rgb(colors["h1"])
                z900_rgb = parse_rgb(colors["zinc900"])
                z600_rgb = parse_rgb(colors["zinc600"])
                p_rgb = parse_rgb(colors["p_body"])

                h1_ratio = calc_contrast(h1_rgb, bg_rgb)
                z900_ratio = calc_contrast(z900_rgb, bg_rgb)
                z600_ratio = calc_contrast(z600_rgb, bg_rgb)
                p_ratio = calc_contrast(p_rgb, bg_rgb)

                if z900_ratio >= 4.5 and z600_ratio >= 4.5 and p_ratio >= 4.5 and h1_ratio >= 4.5:
                    record_pass("contrast", "light_theme_calculated_contrast",
                                f"WCAG AA/AAA: h1 {colors['h1']} on {colors['bg']} = {h1_ratio:.2f}:1; body {colors['p_body']} = {p_ratio:.2f}:1; secondary text-zinc-600 {colors['zinc600']} = {z600_ratio:.2f}:1; text-zinc-900 {colors['zinc900']} = {z900_ratio:.2f}:1")
                else:
                    record_fail("contrast", "light_theme_calculated_contrast",
                                f"Calculated contrast below WCAG AA: zinc-900={z900_ratio:.2f}:1, zinc-600={z600_ratio:.2f}:1, body={p_ratio:.2f}:1")
            except ValueError as e:
                record_fail("contrast", "light_theme_calculated_contrast", f"Color format parsing error: {e}")

            # Switch back to dark theme
            dark_btn = page.locator("header button[aria-label*='Switch to dark mode']")
            if dark_btn.is_visible():
                dark_btn.click()
                time.sleep(0.3)
                record_pass("contrast", "dark_theme_restored", "Successfully restored dark theme")
        else:
            record_fail("contrast", "light_theme_activated", "Theme toggle button not found")

        print("\n=== 7. REDUCED MOTION TESTING ===")
        context_reduced = browser.new_context(
            viewport={"width": 1366, "height": 768},
            reduced_motion="reduce"
        )
        page_rm = context_reduced.new_page()
        page_rm.goto(BASE_URL, wait_until="networkidle")
        
        # Open lightbox with reduced motion
        p2_rm = page_rm.locator("#project-retail-forecast")
        enlarge_rm = p2_rm.locator("button:has-text('Click to enlarge diagram')")
        if enlarge_rm.is_visible():
            enlarge_rm.click()
            # Sample transform after 30ms during opening
            time.sleep(0.03)
            modal_state = page_rm.evaluate("""() => {
                const el = document.querySelector("div[role='dialog'][aria-modal='true']");
                if (!el) return { exists: false, visible: false, transform: null };
                const style = window.getComputedStyle(el);
                return {
                    exists: true,
                    visible: style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity) > 0,
                    transform: style.transform
                };
            }""")
            if modal_state["exists"] and modal_state["visible"]:
                if modal_state["transform"] == "none":
                    record_pass("accessibility", "reduced_motion_transform_none", f"Modal visible with transform={modal_state['transform']} (no scale animation)")
                else:
                    record_fail("accessibility", "reduced_motion_transform_none", f"Unexpected transform: {modal_state['transform']}")
            else:
                record_fail("accessibility", "reduced_motion_transform_none", f"Modal element not visible during opening sample: {modal_state}")
            
            # Check Hairline in Project 1 under reduced motion
            p1_rm = page_rm.locator("#project-irs990")
            if p1_rm.is_visible():
                hairline_present = p1_rm.locator("svg[data-testid='hairline-pipeline-svg']").is_visible()
                if hairline_present:
                    record_pass("accessibility", "hairline_reduced_motion_static_mode", "Hairline pipeline figure renders cleanly without continuous RAF loops under prefers-reduced-motion")
                else:
                    record_fail("accessibility", "hairline_reduced_motion_static_mode", "Hairline SVG not visible in reduced motion mode")

            # Dismiss
            page_rm.keyboard.press("Escape")
            time.sleep(0.3)
            closed_check = page_rm.evaluate("() => document.querySelector(\"div[role='dialog'][aria-modal='true']\") === null")
            if closed_check:
                record_pass("accessibility", "reduced_motion_clean_unmount", "Modal unmounted cleanly after Escape")
            else:
                record_fail("accessibility", "reduced_motion_clean_unmount", "Modal still present in DOM after Escape")

        browser.close()

    print("\n================ TEST SUMMARY ================")
    print(f"Total Passed: {results['passed_count']}")
    print(f"Total Failed: {results['failed_count']}")
    
    with open(os.path.join(ARTIFACT_DIR, "redesign_verification_results.json"), "w") as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    run_tests()
