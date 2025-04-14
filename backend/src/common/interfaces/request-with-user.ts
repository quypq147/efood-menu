// src/common/interfaces/request-with-user.ts
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: { id: number; email: string; role?: string };
}
