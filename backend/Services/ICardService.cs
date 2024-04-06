using System.Collections.Generic;
using credit_cards_manager.Models;

namespace credit_cards_manager.Services
{
    public interface ICardService
    {
        List<Card> GetCards(string? cardNumber = null, int? BankId = null, bool? isBlocked = null);
        CreditLimitIncreaseResult IncreaseCreditLimit(CreditLimitRequest request);
    }
}