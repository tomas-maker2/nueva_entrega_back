import { expect } from 'chai';
import supertest from 'supertest';
import { userModel } from '../../src/dto/modules/user.js';

const requester = supertest('http://localhost:5000');

describe('Test de Obtener Todos los Usuarios', () => {
    it('Debería obtener todos los usuarios al hacer un GET en /api/users', async () => {
        try {
            
            const response = await requester.get('/api/users');

            expect(response.status).to.equal(200); 

            expect(response.body).to.be.an('array');


        } catch (err) {
            console.error(err);
            throw err; 
        }
    })
})