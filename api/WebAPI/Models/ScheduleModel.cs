using System;

namespace WebAPI.Models
{
    public class ScheduleModel
    {
        public Guid Id { get; set; }
        
        public string Name { get; set; }
        
        public string StartTime { get; set; }

        public string EndTime { get; set; }
        
        public bool Repeatable { get; set; }
        
        public Guid SubjectId { get; set; }
        
        public Guid ProfessorId { get; set; }
        
        public int Year { get; set; }
        
        public string Date { get; set; }
    }
}