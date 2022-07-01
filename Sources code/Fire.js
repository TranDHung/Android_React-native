import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDMZrybpi3ca0O79YjNJ80K9cSMXN8q0Ws",
    authDomain: "todolistapp-98b33.firebaseapp.com",
    projectId: "todolistapp-98b33",
    storageBucket: "todolistapp-98b33.appspot.com",
    messagingSenderId: "523623725647",
    appId: "1:523623725647:web:1c98ed6f26166ddd48483a"
};

class Fire{
    constructor(cb) {
        this.init(cb);
    }
    init(cb) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                cb(null, user);
            }else{
                firebase.auth().signInAnonymously().catch(error => {
                    cb(error);
                });
            }
        });
    }

    getList(cb) {
        let ref = this.ref.orderBy('date', "desc");

        this.unsubcribe = ref.onSnapshot(snapshot => {
            lists = []

            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data()});

            });
            
            cb(lists);
        })
    }

    addTask(list) {
        let ref = this.ref;

        ref.add(list);
    }

    updateTask(list) {
        let ref = this.ref;
        ref.doc(list.id).update({listTask: list.listTask});
    }

    deleteTask(list) {
        let ref = this.ref;
        // console.log(ref);
        ref.doc(list.id).delete();
    }
    deleteAll() {
        let ref = this.ref;
        ref.get()
        .then(res => {
          res.forEach(element => {
            element.ref.delete();
          });
        });
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    get ref() {
        return firebase.firestore().collection('users').doc("LYP9QnQPZwcrh2O9NtkGvtlZJvq2").collection("lists");
    }

    // detach() {
    //     this.unsubcribe();
    // }
}

export default Fire;