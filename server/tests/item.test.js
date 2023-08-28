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

describe('Item Routes', () => {

    test('should fetch all items', async () => {
        const response = await request(app).get('/items').expect(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(1);
    });

    test('should fetch single item by id', async () => {
        const newItem = await Item.create({
            name: "Test Item",
            description: "This is a test item",
            price: 10.50,
            category: "test",
            image: "test-image.jpg"
        });

        const response = await request(app).get(`/items/${newItem.id}`).expect(200);
        expect(response.body.name).toBe(newItem.name);
    });

    test('should respond with 404 for non-existent item', async () => {
        await request(app).get('/items/999').expect(404);
    });

    test('should create a new item', async () => {
        const newItem = {
            name: "New Item",
            description: "Description for new item",
            price: 12.00,
            category: "new",
            image: "new-image.jpg"
        };

        const response = await request(app).post('/items/addItem').send(newItem).expect(200);
        expect(response.body.name).toBe(newItem.name);
    });

    test('should update an existing item', async () => {
        const item = await Item.create({
            name: "Old Name",
            description: "Old description",
            price: 9.00,
            category: "old",
            image: "old-image.jpg"
        });

        const updatedData = {
            name: "Updated Name",
            description: "Updated description",
            price: 10.00,
            category: "updated",
            image: "updated-image.jpg"
        };

        const response = await request(app).put(`/items/${item.id}`).send(updatedData).expect(200);
        expect(response.body.name).toBe(updatedData.name);
    });

    test('should delete an item', async () => {
        const item = await Item.create({
            name: "Item to delete",
            description: "This item will be deleted",
            price: 8.50,
            category: "delete",
            image: "delete-image.jpg"
        });

        await request(app).delete(`/items/${item.id}`).expect(200);

        const checkDeleted = await Item.findByPk(item.id);
        expect(checkDeleted).toBeNull();
    });

});