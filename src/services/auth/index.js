import * as firebase from 'firebase';
const FirebaseAuth = {};

FirebaseAuth.login = async(failCallback) =>{

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });

    try {
        let result = await firebase.auth().signInWithPopup(provider);
        // This gives you a Google Access Token. You can use it to access the Google API.
        //var token = result.credential.accessToken;
        // The signed-in user info.
        //var user = result.user;
    }
    catch(error){
        console.log(error)
        failCallback(error);
    };
}

FirebaseAuth.logout = async() =>{

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });

    try {
        await firebase.auth().signOut();
    }
    catch(error){
        //no handle yet
        console.log(error)
    };
}



export default FirebaseAuth;







