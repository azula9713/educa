import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Timestamp,
} from "typeorm";

@ObjectType()
@Entity("Students")
export class Student extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  stu_id: number;

  @Field(() => Int)
  @Column()
  batch_name: string;

  @Field()
  @Column()
  stu_first_name: string;

  @Field()
  @Column()
  stu_last_name: string;

  @Field()
  @Column()
  stu_email: string;

  @Column()
  stu_password: string;

  @Field()
  @Column()
  stu_mobile: string;

  @Field()
  @Column()
  stu_is_approved: boolean;

  @Field()
  @Column()
  stu_is_allowed: boolean;

  @Column("int", { default: 0 })
  token_version: number;

  @Field(() => Date)
  @Column({ type: "timestamp" })
  stu_reg_date: Timestamp;
}
