var admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore')

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "/***** replace with your databaseURL ************/"
});

var db = getFirestore() ;

var students = [
    {
        "Major": "Information Technology",
        "GPAX": 3,
        "lastname": "Larson",
        "firstname": "Albert",
        "courseRegistered": [
            "int205",
            "int207"
        ],
        "nation": "England",
        "Year": 2,
        "dob": {
            "seconds": 979651609,
            "nanoseconds": 157000000
        },
        "graduated": false,
        "id": "albertlarson",
        "trancripts": [
            {
                "semester": 1,
                "grades": {
                    "int205": 3,
                    "int207": 3
                },
                "GPA": 3,
                "year": 2
            }
        ]
    },
    {
        "Major": "Database School",
        "GPAX": 4,
        "Year": 2,
        "nation": "Universe",
        "firstname": "Database",
        "dob": {
            "seconds": 1118686920,
            "nanoseconds": 0
        },
        "lastname": "Slayer",
        "graduated": false,
        "courseRegistered": [
            "int105",
            "int205"
        ],
        "id": "databaseslayer",
        "trancripts": [
            {
                "grades": {
                    "int105": 4
                },
                "GPA": 4,
                "year": 1,
                "semester": 2
            },
            {
                "semester": "1",
                "grades": {
                    "int205": 4
                },
                "GPA": 4,
                "year": 2
            }
        ]
    },
    {
        "firstname": "Graham",
        "graduated": false,
        "Major": "Mathematic",
        "Year": 1,
        "nation": "United Kingdom",
        "GPAX": 2.56,
        "dob": {
            "seconds": 972388680,
            "nanoseconds": 0
        },
        "courseRegistered": [
            "int205",
            "mth101"
        ],
        "lastname": "Flower",
        "id": "grahamflower",
        "trancripts": [
            {
                "year": 1,
                "semester": "2",
                "grades": {
                    "mth101": 2.5,
                    "int205": 2.62
                },
                "GPA": 2.56
            }
        ]
    },
    {
        "courseRegistered": [
            "cs101",
            "cs103",
            "int105",
            "int205",
            "int207"
        ],
        "GPAX": 3.05,
        "nation": "Brazil",
        "firstname": "Gustavo",
        "Major": "Information Technology",
        "dob": {
            "seconds": 930031620,
            "nanoseconds": 0
        },
        "graduated": true,
        "lastname": "Uxios",
        "Year": 4,
        "id": "gustavouxios",
        "trancripts": [
            {
                "GPA": 3,
                "semester": 1,
                "grades": {
                    "cs103": 2.95,
                    "cs101": 3.1
                },
                "year": 1
            },
            {
                "GPA": 3,
                "grades": {
                    "int207": 3,
                    "int205": 3
                },
                "year": 2,
                "semester": 1
            },
            {
                "year": 1,
                "GPA": 3,
                "semester": 2,
                "grades": {
                    "int105": 3
                }
            }
        ]
    },
    {
        "GPAX": 2.78,
        "Year": 1,
        "lastname": "Simpson",
        "firstname": "Hector",
        "courseRegistered": [
            "cs101"
        ],
        "Major": "Computer Science",
        "graduated": false,
        "dob": {
            "seconds": 1023747792,
            "nanoseconds": 866000000
        },
        "nation": "United Kingdom",
        "id": "hectorsimpson",
        "trancripts": [
            {
                "GPA": 2.78,
                "grades": {
                    "cs101": 2.78
                },
                "semester": 1,
                "year": 1
            }
        ]
    },
    {
        "Year": 1,
        "Major": "Food Science",
        "dob": {
            "seconds": 898626060,
            "nanoseconds": 0
        },
        "nation": "United Kingdom",
        "firstname": "Jacob",
        "courseRegistered": [
            "chm302",
            "eng101",
            "mth101"
        ],
        "GPAX": 3.43,
        "lastname": "Ramsey",
        "graduated": false,
        "id": "jacobramsey",
        "trancripts": [
            {
                "semester": 2,
                "year": 1,
                "grades": {
                    "chm302": 3.29
                },
                "GPA": 3.29
            },
            {
                "semester": 1,
                "GPA": 3.5,
                "grades": {
                    "eng101": 4,
                    "mth101": 3
                },
                "year": 1
            }
        ]
    },
    {
        "Major": "Computer Engineering",
        "courseRegistered": [
            "int205",
            "int105"
        ],
        "dob": {
            "seconds": 777685365,
            "nanoseconds": 72000000
        },
        "lastname": "Svenberg",
        "nation": "Sweden",
        "graduated": false,
        "Year": 2,
        "GPAX": 3.65,
        "firstname": "Mikes",
        "id": "mikessvenberg",
        "trancripts": [
            {
                "year": 1,
                "GPA": 3.5,
                "semester": 2,
                "grades": {
                    "int105": 3.5
                }
            },
            {
                "semester": 1,
                "grades": {
                    "int205": 3.8
                },
                "GPA": 3.8,
                "year": 2
            }
        ]
    },
    {
        "GPAX": 3.25,
        "Year": 4,
        "dob": {
            "seconds": 785761680,
            "nanoseconds": 0
        },
        "graduated": true,
        "Major": "Information Technology",
        "courseRegistered": [
            "cs101",
            "cs103",
            "cs111",
            "cs202",
            "cs221",
            "cs409",
            "eng101",
            "int105",
            "int205",
            "int207",
            "mth101"
        ],
        "lastname": "Clever",
        "firstname": "Pinnock",
        "nation": "United Kingdom",
        "id": "pinnockclever",
        "trancripts": [
            {
                "GPA": 3.25,
                "year": 1,
                "grades": {
                    "mth101": 3.5,
                    "cs103": 3,
                    "cs101": 3,
                    "cs111": 3.5
                },
                "semester": 1
            },
            {
                "grades": {
                    "cs409": 3.25
                },
                "semester": 2,
                "year": 4,
                "GPA": 3.25
            },
            {
                "GPA": "3.25",
                "year": 2,
                "grades": {
                    "eng101": 3.25
                },
                "semester": 2
            },
            {
                "semester": 2,
                "grades": {
                    "int105": 3.25,
                    "cs202": 3.25
                },
                "year": 1,
                "GPA": 3.25
            },
            {
                "GPA": 3.25,
                "semester": 1,
                "grades": {
                    "int205": 3.25,
                    "cs221": 3,
                    "int207": 3.5
                },
                "year": 2
            }
        ]
    },
    {
        "lastname": "Lewandowski",
        "Major": "Chemical",
        "firstname": "Robert",
        "nation": "Poland",
        "GPAX": 3.67,
        "dob": {
            "seconds": 588161772,
            "nanoseconds": 867000000
        },
        "Year": 4,
        "graduated": true,
        "courseRegistered": [
            "chm302"
        ],
        "id": "robertlewandowski",
        "trancripts": [
            {
                "semester": 1,
                "grades": {
                    "chm302": 3.67
                },
                "GPA": 3.67,
                "year": 4
            }
        ]
    },
    {
        "dob": {
            "seconds": 895476780,
            "nanoseconds": 0
        },
        "courseRegistered": [
            "cs111",
            "cs202"
        ],
        "GPAX": 3,
        "Major": "Computer Science",
        "lastname": "Dias",
        "nation": "Portugal",
        "graduated": false,
        "firstname": "Ruben",
        "Year": 2,
        "id": "rubendias",
        "trancripts": [
            {
                "semester": 1,
                "GPA": 3,
                "grades": {
                    "cs202": 3
                },
                "year": 2
            },
            {
                "year": 1,
                "GPA": 3,
                "semester": 1,
                "grades": {
                    "cs111": 3
                }
            }
        ]
    }
]

students.forEach(function(obj){
    db.collection("students").doc(obj.id).set({
        firstname: obj.firstname,
        lastname: obj.lastname,
        Major: obj.Major,
        GPAX: obj.GPAX,
        Year: obj.Year,
        dob: obj.dob,
        courseRegistered: obj.courseRegistered,
        nation: obj.nation,
        graduated: obj.graduated,
    }).then( docRef => { 
        obj.trancripts.forEach(transcript => {
            db.collection("students").doc(obj.id).collection("transcrips").add({
              year: transcript.year,
              semester: transcript.semester,
              GPA: transcript.GPA,
              grades: transcript.grades
            });
        });
    })
});