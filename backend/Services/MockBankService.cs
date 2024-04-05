using System.Collections.Generic;
using credit_cards_manager.Models;
using credit_cards_manager.Services;

namespace credit_cards_manager.Tests
{
    public class MockBankService : IBankService
    {
        public List<Bank> GetBanks()
        {
            // Return a mock list of banks.
            return new List<Bank>
            {
                new Bank { Id = 1, Name = "Hapoalim", Description = "mock bank 1" },
                new Bank { Id = 2, Name = "Leumi", Description = "mock bank 2" },
                new Bank { Id = 3, Name = "Mizrahi Tefahot", Description = "mock bank 3" },
            };
        }
    }
}