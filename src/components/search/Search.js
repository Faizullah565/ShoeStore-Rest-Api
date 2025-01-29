// SearchComponent.js
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalState";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const { addSearchShoes } = useContext(GlobalContext)
  const { search } = useContext(GlobalContext)

  // Speech Recognition Setup
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  const handleVoiceSearch = () => {
    setIsListening(true);
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      handleSearch(transcript);
      setIsListening(false);
    };
    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
  };
  const handleSearch = async (searchQuery = query) => {
    // console.log(query)
    try {
      const response = await axios.get(`http://localhost:5000/api/Search/search?q=${searchQuery}`);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    addSearchShoes(results)
  }, [results])



  return (
    <div className="container">
      {/* <h1>Search Items</h1> */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-md p-2"
            placeholder="Search for an item..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={handleVoiceSearch}
            disabled={isListening}
          >
            {isListening ? "Listening..." : "🎤 Voice Search"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchComponent;
