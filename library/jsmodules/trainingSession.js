export class TrainingSession {
    _trainingCount = 0
    constructor(trainingList,stampId){
        console.log("trainingList",trainingList)
        this.trainingList = trainingList
        this.wordList = trainingList.liste.map(list => list.word)
        this.stampId = stampId
    this._remainingWord = this.wordList
    this._trainingMaxCount = this.wordList.length

    }
    _processingWord = ""
    _processingBundle = ""
    _score = 0
    _result = []
    getRemainingWord(){
        
        if(!this._remainingWord){this._remainingWord = [...this.wordList]}
        console.log("START getRemainingWord return this._remainingWord ...",this._remainingWord)
        return this._remainingWord
    }

    Initialize(){
        
    console.log(this.wordList)
    }

    get totalWordCount(){
        return this.wordList.length
    }

    get score(){
        console.log("this._result")
        let score = 0
        this._result.forEach(res => {
            console.log("res",res)
            if(res.correct){score++}})
        return score
    }


    increaseScore(){
        this._score ++
    }
        get trainingMaxCount(){
            return this.wordList.length
        }
    trainingCountIncrement(){
        this._trainingCount += 1
    }

    newResult(input){
const newResult = {"word":this._processingWord,"answer":input,"correct":this._processingWord===input}
console.log(newResult)
this._result.push(newResult)
    }

    get trainingCountNumber(){
        return this._trainingCount
    }

    renderResult(){
        const result = [`<p>Ton score final est de ${this.score} sur ${this._trainingMaxCount}</p>.`]
        console.log("this._result",this._result)
        this._result.forEach(res => {
            const isCorrect = res.correct ? "égale à" : "différent de"
            const isCorrectClass = res.correct ? "bg-green-500" : "bg-red-500"
            result.push(`<p class="${isCorrectClass} p-2 rounded-md ring-2"><b>${res.answer}</b> est ${isCorrect} <b>${res.word}</b></p>`)
        })
        const joinResult = result.join(",").replaceAll(",","")
        console.log({joinResult})
        return joinResult
    }
    getNextWord(){
   
        this.trainingCountIncrement()
        if(!this._remainingWord){this._remainingWord = [...this.wordList]}
const ramdom = this.getRandomArbitrary(1, this._remainingWord.length)  - 1
//console.log({ramdom})      
this._processingWord = this._remainingWord.splice(ramdom,1)[0]
console.log("START getNextWord return this._processingWord   : ",this._processingWord )
return this._processingWord
}

getNextBundle(){
    const nextWord = this.getNextWord()
    console.log({nextWord})
    const fullWords = this.trainingList.liste.find(liste => liste.word === nextWord)
       console.log({fullWords})
   this._processingBundle = [fullWords.word,...fullWords.falseWord].sort()
   console.log(this._processingBundle)
    return this._processingBundle
}

    getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}

