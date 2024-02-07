using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MyApp.Models;

namespace MyApp.Controllers;

public class HomeController(ILogger<HomeController> logger) : ServiceStackController
{
    private readonly ILogger<HomeController> _logger = logger;

    public IActionResult Index() => View();

    public IActionResult Privacy() => View();
    public async Task<IActionResult> Bookings()
    {
        var response = await Gateway.ApiAsync(new QueryBookings { 
            OrderByDesc = nameof(Booking.Id),
            Take = 10,
        });

        return View(response.Response);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
