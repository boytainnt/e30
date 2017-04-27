import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDgFsOeXA-BM93497KHcWgfCeWsYMqDRj4",
    authDomain: "e30demo.firebaseapp.com",
    databaseURL: "https://e30demo.firebaseio.com",
    projectId: "e30demo",
    storageBucket: "e30demo.appspot.com",
    messagingSenderId: "1064065187418"
};

firebase.initializeApp(config);
var database = firebase.database();

const Functions = {
    Articles : 'articles'
}

const FirebaseAPI = {};

FirebaseAPI.getArticles = async(page, number) => {
    let start = page*number;
    let end = page*number + number;
    let articles = await database.ref(Functions.Articles).orderByKey().startAt(start.toString()).endAt(end.toString()).once('value');
    return articles.val();
}

FirebaseAPI.getArticleById = async(id) => {
    let article = await database.ref(Functions.Articles).orderByChild('id').equalTo(id).once('value');
    let val = article.val();
    let response = val[Object.keys(val)[0]];
    return response;
}

export default FirebaseAPI;







