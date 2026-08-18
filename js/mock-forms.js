/*
 * Front-end-only mocks for the forms that, on the live site, POST to
 * Own-Kind's real backend (demo requests, log-in, sign-up). None of these
 * handlers make any network request — they only simulate the visible
 * result, so testing this staging site can never create real leads,
 * accounts, or production data.
 *
 * The success/error states shown here are this project's own additions
 * (the live site's real post-submit state isn't publicly observable
 * without valid backend access), built from the same button/typography
 * classes as the rest of the site rather than any new design.
 */

function mockSubmitSuccess(container, title, message) {
  container.innerHTML =
    '<div class="text-container text-container-headers">' + title + '</div>' +
    '<div class="text-container text-container-subheaders-small">' + message + '</div>';
}

document.addEventListener("DOMContentLoaded", function () {
  // --- Demo request form ---
  var demoForm = document.querySelector(".demo-form");
  if (demoForm) {
    demoForm.addEventListener("submit", function (e) {
      e.preventDefault();
      mockSubmitSuccess(
        demoForm.closest(".request-demo-container"),
        "Thanks — request received",
        "This is the staging site, so nothing was sent to Own-Kind. On the live site, this submits to the real demo-request pipeline."
      );
    });
  }

  // --- Log in form ---
  var loginForm = document.querySelector(".login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      mockSubmitSuccess(
        loginForm.closest(".login-card"),
        "Staging mock",
        "Log-in is disabled on this staging copy (it would authenticate against the real Own-Kind backend). This page exists so its layout can be reviewed and edited."
      );
    });
  }

  // --- Sign up (2-step) ---
  var signupContainer = document.querySelector(".signup-container");
  if (signupContainer) {
    var newBtn = signupContainer.querySelector(".button-rows .light-button");
    var buttons = signupContainer.querySelectorAll(".button-rows .light-button");
    var nextBtn = signupContainer.querySelector(".black-button-next");
    var selected = null;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("selected"); });
        btn.classList.add("selected");
        selected = btn;
        if (nextBtn) nextBtn.disabled = false;
      });
    });

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (!selected) return;
        signupContainer.innerHTML = SIGNUP_STEP2_HTML;
        wireSignupStep2();
      });
    }
  }

  function wireSignupStep2() {
    var form = document.querySelector(".signup-container form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      mockSubmitSuccess(
        document.querySelector(".signup-container"),
        "Thanks — account request received",
        "This is the staging site, so no account was created. On the live site, this submits to the real sign-up pipeline."
      );
    });
  }
});

// Verbatim step-2 markup from the live site (revealed after choosing
// "I'm new" / "I have a referral code" and clicking "Next").
var SIGNUP_STEP2_HTML = '<h2>Create an account</h2><app-sign-up-without-referral-form _nghost-ng-c914554884=""><h3 _ngcontent-ng-c914554884="">Please enter your details</h3><div _ngcontent-ng-c914554884="" class="merchant-client-form"><form _ngcontent-ng-c914554884="" autocomplete="off" novalidate=""><app-input _ngcontent-ng-c914554884="" _nghost-ng-c3604201163="" formcontrolname="fullName" label="Full name" placeholder="Enter your full name" variant="modern"><div _ngcontent-ng-c3604201163="" class="app-input-wrapper app-input-modern"><label _ngcontent-ng-c3604201163="" class="app-input-label">Full name</label><div _ngcontent-ng-c3604201163="" class="app-input-field"><input _ngcontent-ng-c3604201163="" class="p-component p-inputtext" placeholder="Enter your full name" type="text"/></div></div></app-input><app-input _ngcontent-ng-c914554884="" _nghost-ng-c3604201163="" formcontrolname="emailAddress" label="Work email" placeholder="Enter your work email" variant="modern"><div _ngcontent-ng-c3604201163="" class="app-input-wrapper app-input-modern"><label _ngcontent-ng-c3604201163="" class="app-input-label">Work email</label><div _ngcontent-ng-c3604201163="" class="app-input-field"><input _ngcontent-ng-c3604201163="" class="p-component p-inputtext" maxlength="100" placeholder="Enter your work email" type="text"/></div></div></app-input><app-input _ngcontent-ng-c914554884="" _nghost-ng-c3604201163="" formcontrolname="companyName" label="Company name" placeholder="Enter your company name" variant="modern"><div _ngcontent-ng-c3604201163="" class="app-input-wrapper app-input-modern"><label _ngcontent-ng-c3604201163="" class="app-input-label">Company name</label><div _ngcontent-ng-c3604201163="" class="app-input-field"><input _ngcontent-ng-c3604201163="" class="p-component p-inputtext" maxlength="45" placeholder="Enter your company name" type="text"/></div></div></app-input><app-input _ngcontent-ng-c914554884="" _nghost-ng-c3604201163="" formcontrolname="additionalInfo" label="Any additional info to provide?" placeholder="Enter any additional information" variant="modern"><div _ngcontent-ng-c3604201163="" class="app-input-wrapper app-input-modern"><label _ngcontent-ng-c3604201163="" class="app-input-label">Any additional info to provide?</label><div _ngcontent-ng-c3604201163="" class="app-input-field"><input _ngcontent-ng-c3604201163="" class="p-component p-inputtext" placeholder="Enter any additional information" type="text"/></div></div></app-input><button _ngcontent-ng-c914554884="" class="black-button" type="submit">Sign up</button><p _ngcontent-ng-c914554884="" class="existing-account" data-nav="log-in" tabindex="0">← Back to log in</p></form></div></app-sign-up-without-referral-form>';
