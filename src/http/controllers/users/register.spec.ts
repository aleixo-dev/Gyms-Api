import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Controller (e2e)', () => {

    beforeAll(async () => {
        await app.ready() // verificar se a aplicaão está inicializada
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register', async () => {
        const response = await request(app.server)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: '123456'
            })

        expect(response.statusCode).toEqual(201)
    })
})