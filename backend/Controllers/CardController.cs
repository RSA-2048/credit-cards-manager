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
        public ActionResult<List<Card>> Get(string? cardNumber = null, string? bankCode = null, bool? isBlocked = null)
        {
            return _cardService.GetCards(cardNumber, bankCode, isBlocked);
        }

        [HttpPost]
        public IActionResult Post(CreditLimitRequest request)
        {
            bool result = _cardService.IncreaseCreditLimit(request);
            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}