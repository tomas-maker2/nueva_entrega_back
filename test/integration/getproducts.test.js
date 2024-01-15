import {expect} from 'chai'
import supertest from 'supertest';


const requester = supertest('http://localhost:5000')

describe('Test de Obtener Productos ', () => {
    it('Debería de obtener los productos al hacer un GET en /api/products', async () => {
        try {
            
            const response = await requester.get('/api/products');

            expect(response.status).to.equal(200); 

            expect(response.body).to.be.an('array');

        } catch (err) {
            console.error(err);
            throw err; 
        }
    })
})