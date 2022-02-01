﻿using Microsoft.Extensions.Caching.Memory;
using QandA.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QandA.Data
{
    public class QuestionCache : IQuestionCache
    {
        private MemoryCache _cache { get; set; }
        public QuestionCache()
        {
            _cache = new MemoryCache(new MemoryCacheOptions { SizeLimit = 100 });
        }

        private string GetCacheKey(int questionId) => $"Question-{questionId}";

        public QuestionGetSingleResponse Get(int questionId)
        {
            QuestionGetSingleResponse question;
            _cache.TryGetValue(GetCacheKey(questionId), out question);
            return question;
        }

        public void Remove(int questionId)
        {
            _cache.Remove(GetCacheKey(questionId));
        }

        public void Set(QuestionGetSingleResponse question)
        {
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetSize(1)
                .SetSlidingExpiration(TimeSpan.FromMinutes(30));
            _cache.Set(GetCacheKey(question.QuestionId), question, cacheEntryOptions);
        }
    }
}
