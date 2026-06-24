import Script from "next/script";
import { TAWK_WIDGET_URL } from "@/lib/tawk";

const tawkInitScript = `
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_API.customStyle = {
    zIndex: 60
  };
  window.Tawk_LoadStart = window.Tawk_LoadStart || new Date();

  if (!window.__vitalinkTawkErrorGuard) {
    window.__vitalinkTawkErrorGuard = true;
    window.addEventListener("error", function(event) {
      var message = event && (event.message || (event.error && event.error.message));
      var filename = event && event.filename;
      var isTawkI18nError =
        typeof message === "string" &&
        message.indexOf("i18next is not a function") !== -1 &&
        (!filename || filename.indexOf("tawk.to") !== -1 || filename.indexOf("embed.tawk.to") !== -1);

      if (isTawkI18nError) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
  }

  if (!window.__vitalinkTawkConsoleGuard) {
    window.__vitalinkTawkConsoleGuard = true;
    var originalConsoleError = window.console && window.console.error;

    if (typeof originalConsoleError === "function") {
      window.console.error = function() {
        if (arguments.length === 1 && arguments[0] === true) {
          return;
        }

        return originalConsoleError.apply(window.console, arguments);
      };
    }
  }
`;

export function TawkProvider() {
  return (
    <>
      <Script
        id="vitalink-tawk-provider"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: tawkInitScript }}
      />
      <Script
        id="vitalink-tawk-widget"
        src={TAWK_WIDGET_URL}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
}
