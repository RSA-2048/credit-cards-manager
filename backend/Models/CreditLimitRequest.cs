namespace credit_cards_manager.Models
{
    public class CreditLimitRequest
    {
        public int CardId { get; set; }
        public decimal RequestedCreditLimit { get; set; }
        public string? Occupation { get; set; }
        public decimal AverageMonthlyIncome { get; set; }
    }
}