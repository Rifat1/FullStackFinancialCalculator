using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http;  // <-- Needed for Results.Ok and Results.BadRequest
using System;

var builder = WebApplication.CreateBuilder(args);

// Enable CORS for frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowFrontend");

app.MapGet("/api/cagr", (double startingValue, double endingValue, double years) =>
{
    if (startingValue <= 0 || endingValue <= 0 || years <= 0)
    {
        return Results.BadRequest("Values must be greater than zero.");
    }

    var cagr = Math.Pow(endingValue / startingValue, 1 / years) - 1;
    return Results.Ok(new { CAGR = cagr * 100 });
});

app.Run();