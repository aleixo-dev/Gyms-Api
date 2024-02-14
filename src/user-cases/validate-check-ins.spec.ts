import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-ins'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let checkInsrepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {

    beforeEach(async () => {
        checkInsrepository = new InMemoryCheckInsRepository()
        sut = new ValidateCheckInUseCase(checkInsrepository)

        // await gymsRepository.create({
        //     id: 'gym-01',
        //     title: 'JavaScript Gym',
        //     description: '',
        //     phone: '',
        //     latitude: -23.3230874,
        //     longitude: -46.6085659
        // })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to validate the check-in', async () => {

        const createdCheckIn = await checkInsrepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInsrepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it('should not be able to validate an inexistent check-in', async () => {

        await expect(() =>
            sut.execute({
                checkInId: 'inexistent-id'
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

        const createdCheckIn = await checkInsrepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const TWENTY_ONE_MINUTES_IN_MS = 1000 * 60 * 21
        vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MS)

        await expect(() =>
            sut.execute({
                checkInId: createdCheckIn.id
            }),
        ).rejects.toBeInstanceOf(LateCheckInValidationError)
    })
})