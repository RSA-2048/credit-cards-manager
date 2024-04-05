using System;
using System.Collections.Generic;
using System.Linq;
using credit_cards_manager.Models;
using credit_cards_manager.Services;

namespace credit_cards_manager.Tests
{
    public class MockCardService : ICardService
    {
        private List<Card> _cards = new List<Card>
        {
            new Card { Id = 1, BankId = 1, CardNumber = "1234567890123456", IssueDate = DateTime.Now, Image = "image1.png", IsBlocked = false, IsDigital = true, CreditLimit = 5000000 },
            new Card { Id = 2, BankId = 2, CardNumber = "2345678901234567", IssueDate = DateTime.Now, Image = "image2.png", IsBlocked = true, IsDigital = false, CreditLimit = 10000 },
            new Card { Id = 3, BankId = 3, CardNumber = "3456789012345678", IssueDate = DateTime.Now, Image = "image3.png", IsBlocked = false, IsDigital = true, CreditLimit = 15000 },
        };

        public List<Card> GetCards(string? cardNumber = null, string? bankCode = null, bool? isBlocked = null)
        {
            // Filter cards based on the provided parameters.
            return _cards.Where(card =>
                (cardNumber == null || card.CardNumber == cardNumber) &&
                (bankCode == null || card.BankId.ToString() == bankCode) &&
                (isBlocked == null || card.IsBlocked == isBlocked)
            ).ToList();
        }

        public bool IncreaseCreditLimit(CreditLimitRequest request)
        {
            // Find the card with the specified Id.
            var card = _cards.FirstOrDefault(c => c.Id == request.CardId);

            if (card != null)
            {
                // Increase the card's credit limit.
                card.CreditLimit = request.RequestedCreditLimit;
                return true;
            }

            return false;
        }
        
    }
}