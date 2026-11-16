"use client";
import { useEffect } from "react";

const INTERVAL = 30_000;

function visitorId() {
  try {
    let id = sessionStorage.getItem("wk-visitor");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("wk-visitor", id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

/** Sayfa görünürken 30 sn'de bir "buradayım" sinyali gönderir (admin paneldeki canlı sayaç için). */
export function VisitorPing() {
  useEffect(() => {
    const id = visitorId();
    let timer: ReturnType<typeof setInterval> | undefined;

    const send = (leave = false) => {
      const body = JSON.stringify(leave ? { id, leave: true } : { id });
      if (leave && navigator.sendBeacon) navigator.sendBeacon("/api/presence", body);
      else fetch("/api/presence", { method: "POST", body, keepalive: true }).catch(() => {});
    };
    const start = () => {
      send();
      clearInterval(timer);
      timer = setInterval(send, INTERVAL);
    };
    const stop = () => {
      clearInterval(timer);
      send(true);
    };
    const onVisibility = () => (document.visibilityState === "visible" ? start() : stop());

    if (document.visibilityState === "visible") start();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", stop);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", stop);
      clearInterval(timer);
    };
  }, []);
  return null;
}
