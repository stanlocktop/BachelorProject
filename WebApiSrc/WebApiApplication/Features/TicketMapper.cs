using WebApiCore.Dto.Ticket;
using WebApiCore.Models;

namespace WebApiApplication.Features;
//implement mapping for ticket
public static class TicketMapper
{
    public static Ticket MapTicket(this TicketCreatingDto ticketDto)
    {
        var ticket = new Ticket
        {
            Title = ticketDto.Title,
            Description = ticketDto.Description,
            Created = DateTime.Now,
            Updated = DateTime.Now,
            CreatorName = ticketDto.CreatorName,
            CreatorPhone = ticketDto.PhoneNumber
        };
        return ticket;
    }
    
    public static Ticket MapTicket(this TicketUpdatingDto ticketDto)
    {
        var ticket = new Ticket
        {
            Title = ticketDto.Title,
            Description = ticketDto.Description,
            Created = ticketDto.Created,
            Updated = DateTime.Now,
            CreatorName = ticketDto.CreatorName,
            CreatorPhone = ticketDto.PhoneNumber,
            OwnerUsername = ticketDto.OwnerUsername
        };
        return ticket;
    }

}