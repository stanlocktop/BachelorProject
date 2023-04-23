using Microsoft.EntityFrameworkCore;
using WebApiApplication.Features;
using WebApiContracts.Services;
using WebApiCore.Dto.Common;
using WebApiCore.Dto.Ticket;
using WebApiCore.Models;
using WebApiDal.Persistence;

namespace WebApiApplication.Services;

public class TicketService : ITicketService
{
    private readonly ApplicationContext _context;
    public TicketService(ApplicationContext context)
    {
        _context = context;
    }
    
    public async Task<Ticket?> GetTicketAsync(Guid ticketId)
    {
        return await _context.Tickets.FindAsync(ticketId);
    }
    public async Task<IEnumerable<Ticket?>> GetTicketsAsync(PaginationParameters? parameters)
    {
        var defaultQuery = _context.Tickets.Where(c=>!c.Cancelled && c.OwnerUsername == null)
            .OrderByDescending(t => t.Created);
        if (parameters is null)
        {
            return await defaultQuery.ToListAsync();
        }
        return await defaultQuery.Skip(parameters.GetSkip()).Take(parameters.PageSize).ToListAsync();
    }

    public async Task<IEnumerable<Ticket?>> GetTicketsByUsernameAsync(string username, PaginationParameters? parameters = null)
    {
        var defaultQuery = _context.Tickets.Where(t=>t.OwnerUsername==username && !t.Cancelled)
            .OrderBy(t => t.Created);
        if (parameters is null)
        {
            return await defaultQuery.ToListAsync();
        }
        return await defaultQuery.Skip(parameters.GetSkip()).Take(parameters.PageSize).ToListAsync();

    }

    public async Task<bool> CreateTicketAsync(TicketCreatingDto ticketDto)
    {
        var ticket = ticketDto.MapTicket();
        await _context.Tickets.AddAsync(ticket);
        var created = await _context.SaveChangesAsync();
        return created > 0;
    }

    public async Task<bool> TakeTicketAsync(Guid ticketId, string? username)
    {
        var ticket = await GetTicketAsync(ticketId);
        if (ticket is null || string.IsNullOrWhiteSpace(username))
            return false;
        ticket.OwnerUsername = username;
        _context.Tickets.Update(ticket);
        var updated = await _context.SaveChangesAsync();
        return updated > 0;
    }
    
    public async Task<Ticket?> CancelTicketAsync(Guid ticketId)
    {
        var ticket = await GetTicketAsync(ticketId);
        if (ticket is null)
            return null;
        ticket.Cancelled = true;
            _context.Tickets.Update(ticket);
            await _context.SaveChangesAsync();
            return ticket;
    }
    
    public async Task<bool> UpdateTicketAsync(Guid id,TicketUpdatingDto ticketToUpdate)
    {
        var ticket = ticketToUpdate.MapTicket();
        ticket.Id = id;
        _context.Tickets.Update(ticket);
        var updated = await _context.SaveChangesAsync();
        return updated > 0;
    }
    
    public async Task<bool> DeleteTicketAsync(Guid ticketId)
    {
        var ticket = await GetTicketAsync(ticketId);
        if (ticket is null)
            return false;
        _context.Tickets.Remove(ticket);
        var removed = await _context.SaveChangesAsync();
        return removed > 0;
    }

    public async Task<IEnumerable<Ticket>?> GetCancelledTicketsAsync(string username)
    {
        var tickets = await _context.Tickets.Where(t => t.Cancelled && t.OwnerUsername == username).ToListAsync();
        return tickets;
    }
}