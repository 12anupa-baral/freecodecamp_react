import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteBox = () => {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [loading, setLoading] = useState(true);

  const getQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.quotable.io/random");
      setQuote(response.data);
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  const handleNewQuote = () => {
    getQuote();
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div id="quote-box">
      <h1 id="text">{quote.content}</h1>
      <p id="author">{quote.author}</p>
      <button onClick={handleNewQuote} id="new-quote">New Quote</button>
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(quote.text)} - ${encodeURIComponent(quote.author)}`} id="tweet-quote" target="_blank" rel="noopener noreferrer">Tweet Quote</a>
    </div>
  );
};

export default QuoteBox;
