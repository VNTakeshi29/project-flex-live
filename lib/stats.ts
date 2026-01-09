export const STATS_NAMESPACE = "takeshi-project-flex";

export function getNamespace() {
  return STATS_NAMESPACE;
}

type CountApiResponse = {
  value?: number;
};

async function fetchCount(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`CountAPI error: ${res.status}`);
  }
  return (await res.json()) as CountApiResponse;
}

export async function fetchTotalViews() {
  const namespace = getNamespace();
  await fetchCount(`https://api.countapi.xyz/get/${namespace}/views`);
  const hitData = await fetchCount(`https://api.countapi.xyz/hit/${namespace}/views`);
  if (typeof hitData.value === "number") {
    return hitData.value;
  }
  throw new Error("Invalid CountAPI response");
}

export async function fetchUniqueVisitors() {
  const namespace = getNamespace();
  const today = new Date().toISOString().slice(0, 10);
  const storageKey = `uv:${today}`;
  const hasWindow = typeof window !== "undefined";
  const hasStorage = hasWindow && typeof localStorage !== "undefined";
  const seenToday = hasStorage ? localStorage.getItem(storageKey) === "true" : false;
  const endpoint = seenToday
    ? `https://api.countapi.xyz/get/${namespace}/visitors`
    : `https://api.countapi.xyz/hit/${namespace}/visitors`;
  const data = await fetchCount(endpoint);
  if (!seenToday && hasStorage) {
    localStorage.setItem(storageKey, "true");
  }
  if (typeof data.value === "number") {
    return data.value;
  }
  throw new Error("Invalid CountAPI response");
}
