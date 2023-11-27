
import './App.css';
import Row from './Row'
import requests from './requests';
function App() {
  return (
    <div className="App">
     <h>Hello</h>
     <Row title= "NETFLIX ORIGINALS" fetchUrl = {requests.fetchNetflixOriginals}/>
     <Row title= "TRENDING" fetchUrl = {requests.fetchHorrorMovies}/>
    
    </div>
  );
}


export default App;
