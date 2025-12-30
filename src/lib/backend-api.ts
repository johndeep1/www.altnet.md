const normalizeBaseUrl = (value: string): string => value.replace(/\/+$/, "");

const resolvedBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;

if (!resolvedBaseUrl) {
  throw new Error(
    "Missing API base URL. Set NEXT_PUBLIC_API_BASE_URL or API_BASE_URL in your .env file."
  );
}

export const API_BASE_URL = normalizeBaseUrl(resolvedBaseUrl);

export const PUBLIC_API_BASE_URL = `${API_BASE_URL}/api/v1/public`;
export const CORE_API_BASE_URL = `${API_BASE_URL}/api/v1`;

export type PaginationMeta = {
  total: number;
  limit: number;
  offset: number;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object";

export const parseListResponse = <T>(payload: unknown): {
  data: T[];
  meta?: PaginationMeta;
} => {
  if (Array.isArray(payload)) {
    return { data: payload };
  }

  if (!isRecord(payload)) {
    return { data: [] };
  }

  const data = Array.isArray(payload.data) ? (payload.data as T[]) : [];
  const metaSource = isRecord(payload.meta)
    ? payload.meta
    : isRecord(payload.pagination)
    ? payload.pagination
    : null;

  if (!metaSource) {
    return { data };
  }

  const total = Number(metaSource.total ?? data.length);
  const limit = Number(metaSource.limit ?? data.length);
  const offset = Number(metaSource.offset ?? 0);

  return {
    data,
    meta: {
      total: Number.isFinite(total) ? total : data.length,
      limit: Number.isFinite(limit) ? limit : data.length,
      offset: Number.isFinite(offset) ? offset : 0,
    },
  };
};

export const buildQueryString = (
  params: Record<string, string | number | boolean | undefined>
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

export const safeNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
};

export const safeString = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

export const safeBoolean = (value: unknown, fallback = false): boolean =>
  typeof value === "boolean" ? value : fallback;

export const safeStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export const fetchJson = async <T>(
  url: string,
  init?: RequestInit
): Promise<T> => {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Backend request failed (${response.status})`);
  }
  return (await response.json()) as T;
};

export const pickFirstNumber = (...values: unknown[]): number | null => {
  for (const value of values) {
    const parsed = safeNumber(value);
    if (parsed !== null) return parsed;
  }
  return null;
};
