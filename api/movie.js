import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

export default async function handler(request, response) {
  const { title, page, id } = JSON.parse(request.body);
  const url =  id 
        ? `https://www.omdbapi.com/?apikey=${process.env.OMDb_API_KEY}&i=${id}&plot=full` 
        : `https://www.omdbapi.com/?apikey=${process.env.OMDb_API_KEY}&s=${title}&page=${page}`;
  const res = await fetch(url);
  const json = await res.json();
  response.status(200).json(json)
}