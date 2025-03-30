(function () {
  // ওয়েবসাইটের তথ্য সংগ্রহ করা
  const siteTitle = document.title || "PWA App";
  const metaDescription = document.querySelector('meta[name="description"]')?.content || "A Progressive Web App";
  const favicon = document.querySelector('link[rel="icon"]')?.href || "/favicon.ico";

  // Manifest ডাইনামিকভাবে তৈরি করা
  function createManifest() {
    const manifestData = {
      name: siteTitle,
      short_name: siteTitle,
      description: metaDescription,
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#007bff",
      icons: [
        { src: favicon, sizes: "192x192", type: "image/png" },
        { src: favicon, sizes: "512x512", type: "image/png" }
      ]
    };

    const blob = new Blob([JSON.stringify(manifestData)], { type: "application/json" });
    const manifestURL = URL.createObjectURL(blob);
    const manifestElement = document.createElement("link");
    manifestElement.rel = "manifest";
    manifestElement.href = manifestURL;
    document.head.appendChild(manifestElement);
  }
  createManifest();

  // Service Worker রেজিস্টার করা
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
      .then(() => console.log("✅ Service Worker Registered"))
      .catch((error) => console.log("❌ Service Worker Failed:", error));
  }

  // ইনস্টল নোটিফিকেশন যুক্ত করা
  let deferredPrompt;
  const installBanner = document.createElement("div");
  installBanner.id = "install-banner";
  installBanner.style.display = "none";
  installBanner.style.position = "fixed";
  installBanner.style.bottom = "20px";
  installBanner.style.left = "50%";
  installBanner.style.transform = "translateX(-50%)";
  installBanner.style.background = "#007bff";
  installBanner.style.color = "#fff";
  installBanner.style.padding = "10px 20px";
  installBanner.style.borderRadius = "8px";
  installBanner.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
  installBanner.innerHTML = `<span>${siteTitle} ইনস্টল করুন!</span> <button id="install-button" style="margin-left: 10px; padding: 5px 10px; background: #fff; color: #007bff; border: none; cursor: pointer; border-radius: 5px;">ইন্সটল</button>`;
  document.body.appendChild(installBanner);

  const installButton = document.getElementById("install-button");

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installBanner.style.display = "block"; // ইনস্টল নোটিফিকেশন দেখানো

    installButton.addEventListener("click", () => {
      installBanner.style.display = "none";
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("🎉 ইউজার ইনস্টল করলো!");
        } else {
          console.log("❌ ইউজার বাতিল করলো!");
        }
        deferredPrompt = null;
      });
    });
  });

  window.addEventListener("appinstalled", () => {
    console.log("✅ PWA Installed!");
    installBanner.style.display = "none";
  });
})();

