# Quote Generator
A quote generator that allows the user to easily tweet a randomly generated quote.

## Forismatic API
Uses the forismatic quote generator API which is located at http://api.forismatic.com/api/1.0/

## Proxy Server
Uses a copy of the CORS Anywhere Node.js proxy to add CORS headers to the API request.
CORS Anywhere can be found here: https://github.com/Rob--W/cors-anywhere/
I hosted a copy of it on a heroku server.

## Exponential Backoff
I've implemented exponential backoff in the case of a failed API call.
