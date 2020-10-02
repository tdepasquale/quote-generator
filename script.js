let errorCount = 0;
const maxErrorsAllowed = 3;
const initialDelay = 50;
let delay = initialDelay;

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function resetErrorCount() {
  errorCount = 0;
  delay = initialDelay;
}

function increaseDelay() {
  delay *= 2;
}

function displayErrorText() {
  quoteText.innerText = "Sorry, something went wrong :(";
  authorText.innerText = "The API";
  removeLoadingSpinner();
}

function exponentialBackoff() {
  errorCount++;
  console.log(errorCount);
  if (errorCount >= maxErrorsAllowed) {
    resetErrorCount();
    displayErrorText();
  } else {
    increaseDelay();
    setTimeout(getQuoteFromAPI, delay);
  }
}

async function getQuoteFromAPI() {
  showLoadingSpinner();
  const proxyURL = "https://stark-castle-13128.herokuapp.com/";
  const apiURL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyURL + apiURL);
    const data = await response.json();

    data.quoteAuthor === ""
      ? (authorText.innerText = "Unknown")
      : (authorText.innerText = data.quoteAuthor);

    data.quoteText.length > 120
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");

    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
    resetErrorCount();
  } catch (error) {
    exponentialBackoff();
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", getQuoteFromAPI);
twitterBtn.addEventListener("click", tweetQuote);

getQuoteFromAPI();
