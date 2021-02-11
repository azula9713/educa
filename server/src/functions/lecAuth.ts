import { Lecturer } from "../entity/Lecturer";
import { sign } from "jsonwebtoken";

export const createLecAccessToken = (lecturer: Lecturer) => {
  return sign({ lecId: lecturer.lec_id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createLecRefreshToken = (lecturer: Lecturer) => {
  return sign(
    { stuId: lecturer.lec_id, tokenVersion: lecturer.lec_token_version },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};
