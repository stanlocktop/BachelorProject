using Azure.Core;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using IdentityServer;
using IdentityServer4;
using IdentityServer4.AspNetIdentity;
using IdentityServer4.Models;
using IdentityServerCore.Models;
using IdentityServerDal;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddRazorPages();
var secretClient = new SecretClient(new Uri(builder.Configuration["KeyVaultUri"]!), new DefaultAzureCredential(),
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
builder.Services.AddPersistence(secretClient);

builder.Services.AddIdentityServer()
    .AddInMemoryApiScopes(Config.GetApiScopes())
    .AddInMemoryClients(Config.GetClients())
    .AddInMemoryApiResources(Config.GetApiResources())
    .AddInMemoryIdentityResources(Config.GetIdentityResources())
    .AddDeveloperSigningCredential()
    .AddAspNetIdentity<ApplicationUser>();
builder.Services.AddAuthentication("Bearer").AddJwtBearer(options =>
{
    options.Authority = "https://serviceofidentification.azurewebsites.net";
    options.Audience = "api1";
    options.RequireHttpsMetadata = false;
});

builder.Services.AddAuthorization(options=>{
    options.AddPolicy("Admin", policy => policy.RequireClaim("role", "Admin"));
});
builder.Services.AddAuthentication().AddGoogle("Google","Google",options =>
{
    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
    options.ClientId = ((KeyVaultSecret)secretClient.GetSecret("googleClientId")).Value;
    options.ClientSecret = ((KeyVaultSecret)secretClient.GetSecret("googleClientSecret")).Value;
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddControllersWithViews();

var app = builder.Build();


app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UseCors("CorsPolicy");
app.MapControllerRoute(name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.UseIdentityServer();
app.MapRazorPages();

app.Run();

namespace IdentityServer
{
    public static class Config
    {
        public static IEnumerable<ApiScope> GetApiScopes()
        {
            return new[]
            {
                new ApiScope()
                {
                    Name = "api1",
                    DisplayName = "My API",
                    Description = "Access to my API",
                    UserClaims = new List<string>()
                    {
                        "role"
                    },
                }
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new[]
            {
                new Client()
                {
                    ClientId = "angular.client",
                    ClientName = "Angular Client",
                    AllowedGrantTypes = GrantTypes.Code,
                    ClientSecrets = new List<Secret>() { new("secret".Sha256()) },
                    AllowedScopes = new List<string>()
                    {
                        "openid",
                        "profile",
                        "api1",
                        "role"
                    },
                    RedirectUris = { "https://uahelper.azurewebsites.net/signin-callback",},
                    PostLogoutRedirectUris = { "https://uahelper.azurewebsites.net/signout-callback",},
                    AllowOfflineAccess = true,
                    UpdateAccessTokenClaimsOnRefresh = true,
                    
                }
            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
                new IdentityResources.Phone(),
                new IdentityResource("role", "Your role(s)", new List<string>() {"role"}),
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new[]
            {
                new ApiResource()
                {
                    Name = "api1",
                    DisplayName = "My API",
                    Description = "Access to my API",
                    Scopes = new List<string>()
                    {
                        "api1"
                    },
                    UserClaims = new List<string>()
                    {
                        "role"
                    }
                }
            };
        }
    }
}