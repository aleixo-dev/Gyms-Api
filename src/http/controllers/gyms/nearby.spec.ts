import { app } from "@/app"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe('Nearby Gym Controller (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to list nearby gyms', async () => {

        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JavaScript Gym',
                description: 'some description',
                phone: '119272727272',
                latitude: -23.3230874,
                longitude: -46.6085659
            })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'TypeScript Gym',
                description: 'some description',
                phone: '1192534455566',
                latitude: -23.0520591,
                longitude: -46.3488956,
            })

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude: -23.3230874,
                longitude: -46.6085659
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'JavaScript Gym'
            })
        ])
    })
})