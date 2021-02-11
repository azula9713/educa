import { Student } from "../entity/Student";
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
import { MyContext } from "../Context";
import {
  createStudentAccessToken,
  createStudentRefreshToken,
} from "../functions/studentAuth";
import { stuIsAuth } from "../functions/studentisAuth";
import { sendRefreshToken } from "../functions/sendRefreshToken";
import { getConnection } from "typeorm";

@ObjectType()
class studentLoginResponse {
  @Field()
  accessToken: string;
  @Field(() => Student)
  student: Student;
}

@Resolver()
export class StudentResolver {
  @Query(() => [Student])
  students() {
    return Student.find();
  }

  @Query(() => String)
  @UseMiddleware(stuIsAuth)
  studentAuth(@Ctx() { payload }: MyContext) {
    return `Your student ID is: ${payload!.stuId}`;
  }

  @Query(() => String)
  hello() {
    return "hi!";
  }

  @Mutation(() => Boolean)
  async revokeStudentRefreshToken(@Arg("stuId", () => Int) stuId: number) {
    await getConnection()
      .getRepository(Student)
      .increment({ stu_id: stuId }, "token_version", 1);

    return true;
  }

  @Mutation(() => studentLoginResponse)
  async studentLogin(
    @Arg("stu_email", () => String) stu_email: string,
    @Arg("stu_password", () => String) stu_password: string,
    @Ctx() { res }: MyContext
  ): Promise<studentLoginResponse> {
    const student = await Student.findOne({ where: { stu_email } });

    if (!student) {
      throw new Error("Invalid Login Attempt!");
    }

    const valid = await verifyEncrypt(student.stu_password, stu_password);
    if (!valid) {
      throw new Error("Incorrect passsword!");
    }

    //Login Success
    sendRefreshToken(
      res,
      process.env.STUDENT_REFRESH_COOKIE!,
      createStudentRefreshToken(student)
    );
    return {
      accessToken: createStudentAccessToken(student),
      student,
    };
  }

  @Mutation(() => [String])
  async studentRegister(
    @Arg("stu_email", () => String) stu_email: string,
    @Arg("stu_password", () => String) stu_password: string,
    @Arg("stu_first_name", () => String) stu_first_name: string,
    @Arg("stu_last_name", () => String) stu_last_name: string,
    @Arg("stu_mobile", () => String) stu_mobile: string,
    @Arg("batch_id", () => Int) batch_id: number,
    @Arg("stu_is_approved", () => Boolean) stu_is_approved: boolean,
    @Arg("stu_is_allowed", () => Boolean) stu_is_allowed: boolean
  ) {
    const hashedPassword = await hash(stu_password);
    const email = await Student.findOne({ where: { stu_email } });
    const mobile = await Student.findOne({ where: { stu_mobile } });
    if (email) {
      throw new Error("Email is already registered!");
    }
    if (mobile) {
      throw new Error("Mobile Number is already registered!");
    }
    try {
      await Student.insert({
        stu_email,
        stu_password: hashedPassword,
        stu_first_name,
        stu_last_name,
        stu_mobile,
        batch_id,
        stu_is_allowed,
        stu_is_approved,
        stu_reg_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });
    } catch (err) {
      console.log(err);
    }
    return [
      stu_email,
      stu_first_name,
      stu_last_name,
      stu_mobile,
      batch_id,
      stu_is_allowed,
      stu_is_approved,
    ];
  }
}
