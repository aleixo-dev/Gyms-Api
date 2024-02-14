import { app } from "@/app"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe('Create Gym Controller (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create gym', async () => {

        const { token } = await createAndAuthenticateUser(app, true)

        const response = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JavaScript Gym',
                description: 'some description',
                phone: '',
                latitude: -23.3230874,
                longitude: -46.6085659
            })

        expect(response.statusCode).toEqual(201)
    })
})