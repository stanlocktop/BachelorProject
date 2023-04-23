namespace WebApi.ViewModels;

public class TicketViewModel
{
    public Guid Id { get; set; }
    public string Created { get; set; }
    public string Updated { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string CreatorPhone { get; set; }
    public string CreatorName { get; set; }
    public string? OwnerUsername { get; set; }
}