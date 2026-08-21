/*
 * Shared markup for elements repeated on every page: the top navigation,
 * the footer, and the cookie-consent banner.
 *
 * Extracted verbatim from the live site's rendered DOM, including the
 * Angular `_ngcontent-ng-c*` / `_nghost-ng-c*` attributes — the real,
 * downloaded stylesheets (assets/css/styles.css, assets/css/app-inline.css)
 * use those exact attributes as CSS selectors, so removing them would
 * break the styling. `routerlink` attributes were kept (inert without
 * Angular) and a `data-nav` attribute was added alongside so js/site.js
 * can wire up real navigation.
 *
 * Edit these three constants to change the header/footer/cookie banner
 * everywhere at once.
 */

/*
 * Top-level nav destinations, in display order. Edit this one array to
 * change the menu on every page — both the desktop bar and the mobile
 * (hamburger) panel are generated from it.
 *
 * Careers and Partnerships are deliberately NOT top-level tabs; they're
 * reachable from /contact instead.
 */
const NAV_LINKS = [
  { label: "Product", route: "features" },
  { label: "Pricing", route: "pricing" },
  { label: "Case Studies", route: "case-studies" },
  { label: "Integrations", route: "integrations" },
  { label: "About", route: "about" },
  { label: "Contact", route: "contact" },
];

/*
 * Nav styling lives here rather than in assets/css/styles.css so that the
 * menu is entirely self-contained: no page's <head> needs editing to pick
 * it up. The site's own CSS switches to its desktop layout at 1350px; the
 * rules below bring the real nav bar in a little earlier (1200px) and
 * tighten the horizontal padding in that band so six links, the wordmark
 * and both buttons fit on one line without wrapping.
 */
const NAV_CSS = `<style>
.top__nav__links{display:none}
@media all and (min-width: 1280px){
  .top__nav[_ngcontent-ng-c1050644183]{height:85px!important;flex-direction:row!important;padding:0 4vw;align-items:center}
  .top__nav[_ngcontent-ng-c1050644183] .top__nav__hamburger[_ngcontent-ng-c1050644183],
  .top__nav[_ngcontent-ng-c1050644183] .top__nav__mobile[_ngcontent-ng-c1050644183]{display:none!important}
  .top__nav[_ngcontent-ng-c1050644183] .top__nav__logo__container[_ngcontent-ng-c1050644183]{margin:0;flex:0 0 auto}
  .top__nav[_ngcontent-ng-c1050644183] .top__nav__logo[_ngcontent-ng-c1050644183] img[_ngcontent-ng-c1050644183]{max-height:28px}
  .top__nav__links{display:flex;flex-direction:row;align-items:center;gap:20px;margin-left:28px}
  .top__nav__links a{font-family:Montserrat,Helvetica,Arial,sans-serif;font-size:12px;font-weight:500;letter-spacing:1.2px;text-transform:uppercase;color:#383838;text-decoration:none;white-space:nowrap;cursor:pointer;transition:color .15s ease-in-out}
  .top__nav__links a:hover{color:#111827;text-decoration:none}
  .top__nav[_ngcontent-ng-c1050644183] .top__nav__desktop__right[_ngcontent-ng-c1050644183]{display:flex;flex-direction:row;justify-content:flex-end;align-items:center;width:auto!important;margin-left:auto;padding-left:20px;gap:18px}
  /*
   * The header CTA is 2rem / 220px-min in the site's base CSS, which fit
   * when the bar held nothing but the wordmark. With six nav links it no
   * longer does, so it scales down to a normal header-button size here.
   * Everything else about it (colour, radius, handler) is unchanged.
   */
  .top__nav[_ngcontent-ng-c1050644183] .top__nav__desktop__right[_ngcontent-ng-c1050644183] .black-button[_ngcontent-ng-c1050644183]{font-size:1rem!important;min-width:0!important;padding:.7rem 1.5rem!important;white-space:nowrap}
  .top__nav[_ngcontent-ng-c1050644183] .top__nav__desktop__right[_ngcontent-ng-c1050644183] .clickable[_ngcontent-ng-c1050644183]{font-size:12px;letter-spacing:1.2px;text-transform:uppercase;white-space:nowrap}
}
.mobile-panel__links{display:flex;flex-direction:column;align-items:center;gap:22px;margin:10px 0}
.mobile-panel__links a{font-family:Montserrat,Helvetica,Arial,sans-serif;font-size:17px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#383838;text-decoration:none;cursor:pointer}
.mobile-panel__links a:hover{color:#111827;text-decoration:none}
</style>`;

const NAV_DESKTOP_LINKS = NAV_LINKS.map(function (l) {
  return `<a data-nav="${l.route}" href="${l.route}">${l.label}</a>`;
}).join("");

const NAV_MOBILE_LINKS = NAV_LINKS.map(function (l) {
  return `<a data-nav="${l.route}" href="${l.route}">${l.label}</a>`;
}).join("");

const NAV_HTML = `${NAV_CSS}<app-navigation _nghost-ng-c1050644183=""><div _ngcontent-ng-c1050644183="" class="top__nav"><div _ngcontent-ng-c1050644183="" class="top__nav__hamburger"><app-hamburger _ngcontent-ng-c1050644183="" _nghost-ng-c955244121="" id="hamburger-toggle"><div _ngcontent-ng-c955244121="" class="menu-link-wrapper"><div _ngcontent-ng-c955244121="" class="menu-link"><span _ngcontent-ng-c955244121="" class="lines"></span></div></div></app-hamburger></div><nav _ngcontent-ng-c1050644183="" class="top__nav__mobile" id="mobile-nav"><ul _ngcontent-ng-c1050644183=""><div _ngcontent-ng-c1050644183="" class="mobile-panel"><div _ngcontent-ng-c1050644183=""><img _ngcontent-ng-c1050644183="" alt="OWN-KIND Logo" src="assets/logo/logo.png" width="275px"/></div><div _ngcontent-ng-c1050644183="" class="mobile-panel__links">${NAV_MOBILE_LINKS}</div><div _ngcontent-ng-c1050644183=""><button _ngcontent-ng-c1050644183="" class="light-button" data-nav="log-in" tabindex="0">Sign up / Log in</button></div><div _ngcontent-ng-c1050644183=""><button _ngcontent-ng-c1050644183="" class="black-button" data-nav="demo-request" tabindex="0">Get a demo &rarr;</button></div></div></ul></nav><div _ngcontent-ng-c1050644183="" class="top__nav__logo__container"><a _ngcontent-ng-c1050644183="" class="top__nav__logo" data-nav="./" href="./"><img _ngcontent-ng-c1050644183="" alt="OWN-KIND Logo" src="assets/logo/logo.png" width="275px"/></a></div><nav class="top__nav__links">${NAV_DESKTOP_LINKS}</nav><div _ngcontent-ng-c1050644183="" class="top__nav__desktop__right"><span _ngcontent-ng-c1050644183="" class="clickable" data-nav="log-in" tabindex="0">Sign up / Log in</span><button _ngcontent-ng-c1050644183="" class="black-button" data-nav="demo-request" tabindex="0">Get a demo &rarr;</button></div></div></app-navigation>`;

const FOOTER_HTML = `<app-footer _nghost-ng-c2209505024="" class="footer"><footer _ngcontent-ng-c2209505024="" class="panel__footer" style="background-color: rgb(244, 244, 244);"><div _ngcontent-ng-c2209505024="" class="panel__footer__social"><p _ngcontent-ng-c2209505024="">Contact us</p><div _ngcontent-ng-c2209505024=""><a _ngcontent-ng-c2209505024="" href="https://twitter.com/own_kind/" target="_blank" rel="noopener">
<img _ngcontent-ng-c2209505024="" alt="Twitter" src="assets/icons/social/Twitter.png" width="30px"/></a><a _ngcontent-ng-c2209505024="" href="https://www.instagram.com/own.kind/" target="_blank" rel="noopener"><img _ngcontent-ng-c2209505024="" alt="Instagram" src="assets/icons/social/Instagram.png" width="30px"/></a><a _ngcontent-ng-c2209505024="" href="https://www.facebook.com/ownkindapp/" target="_blank" rel="noopener"><img _ngcontent-ng-c2209505024="" alt="Facebook" src="assets/icons/social/Facebook.png" width="30px"/></a><a _ngcontent-ng-c2209505024="" href="https://www.linkedin.com/company/own-kind" target="_blank" rel="noopener"><img _ngcontent-ng-c2209505024="" alt="LinkedIn" src="assets/icons/social/LinkedIn.svg" width="30px"/></a><a _ngcontent-ng-c2209505024="" href="tel:+447732422554" target="_blank" title="+447732422554"><img _ngcontent-ng-c2209505024="" alt="Phone" src="assets/icons/social/Phone.png" width="30px"/></a><a _ngcontent-ng-c2209505024="" href="mailto:info@own-kind.com" target="_blank" title="info@own-kind.com"><img _ngcontent-ng-c2209505024="" alt="Email" src="assets/icons/social/Email.png" width="30px"/></a></div></div><div _ngcontent-ng-c2209505024="" class="panel__footer__copyright"><p _ngcontent-ng-c2209505024="">&copy; 2026 Own-Kind. All rights reserved.</p></div><div _ngcontent-ng-c2209505024="" class="panel__footer__contact"><a _ngcontent-ng-c2209505024="" class="flex-column center-vertically" data-nav="security" href="security" style="text-decoration:none;color:inherit"><img _ngcontent-ng-c2209505024="" alt="Approachable UKAS ISO" src="assets/img/ApproachableUKAS_ISO.png" width="167px"/><span _ngcontent-ng-c2209505024="">ISO/IEC 27001:2022<br _ngcontent-ng-c2209505024=""/>Cert No. 12034</span></a></div></footer></app-footer>`;

const COOKIE_HTML = `<div class="cc-window cc-banner cc-type-opt-out cc-theme-edgeless cc-bottom cc-color-override-1684764069" role="dialog" aria-live="polite" aria-label="cookieconsent" id="cookie-banner" style="display:none;"><span class="cc-message" id="cookieconsent:desc">This website uses cookies to ensure you get the best experience on our website. <a class="cc-link" href="privacy-policy" target="_blank" rel="noopener noreferrer nofollow" role="button" tabindex="0" aria-label="learn more about cookies">Privacy policy</a></span><div class="cc-compliance cc-highlight"><a class="cc-btn cc-deny" role="button" tabindex="0" aria-label="deny cookies" id="cookie-decline">Decline</a><a class="cc-btn cc-allow" role="button" tabindex="0" aria-label="allow cookies" id="cookie-allow">Allow cookies</a></div></div>`;
