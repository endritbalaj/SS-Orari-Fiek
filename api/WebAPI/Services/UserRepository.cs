using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Data.Entities;

namespace WebAPI.Services
{
    public class UserRepository : Repository, IUserRepository
    {
        private readonly AppDbContext _dbContext;

        public UserRepository(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public bool UserAlreadyExists(string email)
        {
            var userExists = _dbContext.Users.FirstOrDefault(u => u.Email == email);
            return userExists == null;
        }

        public async Task<User> GetUserAsync(string email)
        {
            var query = _dbContext.Users.AsQueryable();
            query = query.Where(u => u.Email == email);

            return await query.FirstOrDefaultAsync();
        }

        public Task<User[]> GetRegisteredUsers(string subject)
        {
            throw new NotImplementedException();
        }

        public async Task<List<string>> GetUserFromYear(int year)
        {
            var query = await _dbContext.StudyYears.Where(u => u.YearOfStudy == year).ToArrayAsync();
            var emailList = new List<string>();
            
            foreach(var element in query)
            {
                emailList.Add(await EmailFromId(element.StudentId));
            }
            return emailList;
        }

        private async Task<string> EmailFromId(Guid id)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user?.Email;
        }
    }
}