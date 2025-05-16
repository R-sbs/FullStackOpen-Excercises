// Command To Run the Following tests : npm test -- tests/blog_api.test.js
import { test, describe, after, beforeEach } from "node:test";
import listHelper from "./list_helper.js";
import assert from "node:assert";
import supertest from "supertest";
import app from "../index.js";
import mongoose from "mongoose";
import Blog from "../models/Blogs.js";
import helper from "./test_helper.js";

const api = supertest(app);

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();

  const loginUser = { username: "ranjanm", password: "ranjan123" };
  const res = await api.post("/api/login").send(loginUser);
  token = res.body.token;
});

test("blogs are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("to verify the unique identifier property of the blog posts is named id (not _id)", async () => {
  const response = await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`);
  response.body.forEach((blog) => {
    assert.ok(blog.id !== undefined, 'Expected "id" to be defined');
    assert.strictEqual(blog._id, undefined, 'Expected "_id" to be undefined');
  });
});

test("a valid Blog can be added ", async () => {
  const newBlog = {
    title: "React patterns in world of JS Universes",
    author: "Michael Chandan",
    url: "https://reactpatterns.com/",
    likes: 9,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  // const response = await helper.blogsInDb();

  // assert.strictEqual(response.length, helper.initialBlogs.length + 1);
});

describe("Missing Fields", () => {
  test("verifies that if the likes property is missing from the request, it will default to the value 0", async () => {
    const newBlog = {
      title: "React patterns in world of JS Universes",
      author: "Michael Chandan",
      url: "https://reactpatterns.com/",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    // console.log(response.body)

    assert.strictEqual(
      response.body.likes,
      0,
      "Expects to be likes value Zero"
    );
  });

  test("Checks if title/url is missing, server returns 400 Bad_Request", async () => {
    const newBlog = {
      // title: "React patterns in world of JS Universes",
      author: "Michael Chandan",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });
});

describe("Deletion of a blog", () => {
  test("Succeeds with 204 if id is valid", async () => {
    const blogsAll = await helper.blogsInDb();
    const blogToDelete = blogsAll[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsNow = await helper.blogsInDb();
    const titles = blogsNow.map((b) => b.title);
    assert(!titles.includes(blogToDelete.title));
    console.log(helper.blogsInDb.length);
    assert.strictEqual(blogsNow.length, blogsAll.length - 1);
  });
});

after(async () => {
  await mongoose.connection.close();
});
