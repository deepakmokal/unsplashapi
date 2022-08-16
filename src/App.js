
import './App.css';
import { useState, useEffect } from 'react';


function App() {

  const [term, setTerm] = useState('Batman');
  const [result, setResult] = useState([]);


  const getResult = async () => {
    const response =  await fetch(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_APIKEY}&page=1&query=${term}`)
    .then((data) => data.json())
    .then((json) => setResult(json.results))
    .catch(err => console.error(err))
    
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if(term){
        getResult();
      }
    }, 1000)
  
    return () => {
      clearTimeout(timeOutId)
    }
  }, [term])
  


  return (
    <>
      <div className="container-fluid">
        <h1 className="text-center mt-4">Wecome to Unsplash Book</h1>

        <div className="searchKeyword d-flex justify-content-center mt-3">
          <input type="text" className="form-control w-50"
            value={term}
            onChange={(e) => { setTerm(e.target.value) }}
            placeholder="search your favourite images" />
        </div>

        <div className="masonry-container mt-5">

          {result.map((item) => {
            console.log(item)
            return (
              <div className='masonry-item' key={item.id}>
                <img src={item.urls.small} />
              </div>
            )
          })
          }


        </div>
      </div>
    </>
  );
}

export default App;
