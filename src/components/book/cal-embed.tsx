'use client'

import Script from 'next/script'

const CAL_USERNAME = 'kamal-hussain-jxas5y'

// Cal.com preamble sets up window.Cal as a queue, then self-loads embed.js.
// Loading embed.js directly (without this preamble) causes "Cal is not defined"
// because embed.js expects window.Cal.q to already exist.
const CAL_SNIPPET = `
(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal; let ar = arguments;
    if (!cal.loaded) {
      cal.ns = {}; cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1]; api.q = [];
      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar); p(cal, [L, namespace, api]);
      } else { p(cal, ar); }
      return;
    }
    p(cal, ar);
  };
})(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", { origin: "https://cal.com" });
Cal("inline", {
  elementOrSelector: "#cal-inline",
  calLink: "${CAL_USERNAME}"
});
Cal("ui", {
  theme: "dark",
  styles: { branding: { brandColor: "#E24B4A" } },
  hideEventTypeDetails: false
});
`

export function CalEmbed() {
  return (
    <>
      <Script
        id="cal-embed-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: CAL_SNIPPET }}
      />
      <div
        id="cal-inline"
        className="mt-10 overflow-hidden rounded-xl"
        style={{ minHeight: 500 }}
      />
    </>
  )
}
