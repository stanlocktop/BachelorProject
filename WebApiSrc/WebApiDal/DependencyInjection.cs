using Azure.Core;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebApiDal.Persistence;

namespace WebApiDal;

public static class DependencyInjection
{
    //register dbcontext 
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var secretClient = new SecretClient(new Uri(configuration["KeyVaultUri"]!), new DefaultAzureCredential(),
            new SecretClientOptions
            {
                Retry =
                {
                    Delay = TimeSpan.FromSeconds(2),
                    MaxDelay = TimeSpan.FromSeconds(16),
                    MaxRetries = 5,
                    Mode = RetryMode.Exponential
                }
            });
        services.AddDbContext<ApplicationContext>(options =>
            options.UseNpgsql(((KeyVaultSecret)secretClient.GetSecret("connectionString")).Value));
        return services;
    }
    
}