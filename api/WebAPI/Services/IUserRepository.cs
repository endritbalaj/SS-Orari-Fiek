using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Data.Entities;

namespace WebAPI.Services
{
    public interface IUserRepository : IRepository
    {
        public bool UserAlreadyExists(string email);

        public Task<User> GetUserAsync(string email);

        public Task<User[]> GetRegisteredUsers(string subject);

        public Task<List<string>> GetUserFromYear(int year);
    }
}