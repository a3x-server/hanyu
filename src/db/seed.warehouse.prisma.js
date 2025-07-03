import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.warehouse.createMany({
		data: [
			{ id: 0, warehouse: 'general' },
			{ id: 1, warehouse: 'alarma' },
			{ id: 2, warehouse: 'cctv' },
			{ id: 3, warehouse: 'cercos' },
			{ id: 4, warehouse: 'accesorios' },
			{ id: 5, warehouse: 'control' },
			{ id: 6, warehouse: 'wire' },
			{ id: 7, warehouse: 'power' },
			{ id: 8, warehouse: 'used' },
		],
	})
}

main()
	.then(() => console.log('Database seeded!'))
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
