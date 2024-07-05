using Day_5.Models;
using Microsoft.EntityFrameworkCore;

namespace Day_5.Data // Adjust namespace according to your actual structure
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
