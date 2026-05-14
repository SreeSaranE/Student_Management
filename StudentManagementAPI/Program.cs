using Microsoft.EntityFrameworkCore;
using StudentManagementAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// ADD SERVICES

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// CORS

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:5173",
                "https://student-management-git-main-sreesaranes-projects.vercel.app"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
        }
    );
});

// SWAGGER

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

// BUILD APP

var app = builder.Build();

// SWAGGER

app.UseSwagger();

app.UseSwaggerUI();

// HTTPS REDIRECTION DISABLED FOR RENDER

// app.UseHttpsRedirection();

// CORS

app.UseCors("AllowFrontend");

// AUTHORIZATION

app.UseAuthorization();

// MAP CONTROLLERS

app.MapControllers();

// ROOT ENDPOINT

app.MapGet("/", () =>
    "Student Management API Running"
);

// AUTO APPLY DATABASE MIGRATIONS

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider
        .GetRequiredService<AppDbContext>();

    db.Database.Migrate();
}

// RUN APP

app.Run();