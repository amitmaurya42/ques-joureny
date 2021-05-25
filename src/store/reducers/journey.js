import * as actionTypes from "../actions/actionTypes";

const initialState = {
  questions: [],
  currentQuestion: [],
  postQuestions: [],
  lastQuestionStatus: false,
  questionPercentage: 0,
  jourenyEnd: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_QUESTIONS:
      let allQuestions = [...action.payload.questions];
      const firstQuestion = [...action.payload.questions].shift();
      return {
        ...state,
        questions: allQuestions,
        currentQuestion: firstQuestion,
      };
    case actionTypes.FORWARD_QUESTION:
      let questionsList = [...state.questions];
      // Find question Index
      let findQuestionIndex = questionsList.findIndex((value) => {
        return value.id === action.payload.questionsId;
      });
      let nextIndex = findQuestionIndex + 1;
      let postQuestions = [...state.postQuestions];
      // Check postQuestions already stored question
      let findPostQuestionIndex = postQuestions.findIndex((value) => {
        return value.id === action.payload.questionsId;
      });
      if (findPostQuestionIndex != "-1") {
        postQuestions[findPostQuestionIndex].saveOptionId =
          action.payload.option.id;
      } else {
        let postQuestion = [...state.questions][findQuestionIndex];
        postQuestion.saveOptionId = action.payload.option.id;
        postQuestions.push(postQuestion);
      }

      // Next Question
      let nextQuestion = [];
      if (nextIndex < questionsList.length) {
        nextQuestion = questionsList[nextIndex];
        nextQuestion.saveOptionId = "";        
      } else {
        nextQuestion = [...state.questions][findQuestionIndex];
        nextQuestion.saveOptionId = action.payload.option.id;
      }
      
      let lastQuestionStatus = state.lastQuestionStatus;
      if (nextIndex >= questionsList.length - 1) {
        lastQuestionStatus = true;
      }
      let jourenyEndStatus = state.jourenyEnd;
      if (postQuestions.length === questionsList.length) {
        jourenyEndStatus = true;
      }
      let questionPercentage = Math.round(
        (postQuestions.length / [...state.questions].length) * 100
      );
      return {
        ...state,
        postQuestions: postQuestions,
        currentQuestion: { ...nextQuestion },
        jourenyEnd: jourenyEndStatus,
        lastQuestionStatus: lastQuestionStatus,
        questionPercentage: questionPercentage,
      };
    case actionTypes.BACKWARD_QUESTION:
      let postBackQuestions = [...state.postQuestions];
      let questionsBackList = [...state.questions];
      // Remove Last Ques From post Ques if Form End
      let jourenyBackEndStatus = state.jourenyEnd;
      if (jourenyBackEndStatus) {
        postBackQuestions.pop();
      }
      let lastPostQues = postBackQuestions.pop();

      // Find question Index
      let findQuestionBackIndex = [...state.questions].findIndex((value) => {
        return value.id === lastPostQues.id;
      });
      let nextBackIndex = findQuestionBackIndex;
      // Next Question
      let nextBackQuestion = [];
      if (nextBackIndex < questionsBackList.length) {
        nextBackQuestion = questionsBackList[nextBackIndex];
      }

      let lastBackQuestionStatus = state.lastQuestionStatus;
      if (nextBackIndex >= questionsBackList.length - 1) {
        lastBackQuestionStatus = true;
      } else {
        lastBackQuestionStatus = false;
      }
      if (postBackQuestions.length === questionsBackList.length) {
        jourenyBackEndStatus = true;
      } else {
        jourenyBackEndStatus = false;
      }

      let questionBackPercentage = Math.round(
        (postBackQuestions.length / [...state.questions].length) * 100
      );
      return {
        ...state,
        postQuestions: postBackQuestions,
        currentQuestion: { ...nextBackQuestion },
        jourenyEnd: jourenyBackEndStatus,
        lastQuestionStatus: lastBackQuestionStatus,
        questionPercentage: questionBackPercentage,
      };
    default:
      return state;
  }
};

export default reducer;
