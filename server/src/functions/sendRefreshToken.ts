import { Response } from "express";

export const sendRefreshToken = (
  res: Response,
  cookieType: string,
  token: string
) => {
  res.cookie(cookieType, token, {
    httpOnly: true,
  });
};

export const sendLecRefreshToken = (
  res: Response,
  cookieType: string,
  token: string
) => {
  res.cookie(cookieType, token, {
    httpOnly: true,
  });
};
