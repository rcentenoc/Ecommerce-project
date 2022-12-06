import app from '../server.js';
import supertest from 'supertest';
import mongoose from 'mongoose';

// prueba de integración de la ruta /api/seed

describe('USE /api/seed', () => {
    // test es la prueba que vamos a ejecutar
    test('GET should respond with a 200 status code', async () => {
        // Supertest nos permite hacer peticiones HTTP
        const response = await supertest(app).get('/api/seed');
        // expect es la aserción que vamos a hacer
        expect(response.status).toBe(200);
    });

    test('GET should respond with an object', async () => {
        const response = await supertest(app).get('/api/seed');
        expect(response.body).toBeInstanceOf(Object);
    });
});

// prueba de integración de la ruta /init
describe('GET /init', () => {
    test('GET should respond with a 200 status code', async () => {
        const response = await supertest(app).get('/init');
        expect(response.status).toBe(200);
    });
});

// prueba de integración de la ruta /api/keys/paypal
describe('GET /api/keys/paypal', () => {
    test('GET should respond with a 200 status code', async () => {
        const response = await supertest(app).get('/api/keys/paypal');
        expect(response.status).toBe(200);
    });

    test('GET should respond with an object', async () => {
        const response = await supertest(app).get('/api/keys/paypal');
        // console.log("aquí el response.body: " + response.body);
        expect(response.body).toBeInstanceOf(Object);
    });
});

// prueba de integración de la ruta /api/products
describe('USE /api/products', () => {
    test('GET should respond with a 200 status code', async () => {
        const response = await supertest(app).get('/api/products');
        expect(response.status).toBe(200);
    });

    test('GET should respond with an Array', async () => {
        const response = await supertest(app).get('/api/products');
        expect(response.body).toBeInstanceOf(Array);
    });

    test('GET /slug should respond with a 200 status code', async () => {
        const response = await supertest(app).get('/api/products/slug/adidas-shirt');
        expect(response.status).toBe(200);
    });

    test('GET /id should respond with an object', async () => {
        const response = await supertest(app).get('/api/products/5f3d3f3e8f1a7a0e9c0a7e1a');
        expect(response.body).toBeInstanceOf(Object);
    });
});

// prueba de integración de la ruta /api/users
describe('USE /api/users', () => {

    test('POST /api/users/signin', async () => {
        const response = await supertest(app).post('/api/users/signin').send({
            email: 'test',
            password: 'test',
        });
        expect(response.status).toBe(401);
    });

    test('POST /api/users/signup', async () => {
        const response = await supertest(app).post('/api/users/signup').send({
            name: 'test',
            email: 'test',
            password: 'test',
            isAdmin: false,
        });
        expect(response.status).toBe(200);

        // console.log("aquí el response.body: " + response.body);
        expect(response.body).toBeInstanceOf(Object);

        // console.log("aquí el response.body.isAdmin: " + response.body.isAdmin);
        expect(response.body.isAdmin).toBe(false);

        // console.log("aquí el response.body.name: " + response.body.name);
        expect(response.body.name).toBe('test');

        // console.log("aquí el response.body.email: " + response.body.email);
        expect(response.body.email).toBe('test');

    });

    test('POST should have a content-type of application/json', async () => {
        const response = await supertest(app).post('/api/users/signup').send({
            name: 'test',
            email: 'test',
            password: 'test',
            isAdmin: false,
        });
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    test('POST should respond whith a task id', async () => {
        const response = await supertest(app).post('/api/users/signup').send({
            name: 'test',
            email: 'test',
            password: 'test',
            isAdmin: false,
        });
        // console.log("aquí el response.body._id: " + response.body._id);
        expect(response.body._id).toBeUndefined();
    });

});

// prueba de integración de la ruta /api/orders
describe('USE /api/orders', () => {

    test('POST /api/orders should respond with a 401 status code', async () => {
        const response = await supertest(app).post('/api/orders').send({
            orderItems: [{
                name: 'test',
                qty: 1,
                image: 'test',
                price: 1,
                product: 'test',
            }],
            shippingAddress: {
                fullName: 'test',
                address: 'test',
                city: 'test',
                postalCode: 'test',
                country: 'test',
            },
            paymentMethod: 'test',
            itemsPrice: 1,
            shippingPrice: 1,
            taxPrice: 1,
            totalPrice: 1,
        });
        expect(response.status).toBe(401);
    });

    test('GET /api/orders/:id should respond with a 200 status code', async () => {
        const response = await supertest(app).get('/api/orders/5f3d3f3e8f1a7a0e9c0a7e1a');
        console.log("aquí el response.body: " + response.body);
        expect(response.body).toBeInstanceOf(Object);
    });

    test('PUT /api/orders/:id/pay should respond with a 401 status code', async () => {
        const response = await supertest(app).put('/api/orders/5f3d3f3e8f1a7a0e9c0a7e1a/pay').send({
            id: 'test',
            status: 'test',
            update_time: 'test',
            email_address: 'test',
        });
        expect(response.status).toBe(401);
    });
});

describe('SERVER', () => {
    test('should listen on port 5000', () => {
        expect(app).toHaveProperty('listen');
    });

    test('should listen on port 5000', () => {
        expect(app.listen).toHaveProperty('bind');
    });
});

describe('MONGODB', () => {
    test('should connect to mongodb', () => {
        expect(mongoose).toHaveProperty('connect');
    });

    test('should disconnect from mongodb', () => {
        expect(mongoose).toHaveProperty('disconnect');
    });

    test('should have a connection', () => {
        expect(mongoose).toHaveProperty('connection');
    });

    test('should have a readyState of 1', () => {
        expect(mongoose.connection.readyState).toBe(1);
    });

    test('should have a host of localhost', () => {
        expect(mongoose.connection.host).toBe('localhost');
    });
});
