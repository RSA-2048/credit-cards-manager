using System;

namespace credit_cards_manager.Models
{
    public class Card
    {
        public int Id { get; set; }
        public string? CardNumber { get; set; }
        public DateTime IssueDate { get; set; }
        public string? Image { get; set; }
        public bool IsBlocked { get; set; }
        public bool IsDigital { get; set; }
        public decimal CreditLimit { get; set; }
        public int? BankId { get; set; }
    }
}