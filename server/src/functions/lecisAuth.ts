import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { LecContext } from "../Context";

export const lecIsAuth: MiddlewareFn<LecContext> = ({ context }, next) => {
  const lecAuthorization = context.req.headers["authorization"];
  if (!lecAuthorization) {
    throw new Error("Not Authenticated");
  }

  try {
    const token = lecAuthorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
  }
  return next();
};
