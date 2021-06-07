import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 1 }, // below normal load
    { duration: '5m', target: 1 },
    { duration: '2m', target: 10 }, // normal load
    { duration: '5m', target: 10 },
    { duration: '2m', target: 100 }, // around the breaking point
    { duration: '5m', target: 100 },
    { duration: '2m', target: 1000 }, // beyond the breaking point
    { duration: '5m', target: 1000 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:4032'; // make sure this is not production

  const payload = JSON.stringify({
    name: 'Age of Empires II: Definitive Edition',
    price: 19.99,
    description: '[long description]',
    shortDescription: '[short description]',
    genre: 'Strategy',
    developer: 'Forgotton Empires',
    publisher: 'Xbox Game Studios',
    releaseDate: new Date('14 Nov 2019').getTime()
  });

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  let response = http.post(BASE_URL, payload, params);

  sleep(1);
}
