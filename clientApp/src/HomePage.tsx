/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { getUnansweredQuestions, QuestionData } from './QuestionData';
import { QuestionList } from './QuestionList';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { PrimaryButton } from './Styles';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  gettingUnansweredQuestionsAction,
  gotUnansweredQuestionsAction,
  AppState,
} from './Store';
import { statement } from '@babel/template';

export const HomePage = () => {
  const dispatch = useDispatch();
  //const [questions, setQuestions] = React.useState<QuestionData[]>([]);
  const questions = useSelector(
    (state: AppState) => state.questions.unanswered,
  );

  //const [questionsLoading, setQuestionsLoading] = React.useState(true);
  const questionsLoading = useSelector(
    (state: AppState) => state.questions.loading,
  );

  React.useEffect(() => {
    const doGetUnansweredeQuestions = async () => {
      dispatch(gettingUnansweredQuestionsAction());
      const unansweredQuestions = await getUnansweredQuestions();
      dispatch(gotUnansweredQuestionsAction(unansweredQuestions));
      //setQuestions(unansweredQuestions);
      //setQuestionsLoading(false);
    };
    doGetUnansweredeQuestions();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('rendered');

  const navigate = useNavigate();

  const handleAskQuestionClick = () => {
    //console.log('TODO - move to the AskPage');
    navigate('ask');
  };

  return (
    <Page>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <PageTitle>Unanswered Questions</PageTitle>
        <PrimaryButton onClick={handleAskQuestionClick}>
          Ask a question
        </PrimaryButton>
      </div>
      {questionsLoading ? (
        <div>Loading...</div>
      ) : (
        <QuestionList
          data={questions || []}
          //renderItem={(question) => <div>{question.title}</div>}
        />
      )}
    </Page>
  );
};
function state(state: any, AppState: any) {
  throw new Error('Function not implemented.');
}
