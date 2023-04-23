using Microsoft.EntityFrameworkCore;
using WebApiCore.Models;

namespace WebApiDal.Persistence;

public class ApplicationContext : DbContext
{
    public DbSet<Ticket> Tickets { get; set; }

    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    {
        //for saving not modified DateTime fields into PostgreSQL
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Ticket>()
            .ToTable("Tickets")
            .Property(t=>t.Title)
            .HasMaxLength(512)
            .IsRequired();
        modelBuilder.Entity<Ticket>()
            .Property(t=>t.CreatorPhone)
            .HasMaxLength(15)
            .IsRequired();

    }
}