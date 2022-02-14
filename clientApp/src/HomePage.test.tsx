import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { HomePage } from './HomePage';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

jest.mock('./QuestionData', () => ({
  getUnansweredQuestions: jest.fn(() => {
    return Promise.resolve([
      {
        questionId: 1,
        title: 'Title1',
        content: 'Content1',
        userName: 'User1',
        created: new Date(2019, 1, 1),
        answers: [],
      },
      {
        questionId: 2,
        title: 'Title2',
        content: 'Content2',
        userName: 'User2',
        created: new Date(2019, 1, 1),
        answers: [],
      },
    ]);
  }),
}));

test('When HomePage first rendered, loading indicator should show', async () => {
  const { findByText } = render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>,
  );
  const loading = await findByText('Loading...');
  expect(loading).not.toBeNull();
});

/*test('When HomePage data returned, it should render questions', async () => {
  const { findByText } = render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>,
  );
  expect(await findByText('Content1')).not.toBeNull();
  expect(await findByText('Title2')).toBeInTheDocument();
});*/
