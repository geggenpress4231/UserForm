using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Medfar.Interview.Types;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data
{
    public class ApplicationDBContext:DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions):
        base(dbContextOptions)
        {
            
        }

    public DbSet<User> Users { get; set; }=null!;
        
    }
}