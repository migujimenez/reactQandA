/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { getUnansweredQuestions, QuestionData } from './QuestionData';
import { QuestionList } from './QuestionList';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { PrimaryButton } from './Styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';

export const HomePage = () => {
  const [questions, setQuestions] = React.useState<QuestionData[]>([]);
  const [questionsLoading, setQuestionsLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      if (!cancelled) {
        setQuestions(unansweredQuestions);
        setQuestionsLoading(false);
      }
    };
    doGetUnansweredQuestions();
    return () => {
      cancelled = true;
    };
  }, []);

  console.log('rendered');

  const navigate = useNavigate();

  const handleAskQuestionClick = () => {
    navigate('ask');
  };

  const { isAuthenticated } = useAuth();

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
        {isAuthenticated && (
          <PrimaryButton onClick={handleAskQuestionClick}>
            Ask a question
          </PrimaryButton>
        )}
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
