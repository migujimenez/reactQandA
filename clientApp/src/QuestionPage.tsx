/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  gray3,
  gray6,
  FieldSet,
  FieldContainer,
  FieldLabel,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
  FieldError,
  SubmissionSuccess,
} from './Styles';
import { Page } from './Page';
import { useParams } from 'react-router';
import { getQuestion, postAnswer, QuestionData } from './QuestionData';
import { AnswerList } from './AnswerList';
import React from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  content: string;
};

export const QuestionPage = () => {
  const [successfullySubmitted, setSuccessfullySubmitted] =
    React.useState(false);
  const [question, setQuestion] = React.useState<QuestionData | null>(null);
  const { questionId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  React.useEffect(() => {
    const doGetQuestion = async (questionId: number) => {
      const foundQuestion = await getQuestion(questionId);
      setQuestion(foundQuestion);
    };
    if (questionId) {
      doGetQuestion(Number(questionId));
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);

  const submitForm = async (data: FormData) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: data.content,
      userName: 'EvaX',
      created: new Date(),
    });
    setSuccessfullySubmitted(result ? true : false);
  };

  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {question === null ? '' : question.title}
        </div>
        {question !== null && (
          <React.Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {question.content}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Asked by Lerox ${question.userName} on
  ${question.created.toLocaleDateString()} 
  ${question.created.toLocaleTimeString()}`}
            </div>
            <AnswerList data={question.answers} />
            <form
              onSubmit={handleSubmit(submitForm)}
              css={css`
                margin-top: 20px;
              `}
            >
              <FieldSet disabled={isSubmitting || successfullySubmitted}>
                <FieldContainer>
                  <FieldLabel htmlFor="content">Your Answer</FieldLabel>
                  <FieldTextArea
                    {...register('content', { required: true, minLength: 50 })}
                    id="content"
                  ></FieldTextArea>
                  {errors.content && errors.content.type === 'required' && (
                    <FieldError>You must enter the answer</FieldError>
                  )}
                </FieldContainer>
                <FormButtonContainer>
                  <PrimaryButton type="submit">
                    Submit your answer
                  </PrimaryButton>
                </FormButtonContainer>
                {successfullySubmitted && (
                  <SubmissionSuccess>
                    Your answer was successfully submitted
                  </SubmissionSuccess>
                )}
              </FieldSet>
            </form>
          </React.Fragment>
        )}
      </div>
    </Page>
  );
};
