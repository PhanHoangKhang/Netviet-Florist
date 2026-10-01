const requests = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

export function rateLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions
) {
  const now = Date.now();
  const current = requests.get(key);

  if (!current || now >= current.resetAt) {
    requests.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      success: true,
      remaining: limit - 1,
      retryAfter: 0,
    };
  }

  if (current.count >= limit) {
    return {
      success: false,
      remaining: 0,
      retryAfter: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;

  return {
    success: true,
    remaining: limit - current.count,
    retryAfter: 0,
  };
}