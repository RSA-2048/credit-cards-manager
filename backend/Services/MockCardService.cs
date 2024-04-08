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
            new Card { Id = 1, BankId = 1, CardNumber = "1234567890123456", IssueDate = DateTime.Now.AddDays(-365), Image = "/CardImages/credit-card-png-1.png", IsBlocked = false, IsDigital = true, CreditLimit = 5000000 },
            new Card { Id = 2, BankId = 2, CardNumber = "2345678901234567", IssueDate = DateTime.Now.AddDays(-730), Image = "/CardImages/credit-card-png-2.png", IsBlocked = true, IsDigital = false, CreditLimit = 10000 },
            new Card { Id = 3, BankId = 3, CardNumber = "3456789012345678", IssueDate = DateTime.Now.AddDays(-1095), Image = "/CardImages/credit-card-png-4.png", IsBlocked = false, IsDigital = true, CreditLimit = 15000 },
            new Card { Id = 4, BankId = 3, CardNumber = "4567890123456789", IssueDate = DateTime.Now.AddDays(-1460), Image = "/CardImages/credit-card-png-2.png", IsBlocked = false, IsDigital = false, CreditLimit = 20000 },
            new Card { Id = 5, BankId = 2, CardNumber = "5678901234567890", IssueDate = DateTime.Now.AddDays(-1825), Image = "/CardImages/credit-card-png-3.png", IsBlocked = true, IsDigital = true, CreditLimit = 25000 },
            new Card { Id = 6, BankId = 1, CardNumber = "6789012345678901", IssueDate = DateTime.Now.AddDays(-2190), Image = "/CardImages/credit-card-png-4.png", IsBlocked = false, IsDigital = true, CreditLimit = 30000 },
            new Card { Id = 7, BankId = 1, CardNumber = "7890123456789012", IssueDate = DateTime.Now.AddDays(-2555), Image = "/CardImages/credit-card-png-1.png", IsBlocked = true, IsDigital = false, CreditLimit = 35000 },
            new Card { Id = 8, BankId = 2, CardNumber = "8901234567890123", IssueDate = DateTime.Now.AddDays(-2920), Image = "/CardImages/credit-card-png-4.png", IsBlocked = false, IsDigital = true, CreditLimit = 40000 },
            new Card { Id = 9, BankId = 3, CardNumber = "9012345678901234", IssueDate = DateTime.Now.AddDays(-3285), Image = "/CardImages/credit-card-png-3.png", IsBlocked = true, IsDigital = false, CreditLimit = 45000 },
            new Card { Id = 10, BankId = 1, CardNumber = "0123456789012345", IssueDate = DateTime.Now.AddDays(-3650), Image = "/CardImages/credit-card-png-2.png", IsBlocked = false, IsDigital = true, CreditLimit = 50000 },
        };

        public List<Card> GetCards(string? cardNumber = null, int? BankId = null, bool? isBlocked = null)
        {
            // Filter cards based on the provided parameters.
            return _cards.Where(card =>
                (cardNumber == null || card.CardNumber == cardNumber) &&
                (BankId == null || card.BankId == BankId) &&
                (isBlocked == null || card.IsBlocked == isBlocked)
            ).ToList();
        }

        public CreditLimitIncreaseResult IncreaseCreditLimit(CreditLimitRequest request)
        {
            var result = new CreditLimitIncreaseResult();

            // Find the card with the specified Id.
            var card = _cards.FirstOrDefault(c => c.Id == request.CardId);

            if (card != null)
            {
                // Check if the card is blocked.
                if (card.IsBlocked)
                {
                    result.Message = "The card is blocked.";
                    return result;
                }

                // Check if the card was issued in the last 3 months.
                if (card.IssueDate > DateTime.Now.AddMonths(-3))
                {
                    result.Message = "The card was issued in the last 3 months.";
                    return result;
                }

                // Check if the average income is less than 12,000 NIS.
                if (request.AverageMonthlyIncome < 12000)
                {
                    result.Message = "The average income is less than 12,000 NIS.";
                    return result;
                }

                // Check the occupation and calculate the maximum allowable credit limit increase.
                decimal maxIncrease = 0;
                switch (request.Occupation)
                {
                    case "employee":
                        maxIncrease = request.AverageMonthlyIncome / 2;
                        break;
                    case "self-employed":
                        maxIncrease = request.AverageMonthlyIncome / 3;
                        break;
                    default:
                        result.Message = "The occupation is not valid for a credit limit increase.";
                        return result;
                }
                // Check if the requested credit limit increase is within the allowable range.
                if (request.RequestedCreditLimit <= maxIncrease)
                {
                    // Increase the card's credit limit.
                    card.CreditLimit = request.RequestedCreditLimit;
                    result.IsSuccessful = true;
                    result.Message = "The credit limit increase was successful.";
                    return result;
                }
                else
                {
                    result.Message = "The requested credit limit increase is not within the allowable range.";
                    return result;
                }
            }

            result.Message = "The card was not found.";
            return result;
        }

    }
}