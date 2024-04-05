using System.Collections.Generic;
using credit_cards_manager.Models;

namespace credit_cards_manager.Services
{
    public interface ICardService
    {
        List<Card> GetCards(string? cardNumber = null, string? bankCode = null, bool? isBlocked = null);
        bool IncreaseCreditLimit(CreditLimitRequest request);
    }
}