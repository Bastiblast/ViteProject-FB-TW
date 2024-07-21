import { TrainingSession } from "./trainingSession.js"

export class TrainingTrain {

    constructor(cardId,listesMots){
this.trainingCard = document.createElement("div")
this.trainingCard.classList = `relative flex flex-col items-center w-1/4 
font-thin align-middle shadow-sm max-md:w-3/4 shadow-amber-300/80 bg-lime-300`
this.trainingCard.id = cardId
this.trainingCard.innerHTML = `

    <div id="training-count-box" class="block hidden flex flex-row float-right">
        <div id="training-counter"></div>
        <span>/</span>
        <div id="training-max-count"></div>
    </div>

    <p id="explanations" class="flex items-center text-xl font-semibold text-center rounded shadow-sm w-fit">
    Lis les différents mots et sélectionne le bon.</p>

    <select name="list" id="training-list-selector">
    </select>

    <p id="selected-list"></p>

    <div class="flex flex-row" id="training-buttons-selection">
    </div>

    <div class="hidden z-10 flex flex-col items-center p-3 m-3 text-center align-middle 
    rounded-xl bg-amber-200/70 w-fit" id="training-feedback"></div>
    
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
        id="training-modify">Modifier</button>

        <button class="p-2 m-3 bg-yellow-300 rounded-md shadow-md" 
        id="training-finish">Terminer</button>
    </div>


        `
        this.cardId = cardId
        this.listesMots = listesMots
        console.log("listesMots",listesMots)
        console.log("this.listesMots",this.listesMots)
        this.explanations = this.trainingCard.querySelector("#explanations")

        this.trainingList = this.trainingCard.querySelector("#training-list-selector")
        
        this.selectedList = this.trainingCard.querySelector("#selected-list")
        
        this.trainingCountBox = this.trainingCard.querySelector("#training-count-box")
        
        this.trainingCounter = this.trainingCard.querySelector("#training-counter")
        
        this.trainingMaxCount = this.trainingCard.querySelector("#training-max-count")

        this.startButton = this.trainingCard.querySelector("#training-start")
        
        this.startButton = this.trainingCard.querySelector("#training-start")

        this.validButton = this.trainingCard.querySelector("#training-valid")
        
        this.nextButton = this.trainingCard.querySelector("#training-next")
        
        this.modifyButton = this.trainingCard.querySelector("#training-modify")
        
        this.finishButton = this.trainingCard.querySelector("#training-finish")

        this.confirmButton = this.trainingCard.querySelector("#training-confirm")
        
        this.trainingFeedBack = this.trainingCard.querySelector("#training-feedback")

    this.boxButtons = this.trainingCard.querySelector("#training-buttons")
    this.boxTrainButtons = this.trainingCard.querySelector("#training-buttons-selection")
    
        this.initializeEventListenerOnButtonClick()

    }


    getStarted(){
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

    getBundleListe(){
        this.bundleList = this.listeDeMots.map(word => {
            console.log({word})
            console.log("word.liste.falseWord  : ",word.liste.falseWord)
           return  [word.liste.word,...word.liste.falseWord]})
    }

    hideAllMobileElement(){
        this.trainingCard.querySelectorAll("button")
        .forEach(button => button.classList.add("hidden"))
    }

    initializeEventListenerOnButtonClick(){
        this.startButton.addEventListener("click",() => {this.handlerEventOnStartClick()})
        this.validButton.addEventListener("click",() => {this.handlerEventOnValidClick()})
        this.nextButton.addEventListener("click",() => {this.handlerEventOnNextClick()})
        this.modifyButton.addEventListener("click",() => {this.handlerEventOnModifyClick()})
        this.confirmButton.addEventListener("click",() => {this.handlerEventOnConfirmClick()})
        this.trainingList.addEventListener("change",() => this.handlerEventOnSelectorClick())
        this.finishButton.addEventListener("click",() => {this.handlerEventOnFinishClick()})

    }

    handlerEventOnStartClick(){
        this.hideAllMobileElement()
        this.trainingCountBox.classList.remove("hidden")
        this.trainingList.classList.add("hidden")
        this.explanations.classList.add("hidden")
        this.selectedList.classList.add("hidden")
        this.selectedList.classList.add("hidden") 
        this.validButton.classList.add("hidden")
        const trainingSessionList = this.listesMots.filter(mot => 
            mot.id == this.trainingList.value)[0]
        this.trainer = new TrainingSession(trainingSessionList,Date.now())
        console.log(this.trainer)
        this.trainingMaxCount.textContent = this.trainer.wordList.length
        this.trainingCounter.textContent = 0
        this.handlerEventOnNextClick(this.trainer)
    }

    handlerEventOnValidClick(){

    }

    handlerEventOnNextClick(trainer){
        this.trainingCounter.textContent = this.trainer._trainingCount
        console.log("training session : ",trainer._remainingWord)
        if (this.trainer._remainingWord.length === 0){
            this.trainingEnd()
        } else {
        this.trainer.getNextBundle()
        this.boxTrainButtons.classList.remove("hidden")

        this.trainer._processingBundle
        .forEach(word => this.boxTrainButtons
            .insertAdjacentHTML("beforeend",`
            <button class="p-2 m-3 bg-yellow-300 rounded-md shadow-md"><span class="">${word}</span></button>
            `))
        const choseBtn = this.boxTrainButtons.querySelectorAll("button")
        console.log({choseBtn})
        choseBtn.forEach(btn => {
            btn.addEventListener("click",() => {
                this.trainer.newResult(btn.textContent)
                choseBtn.forEach(btn => btn.remove())
                this.handlerEventOnNextClick(this.trainer)}
            )
        })
}
    }

    trainingEnd(){
        this.trainingCountBox.classList.add("hidden")
        this.trainingFeedBack.classList.remove("hidden")
        this.finishButton.classList.remove("hidden")

        this.trainingFeedBack.insertAdjacentHTML("beforeend",this.trainer.renderResult())

    }

    trainButtonChoice(){
        this.handlerEventOnNextClick
    }

    handlerEventOnModifyClick(){

    }

    handlerEventOnConfirmClick(){

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