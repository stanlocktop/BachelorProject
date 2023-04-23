using IdentityServer.ViewModels;
using IdentityServerCore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace IdentityServer.Controllers;

[Authorize(AuthenticationSchemes = "Bearer")]
public class ProfileController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    public ProfileController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }
    [HttpGet("profile/{username}")]
    public async Task<IActionResult> Get(string username)
    {
        var user = await _userManager.FindByNameAsync(username);
        
        if(user == null)
        {
            return NotFound();
        }

        var viewModel = new UserViewModel()
        {
            Email = user.Email,
            Username = user.UserName,
            FullName = user.FirstName + " " + user.LastName,
            PhoneNumber = user.PhoneNumber,
            EmailConfirmed = user.EmailConfirmed
        };
        return Ok(viewModel);
    }
    [HttpPut("profile/{username}")]
    public async Task<IActionResult> Put(string username, [FromBody] ProfileInfoDto viewModel)
    {
        var user = await _userManager.FindByNameAsync(username);
        if(user == null)
        {
            return NotFound();
        }
        user.FirstName = viewModel.FirstName;
        user.LastName = viewModel.LastName;
        user.PhoneNumber = viewModel.PhoneNumber;
        await _userManager.UpdateAsync(user);
        return Ok();
    }
}