import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
	apiKey: "AIzaSyCCPO9DuMaEO-CdPmo7mr4nlUg8HG-eaeg",
    authDomain: "contact-list-bc111.firebaseapp.com",
    projectId: "contact-list-bc111",
    storageBucket: "contact-list-bc111.appspot.com",
    messagingSenderId: "652468915877",
    appId: "1:652468915877:web:5aaafc578509b2efcb074c"
}


export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()