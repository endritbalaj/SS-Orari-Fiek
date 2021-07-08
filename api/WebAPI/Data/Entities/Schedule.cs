using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Data.Entities
{
    public class Schedule
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid Id { get; set; }
        
        public string Name { get; set; }
        
        public string Date { get; set; }
        
        public string StartTime { get; set; }

        public string EndTime { get; set; }
        
        public bool Repeatable { get; set; }
        
        public ICollection<User> Students { get; set; }
        
        public Guid ProfessorId { get; set; }
        
        public Guid SubjectId { get; set; }
        
        public Subject Subject { get; set; }
        
        public int Year { get; set; }
    }
}