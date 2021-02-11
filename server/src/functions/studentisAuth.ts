import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../Context";

export const stuIsAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const stuAuthorization = context.req.headers["authorization"];
  if (!stuAuthorization) {
    throw new Error("Not Authenticated");
  }

  try {
    const token = stuAuthorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
  }
  return next();
};
