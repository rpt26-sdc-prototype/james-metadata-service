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

  let id = Math.floor(Math.random() * 1e7) + 1;

  let response = http.get(`${BASE_URL}/${id})`);

  sleep(1);
}
