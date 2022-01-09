import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.timeout = 2000;

axios.defaults.params = {
  api_key: '1864237c574b53c5ecfa60302c52d8aa',
  // per_page: 12,
};

export async function fetchTrending(TimeWindow = 'day') {
  const url = `trending/movie/${TimeWindow}`;
  try {
    const result = await axios.get(url);
    console.log(result);
    const TrendingArray = result.data.results;
    return TrendingArray;
  } catch (error) {
    console.error(error);
  }
}
