// Accessible contact form validation.
// Without JavaScript the browser's built-in validation still works.
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  // Turn off the browser's popup bubbles so our own accessible messages are used.
  form.noValidate = true;

  var status = document.getElementById("form-status");

  var rules = [
    { id: "name", message: "Please enter your name." },
    { id: "email", message: "Please enter a valid email address, for example name@example.com." },
    { id: "message", message: "Please enter your message." }
  ];

  function validateField(rule) {
    var input = document.getElementById(rule.id);
    var error = document.getElementById(rule.id + "-error");
    var valid = input.value.trim() !== "" && input.checkValidity();

    if (valid) {
      input.removeAttribute("aria-invalid");
      error.textContent = "";
    } else {
      input.setAttribute("aria-invalid", "true");
      error.textContent = rule.message;
    }
    return valid;
  }

  // Re-check a field when the user leaves it.
  rules.forEach(function (rule) {
    document.getElementById(rule.id).addEventListener("blur", function () {
      validateField(rule);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    status.textContent = "";

    var firstInvalid = null;
    rules.forEach(function (rule) {
      if (!validateField(rule) && !firstInvalid) {
        firstInvalid = document.getElementById(rule.id);
      }
    });

    if (firstInvalid) {
      // Move keyboard focus to the first problem so screen reader users hear it.
      firstInvalid.focus();
      return;
    }

    // Demo only: replace this with a real submit (Formspree, Netlify Forms, etc.).
    status.textContent = "Thank you! Your message has been sent.";
    form.reset();
  });
})();