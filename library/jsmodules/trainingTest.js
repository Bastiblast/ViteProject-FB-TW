import { TrainingSession } from "./trainingSession.js"

export class TrainingTest {
    results = []
    constructor(cardId,listesMots){

this.listesMots = listesMots        
this.trainingCard = document.createElement("div")
this.trainingCard.classList = `relative flex flex-col items-center w-1/4 h-auto 
font-thin align-middle shadow-sm max-md:w-3/4 shadow-amber-300/80 bg-lime-300`
this.trainingCard.id = cardId
this.trainingCard.innerHTML = `

    <div id="training-count-box" class="absolute top-0 right-0 flex flex-row float-right">
        <div id="training-counter"></div>
        <span>/</span>
        <div id="training-max-count"></div>
    </div>

    <p id="explanations" class="flex items-center text-xl font-semibold text-center rounded shadow-sm w-fit">
    Lis le mot puis réécris le lorsqu'il disparait.</p>

    <select name="list" id="training-list-selector">
    </select>

    <p id="selected-list"></p>

    <p id="training-next-word" class="flex items-center text-xl font-semibold rounded shadow-sm w-fit">
    Mot à écrire : </p>
    
    <p class="text-xl" id="training-word"></p>

    <div class="z-10 flex flex-col items-center p-3 m-3 text-center align-middle 
    rounded-xl bg-amber-200/70 w-fit" id="training-feedback"></div>

    <input autocapitalize="off" autocomplete="off" spellcheck="false" 
    class="text-xl text-center" type="text" placeholder="écris ce mot~" id="training-user-input">
    
    <div class="flex flex-row" id="training-buttons">
        <button class="p-2 m-3 bg-yellow-300 rounded-md shadow-md" 
        id="training-start">Commencer</button>

        <button class="p-2 m-3 bg-yellow-300 rounded-md shadow-md" 
        id="training-valid">Valider</button>

        <button class="p-2 m-3 bg-yellow-300 rounded-md shadow-md" 
        id="training-next">Suivant</button>

        <button class="p-2 m-3 bg-yellow-300 rounded-md shadow-md" 
        id="training-confirm">Confirmer</button>

        <button class="p-2 m-3 bg-yellow-300 rounded-md shadow-md" 
        id="training-finish">Terminer</button>

        <button class="p-2 m-3 bg-yellow-300 rounded-md shadow-md" 
        id="training-modify">Modifier</button>
    </div>

`

this.trainingWroteThis = this.trainingCard.querySelector("#training-next-word")

this.trainingWord = this.trainingCard.querySelector("#training-word")

this.explanations = this.trainingCard.querySelector("#explanations")

this.trainingList = this.trainingCard.querySelector("#training-list-selector")

this.selectedList = this.trainingCard.querySelector("#selected-list")

this.trainingCountBox = this.trainingCard.querySelector("#training-count-box")

this.trainingCounter = this.trainingCard.querySelector("#training-counter")

this.trainingMaxCount = this.trainingCard.querySelector("#training-max-count")

this.boxButtons = this.trainingCard.querySelector("#training-buttons")

this.allButtons = this.trainingCard.querySelectorAll("#training-buttons button")

this.startButton = this.trainingCard.querySelector("#training-start")

this.validButton = this.trainingCard.querySelector("#training-valid")

this.nextButton = this.trainingCard.querySelector("#training-next")

this.modifyButton = this.trainingCard.querySelector("#training-modify")

this.confirmButton = this.trainingCard.querySelector("#training-confirm")

this.finishButton = this.trainingCard.querySelector("#training-finish")

this.trainingFeedBack = this.trainingCard.querySelector("#training-feedback")

this.userInput = this.trainingCard.querySelector("#training-user-input")

this.displayElement = [this.finishButton, this.trainingList,this.trainingWord,this.selectedList,this.explanations,
    this.trainingWroteThis,this.startButton,this.validButton,this.modifyButton,
    this.confirmButton,this.nextButton,this.trainingFeedBack,this.userInput]


this.initializeEventListenerOnButtonClick()
}

    hideAllMobileElement(){
        this.displayElement.forEach(element => element.classList.add("hidden"))
    }

    hideAndReveal(){
        setTimeout(() => {
            this.trainingWord.classList.add("hidden")
            this.userInput.classList.remove("hidden")
            this.userInput.focus()
            this.userInput.select()
        },1000)
    }
    trainingCardLauncher(){
        this.hideAllMobileElement()
        document.querySelector("#display-card").classList.add("hidden") 
        this.trainingCounter.classList.remove("hidden")
        this.trainingMaxCount.classList.remove("hidden")
        this.trainingList.classList.remove("hidden")
        this.selectedList.classList.remove("hidden")
        this.startButton.classList.remove("hidden")
        this.explanations.classList.remove("hidden")
        Object.values(this.listesMots)
        .map(mot => mot["id"])
        .forEach(option => {
            console.log({option})
            const optionList = document.createElement("option")
            optionList.value = option
            optionList.textContent = option 
            this.trainingList.append(optionList)})

        this.selectedList.textContent = this.listesMots.filter(mot => 
            mot.id == this.trainingList.value)[0].liste.map(list => list.word)
document.querySelector("#main-view").append(this.trainingCard)
    }



    initializeEventListenerOnButtonClick(){
        this.startButton.addEventListener("click",() => {this.handlerEventOnStartClick()})
        this.validButton.addEventListener("click",() => {this.handlerEventOnValidClick()})
        this.nextButton.addEventListener("click",() => {this.handlerEventOnNextClick()})
        this.modifyButton.addEventListener("click",() => {this.handlerEventOnModifyClick()})
        this.confirmButton.addEventListener("click",() => {this.handlerEventOnConfirmClick()})
        this.trainingList.addEventListener("change",() => {this.handlerEventOnSelectorClick()})
        this.finishButton.addEventListener("click",() => {this.handlerEventOnFinishClick()})
    }

    handlerEventOnStartClick(){
        this.hideAllMobileElement()
        this.trainingCountBox.classList.remove("hidden")
        this.selectedList.classList.add("hidden")
        this.trainingWord.classList.remove("hidden")
        this.trainingWroteThis.classList.remove("hidden")
        this.validButton.classList.remove("hidden")
        const thatList = this.selectedList.textContent.split(",")
        console.log({thatList})
        const trainingSessionList = this.listesMots.filter(mot => 
            mot.id == this.trainingList.value)[0]
        this.trainer = new TrainingSession(trainingSessionList,Date.now())
        console.log(this.trainer)
        this.trainingMaxCount.textContent = this.trainer.wordList.length
        this.trainingCounter.textContent = 0
        this.handlerEventOnNextClick(this.trainer)
    }

    handlerEventOnValidClick(){
        if (this.userInput.value){
            console.log("click")
            this.hideAllMobileElement()
            this.trainingFeedBack.classList.remove("hidden")
            this.modifyButton.classList.remove("hidden")
            this.confirmButton.classList.remove("hidden")
            this.trainingFeedBack.innerHTML = `Ta réponse est <strong>${this.userInput.value}</strong> confirmer ?`
        }
    }

    handlerEventOnNextClick(){
        console.log("click")
        this.hideAllMobileElement()
        this.trainingWroteThis.classList.remove("hidden")
        this.trainingWord.classList.remove("hidden")
        this.validButton.classList.remove("hidden")
        this.trainingWord.textContent = this.trainer.getNextWord()
        console.log("this.trainingList",this.trainer.trainingList)
        this.hideAndReveal()
    }

    handlerEventOnModifyClick(){
        this.hideAllMobileElement()
        this.userInput.value = null
        this.trainingWroteThis.classList.remove("hidden")
        this.trainingWord.classList.remove("hidden")
        this.validButton.classList.remove("hidden")
        this.hideAndReveal()
        console.log("click")
    }

    handlerEventOnConfirmClick(){
        this.trainer.newResult(this.userInput.value)
        this.userInput.value = null
        this.trainingCounter.textContent = this.trainer._trainingCount
        console.log("click")
        if (this.trainer._trainingCount === this.trainer._trainingMaxCount){
            this.hideAllMobileElement()
            this.trainingFeedBack.classList.remove("hidden")
            this.finishButton.classList.remove("hidden")
            this.trainingFeedBack.innerHTML = this.trainer.renderResult()
        } else {
        this.handlerEventOnNextClick()}
    }

    handlerEventOnSelectorClick(){
        this.selectedList.textContent = this.listesMots.filter(mot => 
            mot.id == this.trainingList.value)[0].liste.map(list => list.word)       
    }

    handlerEventOnFinishClick(){
        document.querySelector("#display-card").classList.remove("hidden") 
        this.trainingFeedBack.innerHTML = null
        this.trainingFeedBack.classList.add("hidden")
        this.trainingCard.remove()

    }
}