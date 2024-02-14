import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNeaUserByGymsCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNeaUserByGymsCase

describe('Fetch Nearby Gyms Use Case', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNeaUserByGymsCase(gymsRepository)
    })


    it('should be able to fetch nearby gyms', async () => {

        await gymsRepository.create({
            title: 'Near Gym',
            description: null,
            phone: null,
            latitude: -23.3230874,
            longitude: -46.6085659
        })

        await gymsRepository.create({
            title: 'Far Gym',
            description: null,
            phone: null,
            latitude: -23.0520591,
            longitude: -46.3488956,
        })

        const { gyms } = await sut.execute({
            userLatitude: -23.3230874,
            userLongitude: -46.6085659
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Near Gym' }),
        ])
    })
})