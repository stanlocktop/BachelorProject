using System.ComponentModel.DataAnnotations;

namespace IdentityServer.Quickstart.Account;

public class RegistrationInputModel
{
    public string? ReturnedMessage { get; set; }
    [Required]
    [MinLength(4)]
    [MaxLength(20)]
    public string Username { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
    [Required]
    [DataType(DataType.Password)]
    [Compare("Password")]
    public string ConfirmPassword { get; set; }
    [Required]
    public string ReturnUrl { get; set; }
}