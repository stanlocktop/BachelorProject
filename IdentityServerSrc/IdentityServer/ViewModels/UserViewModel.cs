namespace IdentityServer.ViewModels;

public class UserViewModel
{
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public bool? EmailConfirmed { get; set; }
    public string? FullName { get; set; }
}