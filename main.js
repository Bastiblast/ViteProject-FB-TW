import { TrainingTest } from "./library/jsmodules/trainingTest.js"
// import { listesMots } from "./library/jsmodules/listesMots.js"
import { TrainingTrain } from "./library/jsmodules/trainingTrain.js"
// Global Déclaration //
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js"
import { collection, getFirestore, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyABaXXkaq6MPBRbK-vdgdHMhwS3msZopcQ",
    authDomain: "bastiblast-hub.firebaseapp.com",
    projectId: "bastiblast-hub",
    storageBucket: "bastiblast-hub.appspot.com",
    messagingSenderId: "843435622232",
    appId: "1:843435622232:web:9fd351fd56ae820b766f2d",
    measurementId: "G-MBDXBDW2TC"
};

/*
// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()


const colRef = collection(db, 'flashcard')

getDocs(colRef)
.then(snapshot => {
    let lubrairy
    console.log(snapshot.docs)
snapshot.docs.forEach(SnapShot =>{
console.log(SnapShot.data())

})
})
*/

const actualDate = new Date()
const numeroSemaine = getWeekNumber(actualDate)

const displayCard = document.querySelector("#display-card")
//const displayBtn = displayCard.querySelector("#display-btn")
const testBtn = document.querySelector("#test-btn")
const trainingBtn = document.querySelector("#training-btn")

const messageWeekNumber = displayCard.querySelector("#message-week-number")

const listeMot16 = ["le mois", "la chambre", "l'année", "mes", "demain"]

machination()


// Training test

//test.trainingCardLauncher()

/*
newTest.getStarted()
newTest.handlerEventOnStartClick({
    "id": 14,
    "liste": [
        {
            "word": "le soir",
            "falseWord": [
                "lessoir",
                "le soar",
                "le seaur"
            ]
        },
        {
            "word": "le matin",
            "falseWord": [
                "le mattin",
                "le mathin",
                "le matain"
            ]
        },
        {
            "word": "le midi",
            "falseWord": [
                "le midie",
                "le mydi",
                "le middi"
            ]
        },
        {
            "word": "beau",
            "falseWord": [
                "baux",
                "bo",
                "beauh"
            ]
        },
        {
            "word": "un oiseau",
            "falseWord": [
                "un oaseau",
                "un oizeau",
                "un oiso"
            ]
        }
    ]
})
*/
//trainingTry()



function machination() {
    appendListeDesMots()
    eventOnTrainingBtnClick()
    eventOnGraduateBtnClick()
}

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return [weekNo];
}

function appendListeDesMots() {
    messageWeekNumber.textContent += numeroSemaine
    const ulListe = displayCard.querySelector("#liste-mots")
    const newDiv = document.createElement("div")
    newDiv.id = "la-liste"
    newDiv.textContent = listeMot16.join(" - ")
    ulListe.append(newDiv)
}


function eventOnGraduateBtnClick() {
    testBtn.addEventListener("click", function () {
        const stampId = new Date();

        fetch('./library/jsmodules/listesMots.json')
            .then((response) => response.json())
            .then((json) => {
                console.log(json);

                const newTrainingSession = new TrainingTest(stampId, json)

                newTrainingSession.trainingCardLauncher()
            });
    })

}

function eventOnTrainingBtnClick() {
    const stampId = new Date();

    fetch('./library/jsmodules/listesMots.json')
        .then((response) => response.json())
        .then((json) => {
            const newTrainingSession = new TrainingTrain(stampId, json)

            trainingBtn.addEventListener("click", function () { newTrainingSession.getStarted() })
        });


}
