using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Data.Entities;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class ScheduleRepository : Repository, IScheduleRepository
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public ScheduleRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        
        public async Task<Schedule> AddSchedule(ScheduleModel model)
        {
            var schedule = _mapper.Map<Schedule>(model);
            await _dbContext.AddAsync(schedule);
            await SaveChangesAsync();
            return schedule;
        }
        
        public async Task<Schedule> DeleteSchedule(Guid id)
        {
            var model = await _dbContext.Schedules.Where(s=>s.Id ==id).FirstOrDefaultAsync();
            var schedule = _mapper.Map<Schedule>(model);
            _dbContext.Remove(schedule);
            await SaveChangesAsync();
            return schedule;
        }

        public async Task<Schedule> UpdateSchedule(ScheduleModel model)
        {
            var schedule = await _dbContext.Schedules.FindAsync(model.Id);
            if (schedule == null) return null;

            if (model.Name != null) schedule.Name = model.Name;
            if (model.Repeatable) schedule.Repeatable = model.Repeatable;
            if (model.StartTime != null) schedule.StartTime = model.StartTime;
            if (model.EndTime != null) schedule.EndTime = model.EndTime;

            try
            {
                schedule = _mapper.Map<Schedule>(model);
                await SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return schedule;
        }

        public async Task<Subject> AddSubject(SubjectModel model)
        {
            var subject = _mapper.Map<Subject>(model);
            try
            {
                await _dbContext.Subjects.AddAsync(subject);
                await SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return subject;
        }
        
        public async Task<Subject[]> GetAllSubjects(Guid professorId)
        {
            var subjects = _dbContext.Subjects.Where(s => s.ProfessorId == professorId).AsQueryable();
            return await subjects.ToArrayAsync();
        }

        public async Task<Schedule[]> GetAllSchedules(Guid professorId)
        {
            var schedules = _dbContext.Schedules.Where(s => s.ProfessorId == professorId).AsQueryable();
            return await schedules.ToArrayAsync();
        }
    }
}