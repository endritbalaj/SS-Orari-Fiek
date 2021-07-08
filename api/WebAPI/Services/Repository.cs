using System.Threading.Tasks;
using WebAPI.Data;

namespace WebAPI.Services
{
    public class Repository : IRepository
    {
        private readonly AppDbContext _context;
        
        public Repository( AppDbContext context)
        {
            _context = context;
        }   
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync() > 0);
        }
    }
}