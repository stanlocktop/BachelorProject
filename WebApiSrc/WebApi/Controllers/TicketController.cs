using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Features;
using WebApiContracts.Services;
using WebApiCore.Dto.Common;
using WebApiCore.Dto.Ticket;

namespace WebApi.Controllers;

public class TicketController : ControllerBase
{
    private readonly ITicketService _ticketService;
    
    public TicketController(ITicketService ticketService)
    {
        _ticketService = ticketService;
    }
    [Authorize]
    [HttpGet("api1/tickets")]
    public async Task<IActionResult> GetTickets(PaginationParameters? paginationParameters)
    {
        var tickets = await _ticketService.GetTicketsAsync(paginationParameters);
        return Ok(tickets.Select(c=>c?.MapTicketViewModel()));
    }
    [Authorize]
    [HttpGet("api1/tickets/count")]
    public async Task<IActionResult> GetTicketsCount(string? username)
    {
        if (username is null)
        {
            var tickets = await _ticketService.GetTicketsAsync();
            return Ok(tickets.Count());
        }
        else
        {
            var tickets = await _ticketService.GetTicketsByUsernameAsync(username);
            return Ok(tickets.Count());
        }
    }
    [Authorize]
    [HttpGet("api1/{username}/tickets")]
    public async Task<IActionResult> GetTicketsByUser(string username, PaginationParameters? paginationParameters)
    {
        var tickets = await _ticketService.GetTicketsByUsernameAsync(username, paginationParameters);
        return Ok(tickets.Select(c=>c?.MapTicketViewModel()));
    }
    [Authorize]
    [HttpGet("api1/tickets/{id}")]
    public async Task<IActionResult> GetTicketById(Guid id)
    {
        var ticket = await _ticketService.GetTicketAsync(id);
        return Ok(ticket?.MapTicketViewModel());
    }
    [AllowAnonymous]
    [HttpPost("api1/tickets")]
    public async Task<IActionResult> CreateTicket([FromBody]TicketCreatingDto ticketDto)
    {
        var ticket = await _ticketService.CreateTicketAsync(ticketDto);
        return Ok(ticket);
    }
    [Authorize("Admin")]
    [HttpPut("api1/tickets/{id}")]
    public async Task<IActionResult> UpdateTicket(Guid id, [FromBody] TicketUpdatingDto ticketDto)
    {
        var ticket = await _ticketService.UpdateTicketAsync(id, ticketDto);
        return Ok(ticket);
    }
    [Authorize("Admin")]
    [HttpDelete("api1/tickets/{id}")]
    public async Task<IActionResult> DeleteTicket(Guid id)
    {
        var result = await _ticketService.DeleteTicketAsync(id);
        return Ok(result);
    }

    [Authorize]
    [HttpPost("api1/tickets/{id}/take")]
    public async Task<IActionResult> TakeTicket(Guid id, [FromBody]TakingTicketDto ticketDto)
    {
        var result =await _ticketService.TakeTicketAsync(id, ticketDto.Username);
        return Ok(result);
    }
    [Authorize]
    [HttpPost("api1/tickets/{id}/cancel")]
    public async Task<IActionResult> CancelTicket(Guid id)
    {
        var result = await _ticketService.CancelTicketAsync(id);
        return Ok(result);
    }
    [Authorize]
    [HttpGet("api1/tickets/cancelled")]
    public async Task<IActionResult> IsTicketCancelled(string username)
    {
        var result = await _ticketService.GetCancelledTicketsAsync(username);
        return Ok(result);
    }

}