import "reflect-metadata";
import express from "express";
import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { StudentResolver } from "./resolvers/StudentResolver";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { Student } from "./entity/Student";
import {
  createStudentAccessToken,
  createStudentRefreshToken,
} from "./functions/studentAuth";
import {
  sendLecRefreshToken,
  sendRefreshToken,
} from "./functions/sendRefreshToken";
import { BatchResolver } from "./resolvers/BatchResolver";
import { LecturerResolver } from "./resolvers/Lecturer";
import { Lecturer } from "./entity/Lecturer";
import {
  createLecAccessToken,
  createLecRefreshToken,
} from "./functions/lecAuth";

(async () => {
  const app = express();
  app.use(cookieParser());
  app.get("/", (_req, res) => res.send("Welcome To Educa"));
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.sid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }
    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    //Valid Token
    const student = await Student.findOne({ stu_id: payload.stuId });
    if (!student) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (student.token_version !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(
      res,
      process.env.STUDENT_REFRESH_COOKIE!,
      createStudentRefreshToken(student)
    );

    return res.send({
      ok: true,
      accessToken: createStudentAccessToken(student),
    });
  });

  app.post("/refresh_token_lec", async (req, res) => {
    const token = req.cookies.lid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }
    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    //Valid Token
    const lecturer = await Lecturer.findOne({ lec_id: payload.lecId });
    if (!lecturer) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (lecturer.lec_token_version !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendLecRefreshToken(
      res,
      process.env.LECTURER_REFRESH_COOKIE!,
      createLecRefreshToken(lecturer)
    );

    return res.send({
      ok: true,
      accessToken: createLecAccessToken(lecturer),
    });
  });

  try {
    await createConnection();
  } catch (err) {
    console.log("Unable to connect to DB");
  }

  const apolloserver = new ApolloServer({
    schema: await buildSchema({
      resolvers: [StudentResolver, BatchResolver, LecturerResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloserver.applyMiddleware({ app });
  app.listen(process.env.PORT, () => {
    console.log("Express server listening on port " + process.env.PORT);
  });
})();
