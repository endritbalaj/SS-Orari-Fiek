using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebAPI.Data.Entities;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _db;
        private readonly ILogger<UserController> _logger;
        private readonly IMapper _mapper;
        
        public UserController(IUserRepository db, ILogger<UserController> logger, IMapper mapper)
        {
            _db = db;
            _logger = logger;
            _mapper = mapper;
        }
        
        [HttpPost]
        [Route("Add")]
        public async Task<Guid> RegisterUser(UserModel model)
        {
            if (_db.UserAlreadyExists(model.Email))
            {
                _db.Add(_mapper.Map<User>(model));
                await _db.SaveChangesAsync();
            
                _logger.LogInformation($"{model.FullName} has been registered");

                return model.Id;
            }
            _logger.LogInformation($"{model.FullName} has just logged in!");

            var existingUser = _db.GetUserAsync(model.Email);
            return existingUser.Result.Id;
        }

        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> DeleteUser(UserModel model)
        {
            _db.Delete(model);
            await _db.SaveChangesAsync();
            return Ok("Deleted");
        }
        
        [HttpGet]
        [Route("GetStudyYear")]
        public async Task<List<string>> GetStudyYear(int year)
        {
            var emails = await _db.GetUserFromYear(year);
            return emails;
        }
    }
}