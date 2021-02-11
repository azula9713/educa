import { Student } from "../entity/Student";
import { sign } from "jsonwebtoken";

export const createStudentAccessToken = (student: Student) => {
  return sign({ stuId: student.stu_id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createStudentRefreshToken = (student: Student) => {
  return sign(
    { stuId: student.stu_id, tokenVersion: student.token_version },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};
