/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Page } from './Page';
import { useSearchParams } from 'react-router-dom';
import { QuestionList } from './QuestionList';
import { QuestionData, searchQuestions } from './QuestionData';
import React from 'react';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [questions, setQuestions] = React.useState<QuestionData[]>([]);
  const search = searchParams.get('criteria') || '';

  React.useEffect(() => {
    const doSearch = async (criteria: string) => {
      const foundResults = await searchQuestions(criteria);
      setQuestions(foundResults);
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
