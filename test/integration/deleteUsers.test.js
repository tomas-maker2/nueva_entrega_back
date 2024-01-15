import { expect } from 'chai';
import supertest from 'supertest';
import { userModel } from '../../src/dto/modules/user.js';

const requester = supertest('http://localhost:5000');

describe('Test de Eliminar Usuario', () => {
    it('Debería eliminar un usuario al hacer un DELETE en /api/users/:id', async () => {


        try {
            // Realizar la solicitud DELETE al endpoint /api/users/:id
            const response = await requester.delete(`/api/users/65a13fdc223c34acd9b902d8`);
            
            expect(response.status).to.equal(200); 

            expect(response.body).to.equal('Usuario eliminado...');


        } catch (err) {
            
            console.error(err);
            throw err; 
        }
    });
});
