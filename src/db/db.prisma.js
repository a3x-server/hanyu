import { PrismaClient } from '@prisma/client'

const PrismaClientSingleton = () => {
	return new PrismaClient()
}

const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma ?? PrismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// const prisma = new PrismaClient()
export default prisma
