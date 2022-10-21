import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import axios from "axios";

//CSS
import "./SearchBar.css";

function SearchBar2({ placeholder, data }) {

  const [listofServices, setListofServices] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5008/getServices')
      .then((response) => {
        setListofServices(response.data);
      })
  }, []);


  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [variable, setVariable] = useState("");
  console.log({ wordEntered })

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
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
  const setValues = (value) => {
    console.log(value);
    setVariable(variable);
  }
  
  return (
    <div className="search">
      <div className="serchBoxBack">
        <div className="searchInputs">
          <input
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIconBox">
            <div className="searchIcon">
              {filteredData.length === 0 ? (
                <SearchIcon />
              ) : (
                <CloseIcon id="clearBtn" onClick={clearInput} />
              )}
            </div>
          </div>
        </div>

        {filteredData.length !== 0 && (
          <div className="dataResult2">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <a key={key} className="dataItem2" target="_blank">
                   <div className="serviceName">
                  <Link to={"/service/" + value}> <p> {value} </p></Link>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
export default SearchBar2;