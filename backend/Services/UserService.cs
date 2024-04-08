using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using credit_cards_manager.Models;

namespace credit_cards_manager.Services
{
    public class UserService : IUserService
    {
        public string Authenticate(LoginRequest request)
        {
            // TODO: Validate the user's credentials. This is just a placeholder.
            if (request.Username != "test" || request.Password != "password")
            {
                return null;
            }

            // Generate a JWT.
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("your_secret_key_here_your_secret_key_here"); // TODO: Replace with the actual secret key.
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, request.Username) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}