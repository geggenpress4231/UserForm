using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Types.Dto
{
    public class UserDto
    {
        public Guid id{get;set;}
        public string? first_name { get; set; }
        public string? last_name { get; set; }
        public string? email { get; set; }
        public DateTime date_created { get; set; }
        
    }
}