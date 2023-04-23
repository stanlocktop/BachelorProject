using WebApiCore.Models;

namespace WebApiDal.Persistence;

public static class DatabaseSeeder
{
    public static void Initialize(ApplicationContext context)
    {
        context.Database.EnsureCreated();
        if (context.Tickets.Any())
            return;
        context.Tickets.Add(new Ticket
        {
            Title = "First ticket0",
            Description = "First ticket description",
            Created = DateTime.Now,
            Updated = DateTime.Now,
            CreatorPhone = "123456789",
            CreatorName = "John Doe",
        });
        context.Tickets.Add(new Ticket
        {
            Title = "First ticket9",
            Description = "First ticket description",
            Created = DateTime.Now,
            Updated = DateTime.Now,
            CreatorPhone = "123456789",
            CreatorName = "John Doe",
        });
        context.Tickets.Add(new Ticket
        {
            Title = "First ticket8",
            Description = "First ticket description",
            Created = DateTime.Now,
            Updated = DateTime.Now,
            CreatorPhone = "123456789",
            CreatorName = "John Doe",
        });
        context.Tickets.Add(new Ticket
        {
            Title = "First ticket7",
            Description = "First ticket description",
            Created = DateTime.Now,
            Updated = DateTime.Now,
            CreatorPhone = "123456789",
            CreatorName = "John Doe",
        });
        context.Tickets.Add(new Ticket
        {
            Title = "First ticket6",
            Description = "First ticket description",
            Created = DateTime.Now,
            Updated = DateTime.Now,
            CreatorPhone = "123456789",
            CreatorName = "John Doe",
        });
        context.Tickets.Add(new Ticket
        {
            Title = "First ticket5",
            Description = "First ticket description",
            Created = DateTime.Now,
            Updated = DateTime.Now,
            CreatorPhone = "123456789",
            CreatorName = "John Doe",
        });
        context.Tickets.Add(new Ticket
        {
            Title = "First ticket4",
            Description = "First ticket description",
            Created = DateTime.Now,
            Updated = DateTime.Now,
            CreatorPhone = "123456789",
            CreatorName = "John Doe",
        });
        context.Tickets.Add(new Ticket
        {
            Title = "First ticket3",
            Description = "First ticket description",
            Created = DateTime.Now,
            Updated = DateTime.Now,
            CreatorPhone = "123456789",
            CreatorName = "John Doe",
        });
        context.Tickets.Add(new Ticket
        {
            Title = "First ticket2",
            Description = "First ticket description",
            Created = DateTime.Now,
            Updated = DateTime.Now,
            CreatorPhone = "123456789",
            CreatorName = "John Doe",
        });
        context.Tickets.Add(new Ticket
        {
            Title = "First ticket1",
            Description = "First ticket description",
            Created = DateTime.Now,
            Updated = DateTime.Now,
            CreatorPhone = "123456789",
            CreatorName = "John Doe",
        });
        context.Tickets.Add(new Ticket
        {
            Title = "First ticket11",
            Description = "First ticket description",
            Created = DateTime.Now,
            Updated = DateTime.Now,
            CreatorPhone = "123456789",
            CreatorName = "John Doe",
        });
        context.Tickets.Add(new Ticket
        {
            Title = "First ticket111",
            Description = "First ticket description",
            Created = DateTime.Now,
            Updated = DateTime.Now,
            CreatorPhone = "123456789",
            CreatorName = "John Doe",
        });
        context.SaveChanges();
    }
}