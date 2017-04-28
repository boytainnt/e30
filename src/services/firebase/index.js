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
    Articles: 'articles',
    Users: 'users'
}

const FirebaseAPI = {};


//get {number} articles endAt {lastKey}
//reverse the data at the end
FirebaseAPI.getArticles = async(lastKey, number) => {
    //let start = page*number;
    //let end = page*number + number;
    //let articles = await database.ref(Functions.Articles).orderByKey().startAt(start.toString()).endAt(end.toString()).once('value');

    let articles = {
        val: []
    };

    if (lastKey !== undefined) {
        articles = await database.ref(Functions.Articles).orderByChild('id').endAt(lastKey).limitToLast(number + 1).once('value');
        articles = articles.val();
        articles = Object.keys(articles).map((key) => articles[key]);
        articles = articles.slice(0, -1);

    }
    else {
        articles = await database.ref(Functions.Articles).orderByChild('id').limitToLast(number).once('value');
        articles = articles.val();
        articles = Object.keys(articles).map((key) => articles[key]);
    }

    return articles.reverse();
}

//get an article by ID
FirebaseAPI.getArticleById = async(id) => {
    let article = await database.ref(Functions.Articles).orderByChild('id').equalTo(id).once('value');
    let val = article.val();
    let response = val[Object.keys(val)[0]];
    return response;
}

//create new article
FirebaseAPI.writeNewPost = (title, content) => {

    try {
        // Get a key for a new Article.
        var newPostKey = database.ref(Functions.Articles).push().key;

        // A post entry.
        var postData = {
            title: title,
            description: content,
            id: newPostKey
        };
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates[newPostKey] = postData;

        firebase.database().ref(Functions.Articles).update(updates);
        return ({
            success: true
        })
    }
    catch (error) {
        console.log(error);
        return ({
            success: false,
            error: error
        })
    }
}

//article: id, title
//to help performance better in tab your favorite
FirebaseAPI.addFavorite = (userid, article) => {

    try {
        // Get a key for a new Article.
        var newPostKey = database.ref(Functions.Users + '/' + userid).push().key;

        // A post entry.
        var postData = {
            date: new Date(),
            title: article.title
        }
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates[article.id] = postData;

        firebase.database().ref(Functions.Users + '/' + userid).update(updates);
        return ({
           success: true
        })
    }
    catch (error) {
        console.log(error);
        return ({
            success: false,
            error: error
        })
    }
}

FirebaseAPI.getFavorite = async(userid) => {
    // Get a key for a new Article.
    console.log(userid)
    let response = await database.ref(Functions.Users + '/' + userid).orderByChild('date').once('value');
    let articles = response.val();
    articles = Object.keys(articles).map((key)=>articles[key])
    console.log(articles)
    return articles;
}

export default FirebaseAPI;







