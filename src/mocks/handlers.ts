// src/mocks/handlers.js
import { rest } from "msw";
import { faker } from '@faker-js/faker';

const people = Array.from({length:8}).map(_=>({name:faker.name.fullName(), something:faker.random.numeric(2)}));

export const handlers = [
  rest.get("/people", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(people)
    );
  }),
];
