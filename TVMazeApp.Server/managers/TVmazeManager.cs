using System.Text.Json;
using TVMazeApp.Server.Models;

namespace TVMazeApp.Server.managers
{
    public class TVmazeManager
    {
        private readonly HttpClient _client = new() { BaseAddress = new Uri("http://api.tvmaze.com") };// used for all requests to the TVMaze API
        
        //because the data arrived from TVmaze is camelCase, we have to set special Property naming policy.
        private JsonSerializerOptions Options =>
            new()
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                PropertyNameCaseInsensitive = true
            };

        /// <summary>
        /// Returns a list of shows, as row data. If nothing found returns empty list.
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public async Task<IEnumerable<ShowRowData>> SearchShowsAsyncTask(string query)
        {
            {
                try
                {
                    var response = await _client.GetAsync($"/search/shows?q={query}");
                    response.EnsureSuccessStatusCode();
                    var content = await response.Content.ReadAsStringAsync();
                    var shows = JsonSerializer.Deserialize<List<ShowRowData>>(content, Options);
                    return shows ?? [];
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    return new List<ShowRowData>();
                }
            }
        }


        /// <summary>
        /// Returns a specific show
        /// </summary>
        /// <param name="id"></param>
        /// <param name="includeEpisodes"></param>
        /// <param name="includeCast"></param>
        /// <param name="includeCrew"></param>
        /// <returns></returns>
        public async Task<Show?> GetShowAsyncTask(int id, bool includeEpisodes = false, bool includeCast = false, bool includeCrew = false)
        {
            try
            {
                var queryParams = QueryParams(includeEpisodes, includeCast, includeCrew);

                var response = await _client.GetAsync($"/shows/{id}{(!string.IsNullOrEmpty(queryParams) ? $"?{queryParams}" : "")}");
                response.EnsureSuccessStatusCode();
                var content = await response.Content.ReadAsStringAsync();
                var show = JsonSerializer.Deserialize<Show>(content, Options);
                return show ?? null;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
        }

        

        /// <summary>
        /// Returns a list of shows from a list of ids
        /// </summary>
        /// <param name="showsIds"></param>
        /// <param name="includeEpisodes"></param>
        /// <param name="includeCast"></param>
        /// <param name="includeCrew"></param>
        /// <returns>a list of shows, show may be null if its request failed</returns>
        public async Task<List<Show?>?> GetShowsBulk(List<int> showsIds, bool includeEpisodes, bool includeCast, bool includeCrew)
        {
            try
            {
                List<Show?> shows = new();
                QueryParams(includeEpisodes, includeCast, includeCrew);

                foreach (var id in showsIds)
                {
                    try
                    {
                        shows.Add(await GetShowAsyncTask(id, includeEpisodes, includeCast, includeCrew));
                    }
                    catch
                    {
                        shows.Add(null);
                    }
                }

                if (shows.All(x=>x == null))
                    return null;
                return shows;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
        }
        public async Task<List<Show>> GetShowsAsync(int limit, int offset)
        {
            limit = limit == 0 ? 250 : limit;
            try
            {
                var pageOffset = offset / 250;
                var inResponseIndex = offset % 250;
                var amountToTake = Math.Min(250 - inResponseIndex, limit);
                var response = await _client.GetAsync($"/shows?page={pageOffset}");
                List<Show>? shows2 = null;
                response.EnsureSuccessStatusCode();
                var content = await response.Content.ReadAsStringAsync();
                var shows = JsonSerializer.Deserialize<List<Show>>(content, Options);
                shows = shows?.Skip(offset).Take(amountToTake).ToList();
                if (amountToTake < limit)
                {
                    var response2 = await _client.GetAsync($"/shows?page={pageOffset + 1}");
                    response2.EnsureSuccessStatusCode();
                    var content2 = await response2.Content.ReadAsStringAsync();
                    shows2 = JsonSerializer.Deserialize<List<Show>>(content2, Options);
                    shows2 = shows2?.Take(limit - amountToTake).ToList();
                }
                shows?.AddRange(shows2 ?? new List<Show>());
                return shows ?? new List<Show>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
        }

        /// <summary>
        /// Constructs the embedded parameters for a show query string
        /// </summary>
        /// <param name="includeEpisodes"></param>
        /// <param name="includeCast"></param>
        /// <param name="includeCrew"></param>
        /// <returns></returns>
        private string QueryParams(bool includeEpisodes, bool includeCast, bool includeCrew)
        {
            string queryParams = string.Join("&", new[] {
                includeEpisodes ? "embed[]=episodes" : null,
                includeCast ? "embed[]=cast" : null,
                includeCrew ? "embed[]=crew" : null
            }.Where(x => x != null));
            return queryParams;
        }

        
    }



}
