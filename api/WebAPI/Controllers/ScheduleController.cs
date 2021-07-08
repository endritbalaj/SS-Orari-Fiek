using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebAPI.Data.Entities;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleRepository _db;
        private readonly ILogger<ScheduleController> _logger;

        public ScheduleController(ILogger<ScheduleController> logger, IScheduleRepository db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpPost]
        [Route("AddSubject")]
        public async Task<IActionResult> AddSubject(SubjectModel model)
        {
            try
            {
                await _db.AddSubject(model);
                return Ok("Okej pra");
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        [HttpGet]
        [Route("GetSubjects")]
        public async Task<Subject[]> GetAllSubjects(Guid professorId)
        {
            try
            {
                return await _db.GetAllSubjects(professorId);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        [HttpPost]
        [Route("AddSchedule")]
        public async Task<IActionResult> AddSchedule(ScheduleModel model)
        {
            try
            {
                await _db.AddSchedule(model);
                return Ok("Success");
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        [HttpPut]
        [Route("UpdateSchedule")]
        public async Task<IActionResult> UpdateSchedule(ScheduleModel model)
        {
            try
            {
                await _db.UpdateSchedule(model);
                return Ok(model);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpDelete]
        [Route("DeleteSchedule/{id:guid}")]
        public async Task<IActionResult> DeleteSchedule(Guid id)
        {
            try
            {
                await _db.DeleteSchedule(id);
                return Ok(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("GetAllSchedules")]
        public async Task<Schedule[]> GetAllSchedules(Guid id)
        {
            try
            {
                var schedules = await _db.GetAllSchedules(id);
                return schedules;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}