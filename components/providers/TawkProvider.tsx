import Script from "next/script";
import { TAWK_WIDGET_URL } from "@/lib/tawk";

const tawkInitScript = `
  if (!window.__vitalinkTawkLoaded && !document.getElementById('vitalink-tawk-widget')) {
    window.__vitalinkTawkLoaded = true;
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.customStyle = {
      zIndex: 60
    };
    window.Tawk_LoadStart = new Date();
    (function(){
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.id = "vitalink-tawk-widget";
      s1.async = true;
      s1.src = "${TAWK_WIDGET_URL}";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }
`;

export function TawkProvider() {
  return (
    <Script
      id="vitalink-tawk-provider"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: tawkInitScript }}
    />
  );
}
