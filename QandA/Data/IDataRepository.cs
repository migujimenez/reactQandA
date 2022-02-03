using System.Collections.Generic;
using System.Threading.Tasks;
using QandA.Data.Models;

namespace QandA.Data
{
    public interface IDataRepository
    {
        IEnumerable<QuestionGetManyResponse> GetQuestions();

        IEnumerable<QuestionGetManyResponse> GetQuestionsBySearch(string search);

        IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions();

        Task<IEnumerable<QuestionGetManyResponse>> GetUnansweredQuestionsAsync();

        QuestionGetSingleResponse GetQuestion(int questionId);

        Task<QuestionGetSingleResponse> GetQuestionAsync(int questionId);

        bool QuestionExists(int questionId);

        AnswerGetResponse GetAnswer(int answerId);

        QuestionGetSingleResponse PostQuestion(QuestionPostFullRequest question);

        Task<QuestionGetSingleResponse> PostQuestionAsync(QuestionPostFullRequest question);

        QuestionGetSingleResponse PutQuestion(int questionId, QuestionPutRequest question);

        void DeleteQuestion(int questionId);

        AnswerGetResponse PostAnswer(AnswerPostFullRequest answer);
        IEnumerable<QuestionGetManyResponse> GetQuestionsWithAnswers();

        IEnumerable<QuestionGetManyResponse> GetQuestionsBySearchWithPaging(string search, int pageNumber, int pageSize); 
    }
}
