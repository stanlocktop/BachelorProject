using WebApi.ViewModels;
using WebApiCore.Models;

namespace WebApi.Features;

public static class Mapper
{
    public static TicketViewModel MapTicketViewModel(this Ticket ticket)
    {
        var ticketViewModel = new TicketViewModel
        {
            Id = ticket.Id,
            Title = ticket.Title,
            Description = ticket.Description,
            Created = ticket.Created.ToString("yyyy-MM-ddTHH:mm:ss"),
            Updated = ticket.Updated.ToString("yyyy-MM-ddTHH:mm:ss"),
            CreatorName = ticket.CreatorName,
            CreatorPhone = ticket.CreatorPhone,
            OwnerUsername = ticket.OwnerUsername
        };
        return ticketViewModel;
    }
}