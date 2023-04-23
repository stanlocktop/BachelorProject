using Azure.Security.KeyVault.Secrets;
using IdentityServerCore.Models;
using IdentityServerDal.Features;
using IdentityServerDal.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityServerDal;

public static class DependencyInjection
{
    public static IServiceCollection AddPersistence(this IServiceCollection services, SecretClient secretClient)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(((KeyVaultSecret)secretClient.GetSecret("connectionString")).Value));
        
        services.AddIdentity<ApplicationUser, IdentityRole<Guid>>(options =>
            {
                options.User.RequireUniqueEmail = true;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
                options.SignIn.RequireConfirmedAccount=true;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders()
            .AddUserManager<UserManager>();
        return services;
    }
}