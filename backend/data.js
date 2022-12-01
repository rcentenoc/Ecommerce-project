import bcrypt from 'bcryptjs';

const data = {
    users:[
        { 
            name: 'Admin',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        { 
            name: 'efren',
            email: 'efren@duck.com',
            password: bcrypt.hashSync('Efren2022'),
            isAdmin: false,
        },
        { 
            name: 'fabricio',
            email: 'fab@duck.com',
            password: bcrypt.hashSync('Fab2022'),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: 'Nike Shirt',
            slug: 'nike-shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 120.00,
            countInStock: 15,
            brand: 'Nike',
            rating: 3.5,
            numReviews: 20,
            description: '80% Cotton, 20% Polyester',
        },
        {
            name: 'Adidas shirt',
            slug: 'adidas-shirt',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 210.00,
            countInStock: 15,
            brand: 'Adidas',
            rating: 3.8,
            numReviews: 20,
            description: '80% Cotton, 20% Polyester',
        },
        {
            name: 'Adidas Pants',
            slug: 'adidas-pants',
            category: 'Pants',
            image: '/images/p3.jpg',
            price: 159.00,
            countInStock: 15,
            brand: 'Adidas',
            rating: 3.5,
            numReviews: 20,
            description: '80% Cotton, 20% Polyester',
        },
        {
            name: 'Billabong pants',
            slug: 'billabong-pants',
            category: 'Pants',
            image: '/images/p4.jpg',
            price: 220.00,
            countInStock: 15,
            brand: 'Billabong',
            rating: 4.5,
            numReviews: 20,
            description: '80% Cotton, 20% Polyester',
        },
        {
            name: 'Doo shirt long',
            slug: 'doo-shirt-long',
            category: 'Shirts-long',
            image: '/images/p5.jpg',
            price: 99.00,
            countInStock: 15,
            brand: 'Doo Australia',
            rating: 2.5,
            numReviews: 20,
            description: '80% Cotton, 20% Polyester',
        },
        {
            name: 'Billabong shirt long',
            slug: 'Billabong-shirt-long',
            category: 'Shirts-long',
            image: '/images/p6.jpg',
            price: 129.00,
            countInStock: 5,
            brand: 'Billabong',
            rating: 3.5,
            numReviews: 6,
            description: '80% Cotton, 20% Polyester',
        },
        {
            name: 'Denim sweater',
            slug: 'Denim-sweater',
            category: 'Sweaters',
            image: '/images/p7.jpg',
            price: 149.00,
            countInStock: 15,
            brand: 'Denim',
            rating: 4.5,
            numReviews: 20,
            description: '90% Cotton, 10% Polyester',
        },
        {
            name: 'Adidas slippers',
            slug: 'Adidas-slippers',
            category: 'Slippers',
            image: '/images/p8.jpg',
            price: 219.00,
            countInStock: 15,
            brand: 'Adidas',
            rating: 3.9,
            numReviews: 15,
            description: 'High quality',
        },
        {
            name: 'Diaddora slippers',
            slug: 'Diaddora-slippers',
            category: 'Slippers',
            image: '/images/p9.jpg',
            price: 129.00,
            countInStock: 10,
            brand: 'Diaddora',
            rating: 4.5,
            numReviews: 35,
            description: 'High chinese quality',
        },
        {
            name: 'Denim shirt Pink floyd',
            slug: 'Denim-shirt',
            category: 'Shirts',
            image: '/images/p10.jpg',
            price: 69.00,
            countInStock: 15,
            brand: 'Denim',
            rating: 3.9,
            numReviews: 5,
            description: '90% Cotton, 10% Polyester',
        },
        // {
        //     name: 'Denim shirt Pink floyd basic',
        //     slug: 'Denim-shirt',
        //     category: 'Shirts',
        //     image: '/images/p11.jpg',
        //     price: 69.00,
        //     countInStock: 15,
        //     brand: 'Denim',
        //     rating: 2.9,
        //     numReviews: 15,
        //     description: '85% Cotton, 15% Polyester',
        // },
        // {
        //     name: 'Denim shirt',
        //     slug: 'Denim-shirt',
        //     category: 'Shirts',
        //     image: '/images/p12.jpg',
        //     price: 69.00,
        //     countInStock: 15,
        //     brand: 'Denim',
        //     rating: 2.3,
        //     numReviews: 20,
        //     description: '90% Cotton, 10% Polyester',
        // },
        // {
        //     name: 'Denim jeans basic',
        //     slug: 'Denim-jeans',
        //     category: 'Jeans',
        //     image: '/images/p13.jpg',
        //     price: 149.00,
        //     countInStock: 15,
        //     brand: 'Denim',
        //     rating: 4.9,
        //     numReviews: 20,
        //     description: 'Very high quality',
        // },
        // {
        //     name: 'University Jacket',
        //     slug: 'University-Jacket',
        //     category: 'Jackets',
        //     image: '/images/p14.jpg',
        //     price: 159.00,
        //     countInStock: 15,
        //     brand: 'University',
        //     rating: 2.5,
        //     numReviews: 40,
        //     description: 'Bird feathers brutally murdered',
        // },
        // {
        //     name: 'Doo Jacket',
        //     slug: 'Doo-Jacket',
        //     category: 'Jackets',
        //     image: '/images/p15.jpg',
        //     price: 99.00,
        //     countInStock: 35,
        //     brand: 'Doo',
        //     rating: 2.9,
        //     numReviews: 15,
        //     description: 'High quality',
        // },
        // {
        //     name: 'Stars Jacket',
        //     slug: 'Stars-Jacket',
        //     category: 'Jackets',
        //     image: '/images/p16.jpg',
        //     price: 89.00,
        //     countInStock: 10,
        //     brand: 'Stars',
        //     rating: 1.9,
        //     numReviews: 15,
        //     description: 'High quality',
        // },
        // {
        //     name: 'Doo Jeas',
        //     slug: 'Doo-Jeas',
        //     category: 'Jeans',
        //     image: '/images/p17.jpg',
        //     price: 159.00,
        //     countInStock: 13,
        //     brand: 'Doo',
        //     rating: 4.1,
        //     numReviews: 16,
        //     description: 'High quality',
        // },
        // {
        //     name: 'Denim Jeans blue',
        //     slug: 'Denim-Jeans',
        //     category: 'Jeans',
        //     image: '/images/p18.jpg',
        //     price: 169.00,
        //     countInStock: 15,
        //     brand: 'Denim',
        //     rating: 3.9,
        //     numReviews: 15,
        //     description: 'High quality',
        // },
        // {
        //     name: 'Aber cromb pants',
        //     slug: 'Aber-cromb-pants',
        //     category: 'Pants',
        //     image: '/images/p19.jpg',
        //     price: 119.00,
        //     countInStock: 15,
        //     brand: 'Aber',
        //     rating: 3.5,
        //     numReviews: 15,
        //     description: 'High quality',
        // },
        // {
        //     name: 'Adidas shirt long',
        //     slug: 'Adidas-shirt-long',
        //     category: 'Shirts-long',
        //     image: '/images/p20.jpg',
        //     price: 139.00,
        //     countInStock: 15,
        //     brand: 'Adidas',
        //     rating: 3.9,
        //     numReviews: 15,
        //     description: '50% Cotton, 50% Polyester',
        // }
    ],
};

export default data;