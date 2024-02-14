import { app } from "@/app"
import { prisma } from "@/lib/prisma"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe('Create Check-in Controller (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create check-in', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: 'JavaScript Gym',
                latitude: -23.3230874,
                longitude: -46.6085659
            }
        })

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -23.3230874,
                longitude: -46.6085659
            })

        expect(response.statusCode).toEqual(201)
    })
})