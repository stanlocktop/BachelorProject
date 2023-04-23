namespace WebApiCore.Models;

public class Ticket
{
    public Guid Id { get; set; }
    public DateTime Created { get; set; }
    public DateTime Updated { get; set; }
    public bool Cancelled { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string CreatorPhone { get; set; }
    public string CreatorName { get; set; }
    public string? OwnerUsername { get; set; }
}