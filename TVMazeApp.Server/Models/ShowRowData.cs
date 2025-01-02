using System.Text.Json.Serialization;
using TVMazeApp.Server.Logic;

namespace TVMazeApp.Server.Models;

public class Show
{
    public int Id { get; set; }
    public string Url { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public string Language { get; set; }
    public List<string> Genres { get; set; }
    public string Status { get; set; }
    public int? Runtime { get; set; }
    public int AverageRuntime { get; set; }

    [JsonConverter(typeof(DateOnlyConverter))]
    public DateOnly? Premiered { get; set; }

    [JsonConverter(typeof(DateOnlyConverter))]
    public DateOnly? Ended { get; set; }
    public string OfficialSite { get; set; }
    public Schedule Schedule { get; set; }
    public Rating Rating { get; set; }
    public int Weight { get; set; }
    public Network Network { get; set; }
    public object WebChannel { get; set; }
    public object DvdCountry { get; set; }
    public Externals Externals { get; set; }
    public Image Image { get; set; }
    public string Summary { get; set; }
    public int Updated { get; set; }
    public Links Links { get; set; }
    public Embedded _embedded { get; set; }
}

public class ShowRowData
{ 
    public double? Score { get; set; }

    public Show? Show { get; set; }
}

public class Rating
{
    public double? Average { get; set; }
}

public class Schedule
{

    [JsonConverter(typeof(TimeOnlyConverter))]
    public TimeOnly? Time { get; set; }
    public List<string> Days { get; set; }
}

public class Network
{
    public int Id { get; set; }
    public string Name { get; set; }
    public Country Country { get; set; }
    public string OfficialSite { get; set; }
}

public class Country
{
    public string Name { get; set; }
    public string Code { get; set; }
    public string Timezone { get; set; }
}

public class Externals
{
    public int? Tvrage { get; set; }
    public int? Thetvdb { get; set; }
    public string Imdb { get; set; }
}

public class Links
{
    public Link Self { get; set; }
    public Link Previousepisode { get; set; }
}

public class Link
{
    public string Href { get; set; }
    public string Name { get; set; }
}

public class Embedded
{
    public List<EpisodeData> Episodes { get; set; }
    public List<CastMember> Cast { get; set; }
    public List<CrewMember> Crew { get; set; }
}

public class Character
{
    public int Id { get; set; }
    public string Url { get; set; }
    public string Name { get; set; }
    public Image Image { get; set; }
    public Links Links { get; set; }
}