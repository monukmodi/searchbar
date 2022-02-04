import React, { useState , useEffect} from "react";
import axios from 'axios'
import "./search.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

function Search({ placeholder }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState()

  // Fetching API Data
  useEffect (() => {
      axios.get('http://www.mocky.io/v2/5ba8efb23100007200c2750c')
        .then(res => {
            // console.log("apiData",res.data)
            setData(res.data)
        })
        .catch(err => {
            console.log(err)
        })
  },[])
  // Setting input data and filetering with the fields
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    
    const newFilter = data.filter((item) => {
         return Object.keys(item).some(key => {
             return item[key].toString().toLowerCase().includes(searchWord.toLowerCase())
         })
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };


  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
      <div className="searchIcon">
      <SearchIcon />
        </div>

        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
          <div className="searchIcon">
          {wordEntered.length > 0 ? (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          ) : ""}
        </div>
        
      </div>
      {filteredData.length !== 0 ? (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
                  <div className="user-card" key={value.id}>
                    <div className="card-style">
                    <span className="user-id">{value.id} </span>
                    <br />
                    <span className="user-name">{value.name} </span>
                    <br />
                    <p className="user-address">{value.address}</p>
                  </div>
                  </div>
            );
          })}
        </div>
      ) : <>{wordEntered.length > 0 ? <div className="NodataResult"> <h3>No User Found</h3> </div> :""}</>
      }
    </div>
  );
}

export default Search;
