/*
 * The live site loads Google Analytics (gtag, G-VZZ07H3H9J), Hotjar
 * (site id 3550783) and Microsoft Clarity (kuczbr2pts) from own-kind.com.
 *
 * This staging site must never send data into those production accounts,
 * so none of those third-party scripts are loaded here at all. This stub
 * only exists so that if any copied markup/behaviour ever calls
 * `gtag(...)`, `hj(...)` or `clarity(...)`, it fails silently instead of
 * throwing a "not defined" error.
 */
window.dataLayer = window.dataLayer || [];
window.gtag = function () {
  console.debug("[staging stub] gtag() called, no-op:", arguments);
};
window.hj = function () {
  console.debug("[staging stub] hj() called, no-op:", arguments);
};
window.clarity = function () {
  console.debug("[staging stub] clarity() called, no-op:", arguments);
};
