namespace TVMazeApp.Server.Models
{
    public class ShowShortViewModel(Show show)
    {
        public int ID { get; set; } = show.Id;
        public string Name { get; set; } = show.Name;
        public List<string> Genres { get; set; } = show.Genres;
        public double? Rating { get; set; } = show.Rating.Average ?? null;
        public Image Image { get; set; } = show.Image;
        public string Language { get;set; } = show.Language;
        public string Summary { get; set; } = show.Summary;
        
        public ShowShortViewModel(ShowRowData showRowData) : this(showRowData.Show!) { }
    }
}
