import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: 	process.env.FIREBASE_MEASUREMENT_ID,
}
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export async function upImages(bytes, name) {
	const storageRef = ref(storage, `hanyu/${name}`)
	// const folderRef = storageRef.child('')

	const resp = await uploadBytes(storageRef, bytes)

	if (!resp) return Response.send('Error al subir archivo')

	const URL = await getDownloadURL(storageRef).then((url) => {
		return url
	})
	return URL
}
