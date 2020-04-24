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

export const login = async function login(credentials) {
    try {
        const response = Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
        return true
    } catch (error) {
        console.log('error', error);
        return false
    }
}

export const logout = async function logout() {
    try {
        const response = Firebase.auth().signOut()
        return true
    } catch (error) {
        console.log('error',error);
        return false
    }
}

export const getAuthState = async function getAuthState() {
    try {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
              console.log('logged in');
              return true
            }
            else{
              console.log('not logged in');
              return false
            }
        })
    } catch (error) {
        console.log('error',error);
        return false
    }
}