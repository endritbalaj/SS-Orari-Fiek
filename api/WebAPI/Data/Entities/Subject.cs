using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using WebAPI.Enums;

namespace WebAPI.Data.Entities
{
    public class Subject
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid Id { get; set; }
        
        public string Title { get; set; }
        
        [ForeignKey("User")]
        public Guid ProfessorId { get; set; }
        
        public User User { get; set; }
        
        public int Year { get; set; }
        
        [JsonConverter(typeof(StringEnumConverter))]
        public SubjectType Type { get; set; }
        
        public ICollection<Schedule> Students { get; set; }
    }
}