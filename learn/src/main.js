import App from './App.svelte';
import { initializeApp } from "firebase/app";
import { getAuth,
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword
} from 'firebase/auth';

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
	apiKey: "AIzaSyAuRjqxZqoMmvFwp-dB5_PiTqV63gpucko",
	authDomain: "hello-world-2e275.firebaseapp.com",
	projectId: "hello-world-2e275",
	storageBucket: "hello-world-2e275.appspot.com",
	messagingSenderId: "807092374177",
	appId: "1:807092374177:web:59ab449be7c0eb94723ee0"
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