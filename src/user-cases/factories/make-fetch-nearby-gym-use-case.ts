import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { FetchNeaUserByGymsCase } from "../fetch-nearby-gyms"

export function makeFetchNearbyGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new FetchNeaUserByGymsCase(gymsRepository)

    return useCase
}