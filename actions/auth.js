import Firebase, {db} from '../config/firebase';
import { AsyncStorage } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

export const signUp = async function signUp(data) {
    try {
        const response = await Firebase.auth().createUserWithEmailAndPassword(data.email,data.password);
        console.log('user', response.user.uid)
        if(response.user.uid) {
            console.log('if user')
            const user = {
                email: data.email,
                name: data.name,
                longitude: 0,
                latitude: 0
            }
            const crowdcount = {
                userId:response.user.uid,
                count:0,
            }
            const mealTimes = {
                breakfast : 0,
                lunch : 0,
                dinner : 0,
            }
            await db.collection('users').doc(response.user.uid).set(user);
            await db.collection('crowdcount').doc(response.user.uid).set(crowdcount);
            await db.collection('mealTimes').doc(response.user.uid).set(mealTimes);
            await AsyncStorage.setItem("uid",String(response.user.uid) );    
            
            return true
        }
    } catch (error) {
        console.log('error', error);
        alert(error)
        return false
    }
}

export const login = async function login(credentials) {
    try {
        const response = await Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);      
        await AsyncStorage.setItem("uid",String(response.user.uid) );    
        return true;  

    } catch (error) {
        console.log('error', error);
        alert(error)
        return false;
    }
}

export const logout = async function logout() {
    try {
        const response = await Firebase.auth().signOut()
        const uid=await AsyncStorage.getItem('uid');
        const doc=await db.collection('crowdcount').doc(uid).get();
        const data=doc.data();
        Object.keys(data.places).map(async(place,index) => {     
            if(place!="home"){                
                await Location.stopGeofencingAsync(place);
            }else if(place=="home"){                
                await Location.stopGeofencingAsync("checkHomeTask");
            }       
        })        
        await AsyncStorage.removeItem('uid');
        await AsyncStorage.removeItem('expoPushToken');
        await Location.stopLocationUpdatesAsync("updateLoc");
        await TaskManager.unregisterAllTasksAsync();
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
              return true
            }
            else{
              return false
            }
        })
    } catch (error) {
        console.log('error',error);
        return false
    }
}