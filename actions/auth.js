import Firebase, {db} from '../config/firebase'

export const signUp = async function signUp(data) {
    try {
        const response = await Firebase.auth().createUserWithEmailAndPassword(data.email,data.password);
        if(response.user.uid) {
            const user = {
                email: data.email,
                name: data.name,
                longitude: 0,
                latitude: 0,
                count: 0
            }
            await db.collection('users').doc(response.user.uid).set(user);
            return true
        }
    } catch (error) {
        console.log('error', error);
        return false
    }
}

export const logOut = async function logOut() {
    try {
        const response = Firebase.auth().signOut()
        return true
    } catch (error) {
        console.log('error',error);
        return false
    }
}