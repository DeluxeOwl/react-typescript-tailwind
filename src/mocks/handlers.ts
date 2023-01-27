// src/mocks/handlers.js
import { rest } from "msw";
import { faker } from "@faker-js/faker";
import { last, sleep } from "radash";
import {z} from "zod";

const User = z.object({
  id:z.coerce.number(),
  email: z.coerce.string(),
  age:z.coerce.number()
})

type User = z.infer<typeof User>

const users: User[] = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  email: faker.internet.email(),
  age: faker.datatype.number({ min: 20, max: 30 }),
}));

const IdRequestParams = User.pick({id:true})
type IdRequestParams = z.infer<typeof IdRequestParams>

const CreateUserParams = User.omit({id:true})
type CreateUserParams = z.infer<typeof CreateUserParams>

export const handlers = [
  rest.get("/users", async (req, res, ctx) => {
    await sleep(500);
    return res(ctx.status(200), ctx.json(users));
  }),

  rest.post("/users", async (req, res, ctx) => {
    const jsonReq = await req.json();

    const result = await CreateUserParams.safeParse(jsonReq);

    if (!result.success) {
      return res(
        ctx.status(422),
      )
    }
    
    users.push({id:last(users)!.id+1, ...result.data})

    return res(ctx.status(200), ctx.json(users));
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
      ctx.json(users.filter((p) => p.id === result.data.id))
    );
  }),
];
