import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.product.createMany({
		data: [
			{
				id: 'd50fc2f7-0e94-4973-a335-9500c5a4ce61',
				fullname: 'Sensor de Movimiento',
				description: 'Sensor de movimiento AntiMascota Uso Interno PIR',
				trademark: 'Paradox',
				code: 'NV5',
				serial: 'nv5-13-alarma-sensor-movimiento-pir-cableado-dsc-paradox-10+alarma',
				barcode:
					'nv5-13-alarma-sensor-movimiento-pir-cableado-dsc-paradox-10+alarma',
				sku: 'nv5-13-alarma-sensor-movimiento-pir-cableado-dsc-paradox-10+alarma',
				img: 'https://firebasestorage.googleapis.com/v0/b/serverbkd-trifaxic-ts.appspot.com/o/trifaxic%2Faccesorios-sec-1300251124171684-25nov2024-trifaxic-pir202009140418-removebg-preview.png?alt=media&token=f64be5eb-db47-417d-8aa7-148def97c1eb',
				price_base: 13,
				delta: 30,
				divisa: 'usd',
				stock: 10,
				unity: '1',
				dimension: '',
				notes: '9 Metros lineales de alcance. Cableado. Compatible con todas las marcas.',
				tags: 'Alarma,sensor-movimiento,pir,cableado,dsc,paradox',
				category: 'PIR',
				warehouseId: 1,
				source: 'form-new-product',
			},
			{
				id: 'a1eba998-709a-4f68-95f4-2fc72895689d',
				fullname: 'Cable UTP N5e',
				description: 'Cable UTP Categoria 5e 305 metros (INTERIOR)',
				trademark: 'Westerlan',
				code: 'UTP305Int',
				serial: 'utp305int-35-cable-utp-cctv-interior-cat5e-305m-12+undefined',
				barcode:
					'utp305int-35-cable-utp-cctv-interior-cat5e-305m-12+undefined',
				sku: 'utp305int-35-cable-utp-cctv-interior-cat5e-305m-12+undefined',
				img: 'https://firebasestorage.googleapis.com/v0/b/serverbkd-trifaxic-ts.appspot.com/o/trifaxic%2Fwires%20(1).png?alt=media&token=2f7c22c2-c5c1-4964-bd6a-27ad071ba92b',
				price_base: 35,
				delta: 30,
				divisa: 'usd',
				stock: 12,
				unity: '1',
				dimension: '',
				notes: '',
				tags: 'cable,utp,cctv,interior,cat5e,305m',
				category: 'Wire',
				warehouseId: 2,
				source: 'form-new-product',
			},
			{
				id: 'e90dece5-f799-4687-a56d-92eaaf9e54cb',
				fullname: 'Batería Recargable 12V 4Ah',
				description: 'Batería Recargable 12V 4Ah Gel. Marca ts',
				trademark: 'ts',
				code: 'BAT124A',
				serial: 'bat124a-10-bateria-alarmas-12v-4ah-12+undefined',
				barcode: 'bat124a-10-bateria-alarmas-12v-4ah-12+undefined',
				sku: 'bat124a-10-bateria-alarmas-12v-4ah-12+undefined',
				img: 'https://firebasestorage.googleapis.com/v0/b/serverbkd-trifaxic-ts.appspot.com/o/trifaxic%2Fbat12v4ah.png?alt=media&token=7711c715-a00f-48e0-84b6-8851ebe765a9',
				price_base: 10,
				delta: 30,
				divisa: 'usd',
				stock: 12,
				unity: '1',
				dimension: '',
				notes: '',
				tags: 'bateria,alarmas,12v,4Ah',
				category: 'Battery',
				warehouseId: 1,
				source: 'form-new-product',
			},
			{
				id: '7097b89c-5a74-414d-a3c5-f78e9c253428',
				fullname: 'Batería Recargable 12V 7Ah',
				description: 'Batería Recargable 12V 7Ah. Marca ts',
				trademark: 'ts',
				code: 'BAT127A',
				serial: 'bat127a-15-bateria-alarmas-12v-7ah-10+undefined',
				barcode: 'bat127a-15-bateria-alarmas-12v-7ah-10+undefined',
				sku: 'bat127a-15-bateria-alarmas-12v-7ah-10+undefined',
				img: 'https://firebasestorage.googleapis.com/v0/b/serverbkd-trifaxic-ts.appspot.com/o/trifaxic%2Faccesorios-sec-700251124328900-25nov2024-trifaxic-jfl-bat-12-alarme.png?alt=media&token=416110cc-d9bc-4948-b414-62982227d44f',
				price_base: 15,
				delta: 30,
				divisa: 'usd',
				stock: 10,
				unity: '1',
				dimension: '',
				notes: '',
				tags: 'bateria,alarmas,12v,7Ah',
				category: 'Battery',
				warehouseId: 1,
				source: 'form-new-product',
			},
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
