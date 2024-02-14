import { GymsRepository } from "@/repositories/gyms-repository"
import { Gym } from "@prisma/client"

interface FetchNearByGymsUseCaseRequest {
    userLatitude: number,
    userLongitude: number
}

interface FetchNearByGymsCUseaseResponse {
    gyms: Gym[]
}

export class FetchNeaUserByGymsCase {
    constructor(private gymsRepository: GymsRepository) { }

    async execute({ userLatitude, userLongitude }: FetchNearByGymsUseCaseRequest): Promise<FetchNearByGymsCUseaseResponse> {
        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude
        })

        return {
            gyms
        }
    }
}
