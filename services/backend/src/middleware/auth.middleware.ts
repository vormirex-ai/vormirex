import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });

  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Malformed token" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
    if (err || !decoded)
      return res.status(403).json({ message: "Invalid Token" });

    req.user = decoded;

    // Check if user is frozen or deleted in DB
    // We import User dynamically to avoid circular deps if any, though here it strictly depends on modules structure.
    // Assuming cleaner arch, we just import User at top. But let's check if we can import User model here.
    // Yes, we can import User model.
    import('../modules/user/user.model.js').then(async ({ default: User }) => {
       try {
          const payload = decoded as any; // Cast to any or CustomJWTPayload
          const user = await User.findById(payload.userId);
          if (!user) {
             return res.status(401).json({ message: "User no longer exists" });
          }
          if (user.isFrozen) {
             return res.status(403).json({ message: "Account is frozen. Contact support." });
          }
           next();
       } catch (dbErr) {
           return res.status(500).json({ message: "Auth Error" });
       }
    }).catch(err => next(err));
  });
};

export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next();
  }

  const token = header.split(' ')[1];
  if (!token) return next();

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
    if (!err && decoded) {
      req.user = decoded;
    }
    next();
  });
};
