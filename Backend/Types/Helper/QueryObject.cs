using System;
using System.ComponentModel.DataAnnotations;

namespace Types.Helper
{
    public class QueryObject
    {
        
        public string? SearchTerm { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Page number must be greater than zero.")]
        public int PageNumber { get; set; } = 1;

        [Range(1, int.MaxValue, ErrorMessage = "Page size must be greater than zero.")]
        public int PageSize { get; set; } = 30;
    }
}
