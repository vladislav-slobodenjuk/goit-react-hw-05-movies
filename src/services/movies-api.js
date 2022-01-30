import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 2000,
  params: {
    api_key: '1864237c574b53c5ecfa60302c52d8aa',
  },
});

export async function fetchTrending(TimeWindow = 'day') {
  const url = `trending/movie/${TimeWindow}`;
  try {
    const { data } = await instance.get(url);
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchById(id) {
  const url = `movie/${id}`;
  try {
    const { data } = await instance.get(url);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchByKeyWord(query) {
  const url = `search/movie`;
  try {
    const { data } = await instance.get(url, { params: { query } });
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAdditional(id, pathname) {
  const url = `movie/${id}/${pathname}`;
  try {
    const { data } = await instance.get(url);
    return data;
  } catch (error) {
    console.error(error);
  }
}
