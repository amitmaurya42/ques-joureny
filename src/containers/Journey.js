import React, { Component } from "react";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import Question from "../components/Question/Question";
import "./Journey.scss";
import data from "./data";
import * as actionTypes from "../store/actions/actionTypes";
import { connect } from "react-redux";

class Journey extends Component {
  componentDidMount() {
    this.props.loadQuestions(data);
  }
  backQuestion = ()=>{
    this.props.backQuestionAction();
  }
  render() {
    return (
      <div className="journey-component">
        <div className="progress-bar-wrapper">
          <ProgressBar questionPercentage={this.props.questionPercentage} />
          <button
            className={
              "previous-wrapper " +
              (this.props.currentQuestion.id === "1"
                ? "previous-wrapper--disabled"
                : "")
            }
            disabled={this.props.currentQuestion.id === "1"}
            onClick={this.backQuestion}
          >
            <div className="previous-arrow"></div>
            <span className="previous-question-text">Back</span>
          </button>
        </div>
        <div className="question-wrapper">
          <Question />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentQuestion: state.journey.currentQuestion,
  questions: state.journey.questions,
  questionPercentage: state.journey.questionPercentage,
});

const mapDispatchToProps = (dispatch) => ({
  loadQuestions: (questData) =>
    dispatch({
      type: actionTypes.LOAD_QUESTIONS,
      payload: questData,
    }),
  backQuestionAction: () =>
    dispatch({
      type: actionTypes.BACKWARD_QUESTION,
      payload: {},
    }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Journey);
