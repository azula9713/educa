import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Batch } from "../entity/Batch";

@Resolver()
export class BatchResolver {
  @Mutation(() => String)
  async createBatch(@Arg("batch_name") batch_name: string) {
    const batch = await Batch.findOne({
      where: { batch_name },
    });

    if (!batch) {
      try {
        await Batch.insert({
          batch_name,
        });
      } catch (err) {
        console.log(err);
      }

      return batch_name;
    } else {
      return [
        batch_name,
        "The student batch you entered is already in the system. Please use the existing one!",
      ];
    }
  }

  @Query(() => [Batch])
  viewBatches() {
    return Batch.find();
  }

  @Query(() => Batch)
  viewBatch(@Arg("batch_id", () => Int) batch_id: number) {
    return Batch.findOne({ where: { batch_id } });
  }
}
