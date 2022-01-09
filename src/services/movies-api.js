import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.timeout = 2000;

axios.defaults.params = {
  api_key: '1864237c574b53c5ecfa60302c52d8aa',
};

export async function fetchTrending(TimeWindow = 'day') {
  const url = `trending/movie/${TimeWindow}`;
  try {
    const fetchResult = await axios.get(url);
    // console.log('fetchTrending', fetchResult);
    // const TrendingArray = fetchResult.data.results;
    return fetchResult.data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchById(id) {
  const url = `movie/${id}`;
  try {
    const fetchResult = await axios.get(url);
    // console.log('fetchById', fetchResult);
    return fetchResult.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchByKeyWord(query) {
  const url = `search/movie`;
  try {
    const fetchResult = await axios.get(url, { params: { query } });
    console.log('fetchByKeyWord', fetchResult);
    return fetchResult.data.results;
  } catch (error) {
    console.error(error);
  }
}
