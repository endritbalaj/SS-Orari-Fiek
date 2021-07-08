using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using WebAPI.Enums;

namespace WebAPI.Data.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        
        public string FullName { get; set; }
        
        public string Email { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Roles Role { get; set; }
        
        public virtual ICollection<Subject> Subjects { get; set; }
        
        public virtual ICollection<Schedule> Schedules { get; set; }
    }
}