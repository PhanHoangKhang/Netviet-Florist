type FetchAPIOptions = RequestInit & {
  errorMessage?: string;
};

export async function fetchAPI<T>(
  url: string,
  options: FetchAPIOptions = {},
): Promise<T> {
  const { errorMessage, headers, ...init } = options;

  const response = await fetch(url, {
    ...init,
    credentials: "same-origin",
    headers: {
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message ||
        errorMessage ||
        "Đã xảy ra lỗi khi gọi API.",
    );
  }

  return result as T;
}