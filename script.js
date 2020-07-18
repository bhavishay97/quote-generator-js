const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = 'https://obscure-sands-97543.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  let count = 0;
  const maxTries = 10;

  while (true) {
    try {
      const response = await fetch(`${proxyUrl}${apiUrl}`);
      const data = await response.json();

      // if author is blank, add Anonymous
      if (data.quoteAuthor === '') authorText.innerText = 'Anonymous';
      else authorText.innerText = data.quoteAuthor;

      // reduce font size for long quotes
      if (data.quoteText.length > 120) quoteText.classList.add('long-quote');
      else quoteText.classList.remove('long-quote');

      quoteText.innerText = data.quoteText;
      hideLoadingSpinner();
      break;
    } catch (err) {
      if (++count === maxTries) {
        alert('Something went wrong. Please reload.');
        throw err;
      }
    }
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} ~ ${author}&hashtags=QuoteOfTheDay`;
  window.open(twitterUrl, '_blank');
}

// on load
getQuote();

// event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
