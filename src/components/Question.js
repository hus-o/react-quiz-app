import React, { Component } from 'react';
import axios from "axios"

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "",
            questions: [],
            userOneAnswers: [],
            userTwoAnswers: []
         }
    }

    async apiCall(){
        console.log(this.props)
        const questionAmount = this.props.location.state.questionAmount;
        const category = this.props.location.state.category;
        const difficulty = this.props.location.state.difficulty;
        try{
            const apiResponse = await axios(`https://opentdb.com/api.php?amount=${questionAmount}&category=${category}&difficulty=${difficulty}&type=multiple`)
            return apiResponse.data.results
            /* this.setState({questions:apiResponse.data.results})
            console.log(this.state.questions) */
        }
        catch(err){
            this.setState({errorMessage:err})
        }
    }

    randomSort(array){
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array
        }
          

    randomiseQuestions(apiData){
        console.log(apiData)
        const newQuestionArray = []
        const tempArray = []
        apiData.forEach(element => {
            tempArray.push(element.correct_answer, ...element.incorrect_answers)
            newQuestionArray.push(tempArray.splice(0,4))
        })
        console.log(newQuestionArray)
        newQuestionArray.forEach(element => this.randomSort(element))
        console.log(newQuestionArray)
        /* this.setState({questions:newQuestionArray}) */
    }

    componentDidMount() {
        this.apiCall().then(response => {
            this.randomiseQuestions(response)
        })
        /* if (this.state.questions.length > 1){this.randomiseQuestions()} */
    }


    render() { 
        const questionItems = this.state.questions;
        console.log(questionItems)
        return (
            <div>
                {questionItems.length > 0 ?
                
                questionItems.map(item => (
                    <div>
                    <h5>{item.question}</h5>
                    <br />
                    <label>{item.correct_answer}</label>
                    <input type="radio" name="question" id={item.index} value={item.correct_answer} />
                    <label>{item.incorrect_answers[0]}</label>
                    <input type="radio" name="question" id={item.index} value={item.incorrect_answers[0]} />
                    <label>{item.incorrect_answers[1]}</label>
                    <input type="radio" name="question" id={item.index} value={item.incorrect_answers[1]} />
                    <label>{item.incorrect_answers[2]}</label>
                    <input type="radio" name="question" id={item.index} value={item.incorrect_answers[2]} />
                    </div> 
                ))
                
                :
                <h3>Loading</h3>}
            </div>
         );
    }
}





export default Question;