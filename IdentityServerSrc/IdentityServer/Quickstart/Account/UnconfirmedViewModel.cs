using IdentityServerCore.Models;

namespace IdentityServer.Quickstart.Account
{
    public record UnconfirmedViewModel(IEnumerable<ApplicationUser> Users);
}