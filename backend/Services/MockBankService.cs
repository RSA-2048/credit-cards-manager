using System;
using System.Collections.Generic;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using credit_cards_manager.Settings;
using credit_cards_manager.Models;
using credit_cards_manager.Services;

namespace credit_cards_manager.Tests
{
    public class MockBankService : IBankService
    {
        private readonly IMemoryCache _cache;
        private readonly ILogger<MockBankService> _logger; // used for logging the cache operations (to prove that the cache is working as expected)
        private readonly CacheSettings _cacheSettings;

        public MockBankService(IMemoryCache cache, ILogger<MockBankService> logger, IOptions<CacheSettings> cacheSettings)
        {
            _cache = cache;
            _logger = logger;
            _cacheSettings = cacheSettings.Value; // this is the CacheSettings object that was configured with the values from the appsettings.json file.
        }

        public List<Bank> GetBanks()
        {
            // Try to get the list of banks from the cache.
            if (_cache.TryGetValue("Banks", out List<Bank> banks))
            {
                _logger.LogInformation("Retrieved banks from cache.");
            }
            else
            {
                // If the list of banks is not in the cache, retrieve it and add it to the cache.
                banks = new List<Bank>
                {
                    new Bank { Id = 1, Name = "Hapoalim", Description = "mock bank 1" },
                    new Bank { Id = 2, Name = "Leumi", Description = "mock bank 2" },
                    new Bank { Id = 3, Name = "Mizrahi Tefahot", Description = "mock bank 3" },
                };

                // Set cache options
                // non configurable cache expiration implementation:
                //var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for 4 minutes from the last access.
                    // use SetAbsoluteExpiration instead if you want to keep the cache for 4 minutes from the time it was created.
                    //.SetSlidingExpiration(TimeSpan.FromMinutes(4));
                // configurable cache expiration implementation:
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(_cacheSettings.BankListExpirationMinutes));

                // Save data in cache.
                _cache.Set("Banks", banks, cacheEntryOptions);

                _logger.LogInformation($"Added banks to cache. Cached for {_cacheSettings.BankListExpirationMinutes} minutes.");
            }

            return banks;
        }
    }
}