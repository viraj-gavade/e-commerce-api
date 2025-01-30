import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Extend the AuthenticatedRequest interface to include the user data from the JWT payload
export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    username: string;
    role: string;  // Can be 'USER' or 'ADMIN'
  };
}

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    // Ensure the user is authenticated
    if (!req.user) {
      throw new ForbiddenException('Access denied. User is not authenticated.');
    }

    // Check if the user has the 'ADMIN' role
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied. Admins only.');
    }

    // Proceed to the next middleware or route handler if the user is an admin
    next();
  }
}
