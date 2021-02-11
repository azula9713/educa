import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity("Batches")
export class Batch extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  batch_id: number;

  @Field()
  @Column()
  batch_name: string;
}
