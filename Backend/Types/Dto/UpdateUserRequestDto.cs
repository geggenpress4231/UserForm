using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Types.Dto
{
    public class UpdateUserRequestDto
    {
       
        [StringLength(80, ErrorMessage = "First name cannot be longer than 50 characters.")]
        public string? first_name { get; set; }

        
        [StringLength(80, ErrorMessage = "Last name cannot be longer than 50 characters.")]
        public string? last_name { get; set; }

        
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string? email { get; set; }

        
 
    }
}