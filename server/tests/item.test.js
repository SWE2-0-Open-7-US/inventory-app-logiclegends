const { db, Item } = require('../models/index');
const request = require('supertest');
const express = require('express');
const itemRouter = require('../routes/items');

const app = express();
app.use(express.json());
app.use('/items', itemRouter);

beforeAll(async () => {
  await db.sync({ force: true });
});

afterAll(async () => {
  await db.close();
});

describe('Item Model', () => {

  test('should create a new item instance with expected attributes', async () => {
    const newItemData = {
      name: "Test Item",
      description: "This is a test item",
      price: 10.50,
      category: "test",
      image: "test-image.jpg"
    };

    const item = await Item.create(newItemData);

    expect(item).toBeInstanceOf(Item);

    expect(item.name).toBe(newItemData.name);
    expect(item.description).toBe(newItemData.description);
    expect(item.price).toBe(newItemData.price);
    expect(item.category).toBe(newItemData.category);
    expect(item.image).toBe(newItemData.image);
  });

});

