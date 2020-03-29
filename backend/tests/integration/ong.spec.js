const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connetion')

describe('ONG', () => {
    beforeAll(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('should be able to create a new ONG', async () => {
        const res = await request(app)
            .post('/ongs')
            .send({
                name: "Dode Lar Lauro",
                email: "docelar@docelar.com",
                whatsapp: "7878787878",
                city: "Salvador",
                uf: "BA"
            })
        expect(res.body).toHaveProperty('message')
        
    })

    it('should list ONG', async () => {
        return await request(app)
            .get('/ongs')
            .expect(200)
            .then(res => {
                expect(res.body[0].email).toBe('docelar@docelar.com')
            })
    })
})
