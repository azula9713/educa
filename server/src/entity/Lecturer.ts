import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Timestamp,
} from "typeorm";

@ObjectType()
@Entity("Lecturers")
export class Lecturer extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  lec_id: number;

  @Field()
  @Column()
  lec_first_name: string;

  @Field()
  @Column()
  lec_last_name: string;

  @Field()
  @Column()
  lec_email: string;

  @Column()
  lec_password: string;

  @Field()
  @Column()
  lec_mobile: string;

  @Column("int", { default: 0 })
  lec_token_version: number;

  @Field(() => Date)
  @Column({ type: "timestamp" })
  lec_reg_date: Timestamp;
}
