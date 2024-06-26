using Microsoft.Extensions.FileProviders;
using System.IO;
using credit_cards_manager.Services;
using credit_cards_manager.Tests;
using credit_cards_manager.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddMemoryCache();
builder.Services.AddScoped<ICardService, MockCardService>();
builder.Services.AddScoped<IBankService, MockBankService>();
builder.Services.AddScoped<IUserService, UserService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

// Add JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("your_secret_key_here_your_secret_key_here")), // Replace with your secret key.
            ValidateIssuer = false,
            ValidateAudience = false,
        };
    });

// Configures CacheSettings with the values from the appsettings.json file:
builder.Services.Configure<CacheSettings>(builder.Configuration.GetSection("CacheSettings"));

// Add CORS policy to allow requests from the React app
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder.WithOrigins("http://localhost:5173") // replace with the origin of your React app
                           .AllowAnyMethod()
                           .AllowAnyHeader());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

// Configure static files to be served from the CardImages folder
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "CardImages")),
    RequestPath = "/CardImages"
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
