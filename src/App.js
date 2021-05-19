import logo from './logo.svg';
import './App.css';
import { HomePage } from './containers/HomePage';
import { BrowserRouter as Router } from 'react-router-dom';
import Professor from './Users/Professor';

function App() {
  // return <div className="App">
  //   <HomePage/>
  // </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  ;

  

  return (

    
    <Router>
      <div className='yamaniTemp'>
        <Professor/>
      </div>
    </Router>
  );
}

export default App;
