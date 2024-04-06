using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using credit_cards_manager.Models;
using credit_cards_manager.Services;

namespace credit_cards_manager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CardController : ControllerBase
    {
        private readonly ICardService _cardService;

        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        [HttpGet]
        public ActionResult<List<Card>> Get(string? cardNumber = null, int? BankId = null, bool? isBlocked = null)
        {
            return _cardService.GetCards(cardNumber, BankId, isBlocked);
        }

        [HttpPost]
        public IActionResult Post(CreditLimitRequest request)
        {
            var result = _cardService.IncreaseCreditLimit(request);
            if (result.IsSuccessful)
            {
                return Ok(result.Message);
            }
            else
            {
                return BadRequest(result.Message);
            }
        }
    }
}