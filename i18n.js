document.addEventListener("DOMContentLoaded", function () {
  // Load the preferred language from localStorage, default to "ar" if not set
  const savedLanguage = localStorage.getItem("preferredLanguage") || "ar";

  i18next
    .use(i18nextHttpBackend) // Use the backend plugin to load translations
    .use(i18nextBrowserLanguageDetector) // Automatically detect language
    .init(
      {
        lng: savedLanguage, // Use saved language or default
        fallbackLng: "ar", // Fallback language (Arabic)
        debug: true, // Enable debugging to see log messages

        // Load translation files using HTTP backend
        backend: {
          loadPath: "./locales/{{lng}}.json", // Path to your translation files
        },

        interpolation: {
          escapeValue: false, // React already escapes variables
        },
      },
      function (err, t) {
        if (err) {
          console.error("Error initializing i18next:", err);
          return;
        }
        // Ensure content and page initialization happen only after translations are ready
        updateContent();
      }
    );

  // Listen for language change
  document
    .getElementById("languageSwitcher")
    .addEventListener("change", function (e) {
      const selectedLang = e.target.value;
      i18next.changeLanguage(selectedLang, function (err, t) {
        if (err) {
          console.error("Error changing language:", err);
          return;
        }
        // Save the selected language in localStorage
        localStorage.setItem("preferredLanguage", selectedLang);
        updateContent(); // Update text content after changing language
      });
    });

  // Function to update the text content of elements based on language
  function updateContent() {
    // Loop through elements with 'data-i18n' attribute to update text content
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const key = element.getAttribute("data-i18n");
      
      // Update text content for non-input elements
      if (element.tagName !== "INPUT" && element.tagName !== "TEXTAREA") {
        element.innerText = i18next.t(key);
      }
    });
  
    // Update placeholder text for inputs and textareas
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
      const key = element.getAttribute("data-i18n-placeholder");
      element.setAttribute("placeholder", i18next.t(key));
    });
  
    // Adjust the text direction (ltr or rtl)
    const currentLang = i18next.language;
    const bodyElement = document.body;
  
    // Set direction for the body based on the language
    if (currentLang === "ar") {
      bodyElement.setAttribute("dir", "rtl"); // Right-to-left for Arabic
    } else {
      bodyElement.setAttribute("dir", "ltr"); // Left-to-right for other languages
    }
  
    // Adjust input text direction and alignment based on language
    document.querySelectorAll("input, textarea").forEach((element) => {
      if (currentLang === "ar") {
        element.setAttribute("dir", "rtl"); // Right-to-left for Arabic inputs
      } else {
        element.setAttribute("dir", "ltr"); // Left-to-right for other language inputs
      }
    });
  }
});
