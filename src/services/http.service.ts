import axios from 'axios';

const ACCESS_TOKEN = [
  'c50a5c173668a61a7dfe6cca80eb95754be7a079',
  'c55b337aadf000e306e8bf2dcb92eb8922b88626',
  '140042e8e8b1df5cd8cd4880f0da121dd54afe46',
  '95e0cf78e51545c4c9673b9370f753fcc9afe3ba',
  'cdee69723ae126f44ef1f743c54c3434b7d0c230',
  'c03b764344a095c32bec39c42228030e4a299a59',
];

const http = axios.create({
  headers: {
    Accept: 'application/vnd.github.v3.star+json',
    Authorization: `token ${ACCESS_TOKEN[Math.floor(Math.random() * ACCESS_TOKEN.length)]}`,
  },
});

export {http};
