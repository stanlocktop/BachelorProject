using Microsoft.AspNetCore.Identity;

namespace IdentityServerCore.Models;

public class ApplicationUser : IdentityUser<Guid>
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? ProviderName { get; set; }
    public string? ProviderSubjectId { get; set; }
}