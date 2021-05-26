import React, { Component } from "react";
import "./Question.scss";
import { isEmpty } from "lodash";
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import Popup from "../../components/Model/Model";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }
  submitJourneyHandler = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  closePopup = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    let questionOption = null;
    if (
      !isEmpty(this.props.currentQuestion.options) &&
      this.props.currentQuestion.options !== undefined
    ) {
      questionOption = this.props.currentQuestion.options.map((value, key) => {
        return (
          <div key={key} className="question-options-card">
            <input
              type="radio"
              className={
                "radio-input " +
                (this.props.currentQuestion.saveOptionId === value.id
                  ? "option-label--active"
                  : "")
              }
              name={"question_" + this.props.currentQuestion.id}
              id={"question_" + value.id}
              value={value.optionValue}
              onClick={(e) =>
                this.props.forwardQuestion(
                  e,
                  value,
                  this.props.currentQuestion.id
                )
              }
            />
            <label htmlFor={"question_" + value.id} className="radio-label">
              <div className="card-icon">
                {this.props.currentQuestion.saveOptionId === value.id ? (
                  <img
                    src={value.optionActiveImage}
                    className="card-icon__image card-icon__image--active"
                    alt={value.optionTitle}
                  />
                ) : (
                  <img
                    src={value.optionImage}
                    className="card-icon__image card-icon__image--default"
                    alt={value.optionTitle}
                  />
                )}
              </div>
              <div className="card-title">{value.optionTitle}</div>
            </label>
          </div>
        );
      });
    }
    return (
      <div className="questions-continer">
        <div className="question-title-content">
          <p className="question-title-content__text">
            {this.props.currentQuestion.questTitle}
          </p>
        </div>
        <div className="question-description">
          {this.props.currentQuestion.questDescription}
        </div>
        <div className="question-options-wrapper">
          {questionOption ? questionOption : ""}
        </div>
        <div
          className={
            "button-wrapper " +
            (this.props.lastQuestionStatus ? "" : "button-wrapper--hide")
          }
        >
          <button
            disabled={!this.props.jourenyEnd}
            className="button"
            onClick={this.submitJourneyHandler}
          >
            <span className="button-text">Submit</span>
          </button>
          {this.state.isOpen && (
            <Popup
              content={
                <div>
                  <p>
                    <b>You Journey Completed !</b>
                  </p>
                  <h1>Thank You</h1>
                </div>
              }
              handleClose={this.closePopup}
            />
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentQuestion: state.journey.currentQuestion,
  lastQuestionStatus: state.journey.lastQuestionStatus,
  questionPercentage: state.journey.questionPercentage,
  jourenyEnd: state.journey.jourenyEnd,
});
const mapDispatchToProps = (dispatch) => ({
  forwardQuestion: (e, option, questionsId) => {
    dispatch({
      type: actionTypes.FORWARD_QUESTION,
      payload: { e, option, questionsId },
    });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Question);
