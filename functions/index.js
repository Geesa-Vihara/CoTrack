const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

exports.onUpdateUserLocation = functions.firestore.document('users/{userId}').onUpdate((snapshot, context) => {
    const uid=context.params.userId
    const afterData = snapshot.after.data()
    UpdateUserLocation(afterData,uid);
    updateCount();
    return null;
});

function toRadians(degrees) {
	return degrees * Math.PI / 180;
}
function updateCount(){
    fetch(
        `https://hpb.health.gov.lk/api/get-current-statistical`
      )
      .then(res => res.json())
      .then(data => {
       console.log("local total cases = "+JSON.stringify(data.data.local_total_cases));
        this.setState({
          local_total: data.data.local_total_cases,
          global_total: data.data.global_total_cases,
          isLoading: false,
          
          });
         
          console.log("local cases"+local_total);
          console.log("blaaaaa");
      });
      
}
function UpdateUserLocation(data,id) {
    console.log('data:::'+JSON.stringify(data))
    var lon=data['longitude']
    var lat=data['latitude']
    var uid=id
    var count=0
    console.log("uid"+uid)
    console.log("lat"+lat)
    console.log("lon"+lon)
    admin.firestore().collection('users').get().then(async(snapshot)=>{
        await snapshot.docs.forEach(doc=>{
            var data=doc.data()
            var latitude=data['latitude']
            var longitude=data['longitude']
            var id=doc.id
            console.log('doc'+JSON.stringify(data))
            console.log('id'+id)
            console.log('latitude'+latitude)
            console.log('longitude'+longitude)
            var distance=6371*Math.acos(Math.cos(toRadians(lat))*Math.cos(toRadians(latitude))*Math.cos(toRadians(longitude)-toRadians(lon))+Math.sin(toRadians(lat))*Math.sin(toRadians(latitude)))           
            console.log("dist "+distance)
            if(distance<=0.005 && id!==uid){
                count++
            }
        })
        console.log("crowd"+count) 
        admin.firestore().collection('crowdcount').doc(uid).update({ count:count})
        return null;
        }
           
    ).catch(err=>console.log("err"+err))
}