import dotenv from 'dotenv';
import fetch from 'node-fetch';
import {VercelRequest, VercelResponse} from '@vercel/node';

dotenv.config();

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const { title, page, id } = JSON.parse(request.body as string);
  const url =  id 
        ? `https://www.omdbapi.com/?apikey=${process.env.OMDb_API_KEY}&i=${id}&plot=full` 
        : `https://www.omdbapi.com/?apikey=${process.env.OMDb_API_KEY}&s=${title}&page=${page}`;
  const res = await fetch(url);
  const json = await res.json();
  response.status(200).json(json)
}