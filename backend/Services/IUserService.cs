using credit_cards_manager.Models;

namespace credit_cards_manager.Services
{
    public interface IUserService
    {
        string Authenticate(LoginRequest request);
    }
}