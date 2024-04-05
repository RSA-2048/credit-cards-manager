using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using credit_cards_manager.Services;
using credit_cards_manager.Models;

namespace credit_cards_manager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BankController : ControllerBase
    {
        private readonly IBankService _bankService;

        public BankController(IBankService bankService)
        {
            _bankService = bankService;
        }

        [HttpGet]
        public ActionResult<List<Bank>> Get()
        {
            return _bankService.GetBanks();
        }
    }
}