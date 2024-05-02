import logo from '../logo.svg';
import Weather from '../Weather/Weather.js';
import './App.css';

function App() {
  return (
      <div className="App">
          <h1 className="Title">What's the weather like today?</h1>
          <Weather className="Weather"/>
      </div>
  );
}

export default App;
