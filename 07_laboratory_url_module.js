const url = require('url');
const myUrl = 'http://www.example.com:8080/pathname?name=JohnDoe#fragment';

const parsedUrl = url.parse(myUrl, true);
console.log('Parsed URL Object:', parsedUrl);

console.log('Query parameter "name":', parsedUrl.query.name);
