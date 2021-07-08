using System;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using WebAPI.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters; //for StringEnumConverter
namespace WebAPI.Models
{
    public class UserModel
    {
        public Guid Id { get; set; }
        
        public string FullName { get; set; }
        
        public string Email { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Roles Role { get; set; }
    }
}