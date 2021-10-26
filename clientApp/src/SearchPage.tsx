/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Page } from './Page';
import { useSearchParams } from 'react-router-dom';
import { QuestionList } from './QuestionList';
import { searchQuestions } from './QuestionData';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppState,
  searchingQuestionsAction,
  searchedQuestionsAction,
} from './Store';

export const SearchPage = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state: AppState) => state.questions.searched);
  const [searchParams] = useSearchParams();
  //const [questions, setQuestions] = React.useState<QuestionData[]>([]);
  const search = searchParams.get('criteria') || '';

  React.useEffect(() => {
    const doSearch = async (criteria: string) => {
      dispatch(searchingQuestionsAction());
      const foundResults = await searchQuestions(criteria);
      //setQuestions(foundResults);
      dispatch(searchedQuestionsAction(foundResults));
    };
    doSearch(search);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Page title="Search results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          {' '}
          for "{search}"
        </p>
      )}
      <QuestionList data={questions}></QuestionList>
    </Page>
  );
};
