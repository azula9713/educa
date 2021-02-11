import { Request, Response } from "express";

export interface MyContext {
  req: Request;
  res: Response;
  payload?: { stuId: string };
}

export interface LecContext {
  req: Request;
  res: Response;
  payload?: { lecId: string };
}
