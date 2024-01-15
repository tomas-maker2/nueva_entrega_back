import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:5000');

describe('Test de Eliminar Producto', () => {
    it('Debería eliminar un producto al hacer un DELETE en /api/products/:id', async () => {
        try {
            const response = await requester.delete(`/api/products/65a150e33349d1546f3becf0`);

            expect(response.status).to.equal(200); 

            expect(response.body).to.equal('Producto eliminado...');


        } catch (err) {
            console.error(err);
            throw err; 
        }
    });
});
