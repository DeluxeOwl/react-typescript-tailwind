// src/mocks/handlers.js
import { rest } from "msw";
import { faker } from "@faker-js/faker";
import { sleep } from "radash";
import {z} from "zod";

const User = z.object({
  id:z.coerce.number(),
  name: z.coerce.string(),
  age:z.coerce.number()
})

type User = z.infer<typeof User>

const people: User[] = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  name: faker.internet.email(),
  age: faker.datatype.number({ min: 20, max: 30 }),
}));

const IdRequestParams = User.pick({id:true})
type IdRequestParams = z.infer<typeof IdRequestParams>

export const handlers = [
  rest.get("/users", async (req, res, ctx) => {
    await sleep(500);
    return res(ctx.status(200), ctx.json(people));
  }),

  rest.get("/users/:id", async (req, res, ctx) => {
    await sleep(500);

    const result = IdRequestParams.safeParse(req.params);

    if (!result.success) {
      return res(
        ctx.status(422),
        ctx.json([])
      )
    }
    
    return res(
      ctx.status(200),
      ctx.json(people.filter((p) => p.id === result.data.id))
    );
  }),
];
