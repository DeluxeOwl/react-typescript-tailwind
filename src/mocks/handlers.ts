// src/mocks/handlers.js
import { rest } from "msw";
import { faker } from "@faker-js/faker";

const people = Array.from({ length: 8 }).map((_) => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  age: faker.datatype.number({ min: 20, max: 30 }),
}));

export const handlers = [
  rest.get("/people", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(people));
  }),
];
