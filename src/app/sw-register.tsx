"use client";

import { useEffect } from "react";

const SW_REGISTER_KEY = "soul-sw-registered";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const alreadyRegistered = sessionStorage.getItem(SW_REGISTER_KEY);

    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        sessionStorage.setItem(SW_REGISTER_KEY, "true");

        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              newWorker.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });
      })
      .catch((error) => {
        if (!alreadyRegistered) {
          console.error("SW registration failed:", error);
        }
      });

    let refreshing = false;

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });

    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data?.type === "SYNC_COMPLETE") {
        console.log("Background sync completed:", event.data.tag);
      }
    });
  }, []);

  return null;
}
