var admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore')

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "/***** replace with your databaseURL ************/"
});

var db = getFirestore() ;

var lecturers = [
    {
        "email": "aaron.nelson@school.ac",
        "lastname": "Nelson",
        "teaching": {
            "courseTeaches": 3,
            "courses": [
                "cs103",
                "cs409",
                "int207"
            ]
        },
        "firstname": "Aaron",
        "id": "aaronnelson"
    },
    {
        "email": "adam.jer@school.ac",
        "lastname": "Jersey",
        "firstname": "Adam",
        "teaching": {
            "courseTeaches": 2,
            "courses": [
                "int105",
                "int205"
            ]
        },
        "id": "adamjersey"
    },
    {
        "firstname": "Alan",
        "lastname": "Smith",
        "teaching": {
            "courses": [
                "cs111",
                "cs202",
                "cs221"
            ],
            "courseTeaches": 3
        },
        "email": " alan.smith@school.ac",
        "id": "alansmith"
    },
    {
        "lastname": "Costa",
        "email": " alex.costa@school.ac",
        "teaching": {
            "courseTeaches": 1,
            "courses": [
                "mth101"
            ]
        },
        "firstname": "Alex",
        "id": "alexcosta"
    },
    {
        "firstname": "Antonio",
        "email": " antonio.florin@school.ac",
        "lastname": "Florin",
        "teaching": {
            "courses": [
                "cs103",
                "int207"
            ],
            "courseTeaches": 2
        },
        "id": "antonioflorin"
    },
    {
        "teaching": {
            "courseTeaches": 4,
            "courses": [
                "cs111",
                "cs221",
                "cs202",
                "cs409"
            ]
        },
        "email": "atiba.al@school.ac",
        "lastname": "Alvarez",
        "firstname": "Atiba",
        "id": "atibaalvarez"
    },
    {
        "lastname": "Morgan",
        "teaching": {
            "courseTeaches": 2,
            "courses": [
                "cs101",
                "cs103"
            ]
        },
        "firstname": "Jay",
        "email": "jay.morgan@school.ac",
        "id": "jaymorgan"
    },
    {
        "email": " josh.cm@school.ac",
        "teaching": {
            "courseTeaches": 3,
            "courses": [
                "cs101",
                "int207",
                "cs409"
            ]
        },
        "firstname": "Josh",
        "lastname": "Coleman",
        "id": "joshcoleman"
    },
    {
        "lastname": "Osman",
        "teaching": {
            "courseTeaches": 4,
            "courses": [
                "cs111",
                "cs202",
                "cs221",
                "cs409"
            ]
        },
        "email": " kingley.osman@school.ac",
        "firstname": "Kingley",
        "id": "kingleyosman"
    },
    {
        "teaching": {
            "courseTeaches": 1,
            "courses": [
                "chm302"
            ]
        },
        "firstname": "Martin",
        "email": " martin.orz@school.ac",
        "lastname": "Ortiz",
        "id": "martinortiz"
    },
    {
        "lastname": "Sherwill",
        "teaching": {
            "courseTeaches": 1,
            "courses": [
                "eng101"
            ]
        },
        "email": " sam.sherwill@school.ac",
        "firstname": "Samartha",
        "id": "samarthasherwill"
    },
    {
        "firstname": "Scott",
        "email": "scott.gard@school.ac",
        "teaching": {
            "courses": [
                "cs335",
                "cs409"
            ],
            "courseTeaches": 2
        },
        "lastname": "Garden",
        "id": "scottgarden"
    }
]

lecturers.forEach(function(obj){
    db.collection("lecturers").doc(obj.id).set({
        firstname: obj.firstname,
        lastname: obj.lastname,
        email: obj.email,
        teaching: obj.teaching,
    }).then( docRef => { console.log("Document written with ID : "+docRef.id)})
});


