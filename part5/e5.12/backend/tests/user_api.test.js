//  Command To Run the Foloowing test : npm test -- tests/user_api.test.js

import { test, describe, after, beforeEach } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import app from "../index.js";
import User from "../models/User.js";
import helper from "./test_helper.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  for (const user of helper.initialUsers) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(user.password, salt);
    const newUser = new User({
      username: user.username,
      name: user.name,
      passwordHash,
    });
    await newUser.save();
  }
});

describe("User API tests", () => {
  test("users are returned as JSON", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("a valid user can be added", async () => {
    const newUser = {
      username: "myks",
      name: "Michael Chandan",
      password: "micheal12989",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await helper.usersInDb();
    assert.strictEqual(response.length, helper.initialUsers.length + 1);
  });

  test("Username less then 3 characters cannot be added", async () => {
    const invalidUser = {
      username: "ch",
      name: "chandan",
      password: "chandan123",
    };

    const response = await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert.ok(response.body.error.includes("must be 3 or more characters"));
  });

  test("Password Must be more than 6 characters", async () => {
    const invalidUser = {
      username: "chandanm",
      name: "chandan",
      password: "cha12",
    };

    const response = await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert.ok(response.body.error.includes("more than 6 characters"));
  });
});

after(async () => {
  await mongoose.connection.close();
});
