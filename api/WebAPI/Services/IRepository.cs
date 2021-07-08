using System.Threading.Tasks;

namespace WebAPI.Services
{
    public interface IRepository
    {
        void Add<T>(T entity) where T : class;
        
        void Delete<T>(T entity) where T : class;
        
        Task<bool> SaveChangesAsync();
    }
}