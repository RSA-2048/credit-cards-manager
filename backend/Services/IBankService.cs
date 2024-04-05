using System.Collections.Generic;
using credit_cards_manager.Models;

namespace credit_cards_manager.Services
{
    public interface IBankService
    {
        List<Bank> GetBanks();
    }
}