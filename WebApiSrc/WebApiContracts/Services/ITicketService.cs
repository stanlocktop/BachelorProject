using WebApiCore.Dto.Common;
using WebApiCore.Dto.Ticket;
using WebApiCore.Models;

namespace WebApiContracts.Services;

public interface ITicketService
{
    public Task<Ticket?> GetTicketAsync(Guid ticketId);
    public Task<IEnumerable<Ticket?>> GetTicketsAsync(PaginationParameters? parameters=null);
    public Task<IEnumerable<Ticket?>> GetTicketsByUsernameAsync(string username, PaginationParameters? parameters=null);
    public Task<bool> TakeTicketAsync(Guid ticketId, string? username);
    public  Task<bool> CreateTicketAsync(TicketCreatingDto ticket);
    public Task<bool> UpdateTicketAsync(Guid id, TicketUpdatingDto ticket);
    public Task<bool> DeleteTicketAsync(Guid ticketId);
    public Task<Ticket?> CancelTicketAsync(Guid ticketId);
    public Task<IEnumerable<Ticket>?> GetCancelledTicketsAsync(string username);
}