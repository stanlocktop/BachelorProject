using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebApiApplication.Services;
using WebApiContracts.Services;
using WebApiDal;
using WebApiDal.Persistence;

namespace WebApiApplication;

public static class DependencyInjection
{
    //register services
    public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddInfrastructure(configuration);
        services.AddTransient<ITicketService, TicketService>();
        return services;
    }

    public static IApplicationBuilder UseDevelopmentApplication(this IApplicationBuilder app)
    {
        app.SeedDatabase();
        return app;
    }
}