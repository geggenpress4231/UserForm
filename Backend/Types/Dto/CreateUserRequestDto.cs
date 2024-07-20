using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Types.Dto
{
    public class CreateUserRequestDto
    {
        [Required(ErrorMessage = "First name is required.")]
        [StringLength(80, ErrorMessage = "First name cannot be longer than 50 characters.")]
        public string? first_name { get; set; }

        [Required(ErrorMessage = "Last name is required.")]
        [StringLength(80, ErrorMessage = "Last name cannot be longer than 50 characters.")]
        public string? last_name { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string? email { get; set; }

        [Required]
        public DateTime date_created { get; set; } = DateTime.Now;

        
    }
}