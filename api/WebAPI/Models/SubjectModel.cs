using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using WebAPI.Enums;
using Newtonsoft.Json.Converters;

namespace WebAPI.Models
{
    public class SubjectModel
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid Id { get; set; }
        
        public string Title { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public SubjectType Type { get; set; }
        
        public int Year { get; set; }
        
        public Guid ProfessorId { get; set; }
    }
}