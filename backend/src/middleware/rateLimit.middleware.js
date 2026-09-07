const ipBuckets = new Map();

const createAuthRateLimiter = ({ windowMs = 15 * 60 * 1000, max = 25 } = {}) => {
  return (req, res, next) => {
    const key = req.ip || "unknown";
    const now = Date.now();
    const bucket = ipBuckets.get(key);

    if (!bucket || now > bucket.expiresAt) {
      ipBuckets.set(key, {
        count: 1,
        expiresAt: now + windowMs,
      });
      return next();
    }

    if (bucket.count >= max) {
      return res.status(429).json({
        success: false,
        message: "Too many auth attempts. Please try again later.",
      });
    }

    bucket.count += 1;
    return next();
  };
};

export default createAuthRateLimiter;
