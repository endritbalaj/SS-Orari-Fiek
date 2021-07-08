using System;
using System.Threading.Tasks;
using WebAPI.Data.Entities;
using WebAPI.Models;

namespace WebAPI.Services
{
    public interface IScheduleRepository : IRepository
    {
        public Task<Schedule> AddSchedule(ScheduleModel model);
        
        public Task<Schedule> DeleteSchedule(Guid id);

        public Task<Schedule> UpdateSchedule(ScheduleModel model);
        
        public Task<Subject> AddSubject(SubjectModel model);
        
        public Task<Subject[]> GetAllSubjects(Guid professorId);

        public Task<Schedule[]> GetAllSchedules(Guid professorId);
    }
}