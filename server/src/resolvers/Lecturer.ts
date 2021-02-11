import { Lecturer } from "../entity/Lecturer";
import moment from "moment";
import { hash, verify as verifyEncrypt } from "argon2";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { LecContext } from "../Context";
import { stuIsAuth } from "../functions/studentisAuth";
import { sendLecRefreshToken } from "../functions/sendRefreshToken";
import { getConnection } from "typeorm";
import {
  createLecAccessToken,
  createLecRefreshToken,
} from "../functions/lecAuth";

@ObjectType()
class lecLoginResponse {
  @Field()
  accessToken: string;
  @Field(() => Lecturer)
  lecturer: Lecturer;
}

@Resolver()
export class LecturerResolver {
  @Query(() => [Lecturer])
  lecturers() {
    return Lecturer.find();
  }

  @Query(() => String)
  @UseMiddleware(stuIsAuth)
  lecAuth(@Ctx() { payload }: LecContext) {
    return `Your lecturer ID is: ${payload!.lecId}`;
  }

  @Query(() => String)
  hello() {
    return "hi!";
  }

  @Mutation(() => Boolean)
  async revokeLecRefreshToken(@Arg("lecId", () => Int) lecId: number) {
    await getConnection()
      .getRepository(Lecturer)
      .increment({ lec_id: lecId }, "lec_token_version", 1);

    return true;
  }

  @Mutation(() => lecLoginResponse)
  async lecLogin(
    @Arg("lec_email", () => String) lec_email: string,
    @Arg("lec_password", () => String) lec_password: string,
    @Ctx() { res }: LecContext
  ): Promise<lecLoginResponse> {
    const lecturer = await Lecturer.findOne({ where: { lec_email } });

    if (!lecturer) {
      throw new Error("Invalid Login Attempt!");
    }

    const valid = await verifyEncrypt(lecturer.lec_password, lec_password);
    if (!valid) {
      throw new Error("Incorrect passsword!");
    }

    //Login Success
    sendLecRefreshToken(
      res,
      process.env.LECTURER_REFRESH_COOKIE!,
      createLecRefreshToken(lecturer)
    );
    return {
      accessToken: createLecAccessToken(lecturer),
      lecturer,
    };
  }

  @Mutation(() => [String])
  async lecRegister(
    @Arg("lec_email", () => String) lec_email: string,
    @Arg("lec_password", () => String) lec_password: string,
    @Arg("lec_first_name", () => String) lec_first_name: string,
    @Arg("lec_last_name", () => String) lec_last_name: string,
    @Arg("lec_mobile", () => String) lec_mobile: string
  ) {
    const hashedPassword = await hash(lec_password);
    const email = await Lecturer.findOne({ where: { lec_email } });
    const mobile = await Lecturer.findOne({ where: { lec_mobile } });
    if (email) {
      throw new Error("Email is already registered!");
    }
    if (mobile) {
      throw new Error("Mobile Number is already registered!");
    }
    try {
      await Lecturer.insert({
        lec_email,
        lec_password: hashedPassword,
        lec_first_name,
        lec_last_name,
        lec_mobile,
        lec_reg_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });
    } catch (err) {
      console.log(err);
    }
    return [lec_email, lec_first_name, lec_last_name, lec_mobile];
  }
}
