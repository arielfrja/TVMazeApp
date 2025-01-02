using Microsoft.AspNetCore.Mvc;
using TVMazeApp.Server.managers;
using TVMazeApp.Server.Models;

namespace TVMazeApp.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class TVmazeApiController : ControllerBase
    {
        private readonly TVmazeManager _manager = new TVmazeManager();

        private readonly ILogger<TVmazeApiController> _logger;

        public TVmazeApiController(ILogger<TVmazeApiController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Returns a list of shows
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpGet("GetShowsShort")]
        public async Task<IEnumerable<ShowShortViewModel>> GetShowsShort(string name)
        {
            var shows = await _manager.SearchShowsAsyncTask(name);
            return shows.Select(x => new ShowShortViewModel(x));
        }

        /// <summary>
        /// Returns a specific show
        /// </summary>
        /// <param name="id"></param>
        /// <param name="includeEpisodes"></param>
        /// <param name="includeCast"></param>
        /// <param name="includeCrew"></param>
        /// <returns></returns>
        [HttpGet("GetShow")]
        public async Task<Show?> GetShow(int id, bool includeEpisodes = false, bool includeCast = false,
            bool includeCrew = false)
        {
            var show = await _manager.GetShowAsyncTask(id, includeEpisodes, includeCast, includeCrew);
            return show;
        }

        /// <summary>
        /// Returns a list of shows from a list of ids
        /// </summary>
        /// <returns>list of shows. if nothing found return null</returns>
        [HttpGet("BulkSGetShows")]
        public async Task<IEnumerable<ShowShortViewModel>?> BulkSGetShows([FromQuery] List<int> showsIds, bool includeEpisodes = false, bool includeCast = false,
        bool includeCrew = false)
        {
            var shows = await _manager.GetShowsBulk(showsIds, includeEpisodes, includeCast, includeCrew);
            return shows?.Where(x => x != null).Select(x => new ShowShortViewModel(x!));
        }

        /// <summary>
        /// Returns a list of shows from TVmaze index, by limit and offset
        /// </summary>
        /// <param name="limit"></param>
        /// <param name="offset"></param>
        /// <returns></returns>
        [HttpGet("Shows")]
        public async Task<IEnumerable<ShowShortViewModel>?> ShowIndex(int limit = 250, int offset = 0)
        {
            {
                var shows = await _manager.GetShowsAsync(limit, offset);
                return shows.Select(x => new ShowShortViewModel(x));
            }
        }
    }
}
