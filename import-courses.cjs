var admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore')

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "/***** replace with your databaseURL ************/"
});

var db = getFirestore() ;

var courses = [
    {
        "courseDescription": "Making of Nuclear. Making of Bomb.",
        "credit": 3,
        "studentEnrolled": 2,
        "courseId": "chm302",
        "courseName": "Chemical 3",
        "id": "chm302"
    },
    {
        "courseDescription": "Basic computer knowledge.",
        "courseId": "cs101",
        "credit": 3,
        "courseName": "Computer Science Fundamental",
        "studentEnrolled": 3,
        "id": "cs101"
    },
    {
        "courseName": "Computer Achitechture & Platform",
        "credit": 3,
        "courseId": "cs103",
        "courseDescription": "Computer Achitechture & Platform",
        "studentEnrolled": 2,
        "id": "cs103"
    },
    {
        "courseDescription": "Java",
        "studentEnrolled": 2,
        "credit": 3,
        "courseName": "Programing Fundamental",
        "courseId": "cs111",
        "id": "cs111"
    },
    {
        "courseDescription": "This make you a god.",
        "credit": 3,
        "studentEnrolled": 2,
        "courseId": "cs202",
        "courseName": "Data Structure & Algorithym",
        "id": "cs202"
    },
    {
        "courseId": "cs221",
        "studentEnrolled": 1,
        "courseName": "Advance Programing",
        "courseDescription": "another Java. but very deeper and very hard.",
        "credit": 3,
        "id": "cs221"
    },
    {
        "studentEnrolled": 0,
        "courseId": "cs335",
        "courseDescription": "This AI is not Adobe Illustrator. 😹",
        "courseName": "Artificial Intelligence",
        "credit": 3,
        "id": "cs335"
    },
    {
        "courseDescription": "This is the end. End of life? End of time?",
        "studentEnrolled": 1,
        "courseId": "cs409",
        "courseName": "Final Project",
        "credit": 3,
        "id": "cs409"
    },
    {
        "courseId": "eng101",
        "courseDescription": "All you need know about being an engineer.",
        "credit": 3,
        "courseName": "Engineering Fundamental",
        "studentEnrolled": 2,
        "id": "eng101"
    },
    {
        "courseId": "int105",
        "credit": 1,
        "studentEnrolled": 4,
        "courseDescription": "Understanding very basic database concept, structural and queries. ",
        "courseName": "Basic Database",
        "id": "int105"
    },
    {
        "credit": 3,
        "studentEnrolled": 6,
        "courseName": "Advance Database",
        "courseId": "int205",
        "courseDescription": "More deeper detail about database, design and performance customization.",
        "id": "int205"
    },
    {
        "courseDescription": "OMG what was that topology😱!!!!",
        "courseId": "int207",
        "studentEnrolled": 3,
        "credit": 2,
        "courseName": "Network 1",
        "id": "int207"
    },
    {
        "courseId": "mth101",
        "credit": 3,
        "courseName": "Mathematic 1",
        "courseDescription": "Very easy math. You all can get A grade.",
        "studentEnrolled": 2,
        "id": "mth101"
    }
]

courses.forEach(function(obj){
    db.collection("courses").doc(obj.id).set({
        courseId: obj.courseId,
        credit: obj.credit,
        courseName: obj.courseName,
        courseDescription: obj.courseDescription,
        studentEnrolled: obj.studentEnrolled,
    }).then( docRef => { console.log("Document written with ID : "+docRef.id)})
});


