import { Page } from './Page';
import {
  FieldSet,
  FieldContainer,
  FieldLabel,
  FieldInput,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
  FieldError,
  SubmissionSuccess,
} from './Styles';
import { useForm } from 'react-hook-form';
import { postQuestion } from './QuestionData';
import React from 'react';

type FormData = {
  title: string;
  content: string;
};

export const AskPage = () => {
  const [successfullySubmited, setSucessfullySubmited] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const submitForm = async (data: FormData) => {
    const result = await postQuestion({
      title: data.title,
      content: data.content,
      userName: 'Miguexxx',
      created: new Date(),
    });
    setSucessfullySubmited(result ? true : false);
  };

  return (
    <Page title="Ask a question">
      <form onSubmit={handleSubmit(submitForm)}>
        <FieldSet disabled={isSubmitting || successfullySubmited}>
          <FieldContainer>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <FieldInput
              {...register('title', { required: true, minLength: 10 })}
              id="title"
              type="text"
            />
            {errors.title && errors.title.type === 'required' && (
              <FieldError>You must enter the question title</FieldError>
            )}
            {errors.title && errors.title.type === 'minLength' && (
              <FieldError>The title must be at last 10 characters</FieldError>
            )}
          </FieldContainer>
          <FieldContainer>
            <FieldLabel htmlFor="content">Content</FieldLabel>
            <FieldTextArea
              {...register('content', { required: true, minLength: 50 })}
              id="content"
            ></FieldTextArea>
            {errors.content && errors.content.type === 'required' && (
              <FieldError>You must enter the question title</FieldError>
            )}
            {errors.content && errors.content.type === 'minLength' && (
              <FieldError>The title must be at last 50 characters</FieldError>
            )}
          </FieldContainer>
          <FormButtonContainer>
            <PrimaryButton type="submit">Submit your question</PrimaryButton>
          </FormButtonContainer>
          {successfullySubmited && (
            <SubmissionSuccess>
              Your question was successfully submitted
            </SubmissionSuccess>
          )}
        </FieldSet>
      </form>
    </Page>
  );
};

export default AskPage;
