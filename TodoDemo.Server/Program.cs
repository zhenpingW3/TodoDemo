
namespace TodoDemo.Server
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var builder = WebApplication.CreateBuilder(args);

      // Add services to the container.
      builder.Services.AddCors(options =>
      {
        options.AddPolicy("AllowAllOrigins", builder =>
        {
          builder.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader();
        });
      });

      builder.Services.AddHealthChecks()
        .AddCheck("ICMP_01", new ICMPHealthCheck("onlinealm.moodysanalytics.com", 200))
        .AddCheck("ICMP_02", new ICMPHealthCheck("www.google.com", 200))
        .AddCheck("ICMP_03", new ICMPHealthCheck("qa.onlinealm.moodysanalytics.net", 200));

      builder.Services.AddControllers();
      // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
      builder.Services.AddEndpointsApiExplorer();
      builder.Services.AddSwaggerGen();

      var app = builder.Build();

      app.UseCors("AllowAllOrigins");

      // Configure the HTTP request pipeline.
      if (app.Environment.IsDevelopment())
      {
        app.UseSwagger();
        app.UseSwaggerUI();
      }

      app.UseHttpsRedirection();

      app.UseAuthorization();

      app.UseHealthChecks(new PathString("/api/health"),new CustomHealthCheckOptions());

      app.MapControllers();

      app.MapFallbackToFile("/index.html");

      app.Run();
    }
  }
}
