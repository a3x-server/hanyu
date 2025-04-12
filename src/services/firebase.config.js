import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyDtY78MIsdIewzuJ6I6qOvmMYhcZTjNK90',
	authDomain: 'serverbkd-trifaxic-ts.firebaseapp.com',
	projectId: 'serverbkd-trifaxic-ts',
	storageBucket: 'serverbkd-trifaxic-ts.appspot.com',
	messagingSenderId: '838920304648',
	appId: '1:838920304648:web:e28337b910c92ef893b9bd',
	measurementId: 'G-8PLBF6XVT0',
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export async function SubirFiles(bytes, name) {
	const storageRef = ref(storage, `trifaxic/${name}`)
	// const folderRef = storageRef.child('')

	const resp = await uploadBytes(storageRef, bytes)

	if (!resp) return Response.send('Error al subir archivo')

	const URL = await getDownloadURL(storageRef).then((url) => {
		return url
	})
	return URL
}
