import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:5000');

describe('Test de Modificar Producto', () => {
    it('Debería Modificar un producto al hacer un PUT en /api/products/:id', async () => {

        // Datos actualizados del producto
        const updatedProductData = {
            description: "Producto actualizado",
        }; 

        try {
            const response = await requester.put(`/api/products/65a1502d936c3dd859c50080`).send(updatedProductData);

            expect(response.status).to.equal(200); 

            expect(response.body).to.equal('Producto MODIFICADO...');


        } catch (err) {
            console.error(err);
            throw err; 
        }
    });
});