using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.Net.Mime;
using System.Net.NetworkInformation;
using System.Text.Json;

namespace TodoDemo.Server
{
  public class ICMPHealthCheck : IHealthCheck
  {
    private readonly string Host;
    private readonly int HealthyRoundtripTime;

    public ICMPHealthCheck(string host, int healthyRoundtripTime)
    {
      this.Host = host;
      this.HealthyRoundtripTime = healthyRoundtripTime;
    }

    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
      try
      {
        using var ping = new Ping();
        var reply = await ping.SendPingAsync(Host);

        switch (reply.Status)
        {
          case IPStatus.Success:
            {
              var msg = $"ICMP to {Host} took {reply.RoundtripTime} ms.";
              return reply.RoundtripTime > this.HealthyRoundtripTime ? HealthCheckResult.Degraded(msg) : HealthCheckResult.Healthy(msg);
            }
          default:
            {
              var err = $"ICMP to {Host} failed: {reply.Status}";
              return HealthCheckResult.Unhealthy(err);
            }
        }
      }
      catch (Exception ex)
      {
        var err = $"ICMP failed: {ex.Message}";
        return HealthCheckResult.Unhealthy(err);
      }
    }
  }
}
