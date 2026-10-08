"use client";

import { Activity, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "./LiveEcosystemSnapshot.module.css";

const REFRESH_INTERVAL_MS = 60_000;
const ARTGRIDX_STATS_URL = "https://artgridx.nextgenaischool.in/api/stats";
const HUNAR_PRODUCTS_URL = "https://hunar.nextgenaischool.in/api/products";
const HUNAR_METRICS_URL = "https://hunar.nextgenaischool.in/api/public/metrics";

type MetricStatus = "loading" | "live" | "stale" | "unavailable" | "not-deployed";
type MetricState = {
  value: number | null;
  updatedAt: string | null;
  status: MetricStatus;
};
type MetricsState = {
  artgridx: MetricState;
  products: MetricState;
  orders: MetricState;
};
type MetricKey = keyof MetricsState;
type MetricResponse = { value: number; updatedAt: string };
type ApiPayload = Record<string, unknown>;

const INITIAL_METRICS: MetricsState = {
  artgridx: { value: null, updatedAt: null, status: "loading" },
  products: { value: null, updatedAt: null, status: "loading" },
  orders: { value: null, updatedAt: null, status: "loading" },
};

class MetricsEndpointNotDeployedError extends Error {}

const METRIC_INFO: Array<{
  key: MetricKey;
  project: string;
  label: string;
  logo: string;
}> = [
  { key: "artgridx", project: "ArtGridX", label: "Profiles live", logo: "/brands/artgridx-mark.png" },
  { key: "products", project: "Hunar", label: "Products listed", logo: "/brands/hunar-mark.png" },
  { key: "orders", project: "Hunar", label: "Orders received", logo: "/brands/hunar-mark.png" },
];

function isPayload(value: unknown): value is ApiPayload {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readCount(payload: ApiPayload, field: string) {
  const value = payload[field];
  const count = typeof value === "number" ? value : Number(value);
  if (!Number.isSafeInteger(count) || count < 0) {
    throw new Error(`Invalid count in ${field}.`);
  }
  return count;
}

function readTimestamp(payload: ApiPayload) {
  const timestamp = payload.generatedAt;
  if (typeof timestamp === "string" && Number.isFinite(Date.parse(timestamp))) {
    return timestamp;
  }
  return new Date().toISOString();
}

async function fetchPayload(url: string, signal: AbortSignal): Promise<ApiPayload> {
  const response = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
    signal,
  });
  if (!response.ok) throw new Error(`Live data request failed (${response.status}).`);
  if (!response.headers.get("content-type")?.includes("application/json")) {
    throw new MetricsEndpointNotDeployedError();
  }
  const payload: unknown = await response.json();
  if (!isPayload(payload)) throw new Error("Live data response was invalid.");
  return payload;
}

async function fetchProductCount(signal: AbortSignal): Promise<MetricResponse> {
  const response = await fetch(HUNAR_PRODUCTS_URL, {
    cache: "no-store",
    headers: { Accept: "application/json" },
    signal,
  });
  if (!response.ok) throw new Error(`Live product request failed (${response.status}).`);
  const products: unknown = await response.json();
  if (!Array.isArray(products)) throw new Error("Live product response was invalid.");
  return { value: products.length, updatedAt: new Date().toISOString() };
}

async function fetchArtGridX(signal: AbortSignal): Promise<MetricResponse> {
  const payload = await fetchPayload(ARTGRIDX_STATS_URL, signal);
  return { value: readCount(payload, "profilesHosted"), updatedAt: readTimestamp(payload) };
}

async function fetchHunarOrders(signal: AbortSignal): Promise<MetricResponse> {
  const payload = await fetchPayload(HUNAR_METRICS_URL, signal);
  return {
    value: readCount(payload, "ordersReceived"),
    updatedAt: readTimestamp(payload),
  };
}

function applyResult(
  previous: MetricState,
  result: PromiseSettledResult<MetricResponse>,
): MetricState {
  if (result.status === "fulfilled") {
    return { ...result.value, status: "live" };
  }
  if (
    result.reason instanceof MetricsEndpointNotDeployedError &&
    previous.value === null
  ) {
    return { ...previous, status: "not-deployed" };
  }
  return {
    ...previous,
    status: previous.value === null ? "unavailable" : "stale",
  };
}

function formatCount(value: number | null) {
  return value === null ? "—" : new Intl.NumberFormat("en-IN").format(value);
}

function updateLabel(metric: MetricState, key: MetricKey) {
  if (metric.status === "loading") return "Loading live data";
  if (metric.status === "not-deployed") {
    return key === "orders" ? "Orders API not deployed" : "Metrics API not deployed";
  }
  if (metric.status === "unavailable") return "Live data unavailable";
  if (metric.status === "stale") return "Refresh failed · showing last value";
  if (!metric.updatedAt) return "Live";
  return `Updated ${new Date(metric.updatedAt).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  })}`;
}

export function LiveEcosystemSnapshot() {
  const [metrics, setMetrics] = useState<MetricsState>(INITIAL_METRICS);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let mounted = true;
    let timer: number | undefined;
    let controller: AbortController | undefined;

    async function refresh() {
      controller = new AbortController();
      const [artgridxResult, productsResult, ordersResult] = await Promise.allSettled([
        fetchArtGridX(controller.signal),
        fetchProductCount(controller.signal),
        fetchHunarOrders(controller.signal),
      ]);
      if (!mounted) return;

      setMetrics((previous) => {
        return {
          artgridx: applyResult(previous.artgridx, artgridxResult),
          products: applyResult(previous.products, productsResult),
          orders: applyResult(previous.orders, ordersResult),
        };
      });

      timer = window.setTimeout(refresh, REFRESH_INTERVAL_MS);
    }

    void refresh();
    return () => {
      mounted = false;
      if (timer !== undefined) window.clearTimeout(timer);
      controller?.abort();
    };
  }, []);

  return (
    <div className={styles.snapshot}>
      {!open ? (
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setOpen(true)}
          aria-controls="live-ecosystem-snapshot"
          aria-expanded={false}
        >
          <span className={styles.liveDot} aria-hidden="true" />
          <span>Open live ecosystem snapshot</span>
          <Activity size={16} aria-hidden="true" />
        </button>
      ) : (
        <section
          className={styles.panel}
          id="live-ecosystem-snapshot"
          aria-labelledby="live-ecosystem-title"
          aria-live="polite"
        >
          <header className={styles.header}>
            <div className={styles.headingGroup}>
              <span className={styles.liveDot} aria-hidden="true" />
              <div>
                <h2 className={styles.title} id="live-ecosystem-title">
                  Live ecosystem snapshot
                </h2>
                <p className={styles.subtitle}>
                  Production counts · refreshed every minute
                </p>
              </div>
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label="Close live ecosystem snapshot"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </header>

          <div className={styles.grid}>
            {METRIC_INFO.map(({ key, project, label, logo }) => {
              const metric = metrics[key];
              return (
                <article
                  className={styles.metric}
                  data-status={metric.status}
                  key={key}
                  aria-label={`${project}: ${formatCount(metric.value)} ${label.toLowerCase()}`}
                >
                  <div className={styles.metricTop}>
                    <Image
                      className={styles.logo}
                      src={logo}
                      alt=""
                      width={32}
                      height={32}
                    />
                    <span>{project}</span>
                  </div>
                  <strong className={styles.value}>{formatCount(metric.value)}</strong>
                  <span className={styles.label}>{label}</span>
                  <span className={styles.updated}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    {updateLabel(metric, key)}
                  </span>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
