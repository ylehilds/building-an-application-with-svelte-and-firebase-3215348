import App from './App.svelte';
import { initializeApp } from "firebase/app";
import { getAuth,
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword
} from 'firebase/auth';
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId} from '../environment.js'

import { getFirestore, collection, getDocs } from "firebase/firestore"

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
})

export default app;


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: apiKey,
	authDomain: authDomain,
	projectId: projectId,
	storageBucket: storageBucket,
	messagingSenderId: messagingSenderId,
	appId: appId
};

// Initialize Firebase
initializeApp(firebaseConfig);

//firestore initialization and config
const db = getFirestore()
const colRef = collection(db, 'cars')
getDocs(colRef) //get collection reference
	.then((snapshot) => {
		let cars = []
		snapshot.docs.forEach((doc) => {
			cars.push({...doc.data(), id: doc.id})
		})
		console.log(cars)
	})
	.catch(err => {
		console.log(err.message)
	})

const auth = getAuth()

//signup form
const usignUp = document.querySelector('.signup')
usignUp.addEventListener('submit', (e) => {
	e.preventDefault()


	const email = usignUp.email.value
	const pass = usignUp.password.value

	createUserWithEmailAndPassword(auth, email, pass)
		.then((cred) => {
			console.log('this user has been created:', cred.user)
			usignUp.reset()
		})
		.catch((err) => {
			console.log(err.message)
		})
})



//login and logout function

const ulogout = document.querySelector('.logout')
ulogout.addEventListener('click', () => {
	signOut(auth)
		.then(() => {
			console.log('Thank you for using our service today')
		})
		.catch((err) => {
			console.log(err.message)
		})

})

const ulogin = document.querySelector('.login')
ulogin.addEventListener('submit', (e) => {
	e.preventDefault()

	const umail = ulogin.email.value
	const upass = ulogin.password.value

	signInWithEmailAndPassword(auth, umail, upass)
		.then((cred) => {
			console.log('This user logged in', cred.user)
		})
		.catch((err) => {
			console.log(err.message)
		})
})