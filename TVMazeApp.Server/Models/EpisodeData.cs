using System.Text.Json.Serialization;
using TVMazeApp.Server.Logic;

namespace TVMazeApp.Server.Models;

public class EpisodeData
{
    public int Id { get; set; }
    public string Url { get; set; }
    public string Name { get; set; }
    public int Season { get; set; }
    public int Number { get; set; }
    public string Type { get; set; }

    [JsonConverter(typeof(DateOnlyConverter))]
    public DateOnly? Airdate { get; set; }
    [JsonConverter(typeof(TimeOnlyConverter))]
    public TimeOnly? Airtime { get; set; }

    [JsonConverter(typeof(DateTimeConverter))]
    public DateTime? Airstamp { get; set; }
    public int Runtime { get; set; }
    public Rating Rating { get; set; }
    public Image Image { get; set; }
    public string Summary { get; set; }
    public Links Links { get; set; }
}