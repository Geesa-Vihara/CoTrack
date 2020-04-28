import Firebase, {db} from '../config/firebase';

export const setMealTimes = async function setMealTimes(breakfast,lunch,dinner){
    try{
        const user = await Firebase.auth().currentUser;

        const mealTimes = {
            breakfast : breakfast,
            lunch : lunch,
            dinner : dinner,
        }

        await db.collection('users').doc(user.uid).update(mealTimes);
    }
    catch(e){
        console.log('error', error);
        alert(error)
    }
}