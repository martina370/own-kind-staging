/*
 * Injects the shared nav/footer/cookie-consent components (from
 * js/components.js) into every page, and re-implements the small bits of
 * behaviour the live site's Angular app normally provides:
 *   - mobile hamburger menu open/close (toggles the real "mobile-active"
 *     class the live site's own CSS already keys off)
 *   - "Sign up / Log in" and "Get a demo" navigation
 *   - cookie-consent banner show/accept/decline (mirrors cookieconsent.js
 *     behaviour: shows once per browser, remembers the choice)
 *
 * This file intentionally does NOT talk to any own-kind.com API, and does
 * NOT load Google Analytics / GTM / Hotjar / Clarity — see
 * js/analytics-stub.js for why.
 */
(function () {
  function injectComponents() {
    var navSlot = document.getElementById("nav-root");
    if (navSlot) navSlot.outerHTML = NAV_HTML;

    var footerSlot = document.getElementById("footer-root");
    if (footerSlot) footerSlot.outerHTML = FOOTER_HTML;

    var cookieSlot = document.getElementById("cookie-root");
    if (cookieSlot) cookieSlot.outerHTML = COOKIE_HTML;
  }

  function wireNav() {
    document.body.addEventListener("click", function (e) {
      var el = e.target.closest("[data-nav]");
      if (!el) return;
      e.preventDefault();
      var dest = el.getAttribute("data-nav");
      window.location.href = dest;
    });
  }

  function wireHamburger() {
    var toggle = document.getElementById("hamburger-toggle");
    var nav = document.querySelector(".top__nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      nav.classList.toggle("mobile-active");
    });
    // Close the mobile menu after choosing a nav item
    var mobileNav = document.getElementById("mobile-nav");
    if (mobileNav) {
      mobileNav.addEventListener("click", function (e) {
        if (e.target.closest("[data-nav]")) {
          nav.classList.remove("mobile-active");
        }
      });
    }
  }

  function wireCookieConsent() {
    var banner = document.getElementById("cookie-banner");
    if (!banner) return;
    var STORAGE_KEY = "ownkind_staging_cookie_choice";
    var stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      banner.style.display = "";
    }
    var allow = document.getElementById("cookie-allow");
    var decline = document.getElementById("cookie-decline");
    if (allow) {
      allow.addEventListener("click", function () {
        localStorage.setItem(STORAGE_KEY, "allow");
        banner.style.display = "none";
      });
    }
    if (decline) {
      decline.addEventListener("click", function () {
        localStorage.setItem(STORAGE_KEY, "decline");
        banner.style.display = "none";
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectComponents();
    wireNav();
    wireHamburger();
    wireCookieConsent();
  });
})();
