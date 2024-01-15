import {expect} from 'chai'
import supertest from 'supertest';
import { productModel } from '../../src/dto/modules/product.js';


const requester = supertest('http://localhost:5000')

describe('Test de crear Producto ', () => {
    it('Debería de crear un producto al hacer un POST en /api/products', async () => {
        const productMock = {
            title: "holis",
            description: 'test1',
            img: 'imagen.png',
            categories: ['jkua'],
            size: 'grande',
            color: 'rojo',
            price: 43
        };

        try {
            const response = await requester.post('/api/products').send(productMock);

            expect(response.status).to.equal(200); 

            expect(response.body).to.have.property('title', productMock.title);
            expect(response.body).to.have.property('description', productMock.description);
            expect(response.body).to.have.property('img', productMock.img);

        } catch (err) {
            console.error(err);
            throw err; 
        }
    })
})