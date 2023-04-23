using System.ComponentModel.DataAnnotations;

namespace WebApiCore.Dto.Ticket;

public class TicketCreatingDto
{
    [Required]
    public string PhoneNumber { get; set; }
    [Required]
    public string Title { get; set; }
    
    [Required]
    public string CreatorName { get; set; }
    public string Description { get; set; }
}