
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Router, Route, useNavigate, NavLink } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import { useDetectClickOutside } from 'react-detect-click-outside';

// CSS
import './SearchBar3.css';



function SearchBar3({ placeholder }) {

  const [listofServices, setListofServices] = useState([]);
  const [data,setData] =useState([])

  useEffect(() => {
    axios.get('http://127.0.0.1:5008/getServices')
      .then((response) => {
        setData(response.data);
      })


  }, []);

  

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [variable, setVariable] = useState("");
  // console.log({ wordEntered })

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
    <div className="search3">
      <div className="serchBoxBack3">
        <div className="searchInputs3">
          <input
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIconBox3">
            <div className="searchIcon3">
              {filteredData.length === 0 ? (
                <SearchIcon />
              ) : (
                <CloseIcon id="clearBtn" onClick={clearInput} />
              )}
            </div>
          </div>
        </div>

        {filteredData.length !== 0 && (
          <div id="dataResult3">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <a key={key} className="dataItem3" target="_blank">
                   <div className="serviceName">
                  <Link to={"/service/" + value} onClick={() => window.location.replace(`http://localhost:8000/service/${value}`)}> <p> {value} </p></Link>
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
export default SearchBar3;

// function Searchbar3({ placeholder, data }) {


//   const [listofServices, setListofServices] = useState([]);


//   useEffect(() => {
//     axios.get('http://127.0.0.1:5008/getServices')
//       .then((response) => {
//         setListofServices(response.data);
//       })
//   }, []);


//   const [filteredData, setFilteredData] = useState([]);
//   const [wordEntered, setWordEntered] = useState("");
//   const [variable, setVariable] = useState("");


//   console.log({ wordEntered })

//   const handleFilter = (event) => {
//     const searchWord = event.target.value;

//     setWordEntered(searchWord);

//     const newFilter = data.filter((value) => {
//       return value.toLowerCase().includes(searchWord.toLowerCase());
//     });
//     if (searchWord === "") {
//       setFilteredData([]);
//     } else {
//       setFilteredData(newFilter);
//     }

//   };
//   const clearInput = () => {
//     setFilteredData([]);
//     setWordEntered("");
//   };
//   const setValues = (value) => {
//     // console.log(value);
//     setVariable(variable);
//   }


//   return (
//     <div className="search3">
//       <div className="serchBoxBack3">
//         <div className="searchInputs3">
//           <input
//             type="text"
//             placeholder={placeholder}
//             value={wordEntered}
//             onChange={handleFilter}
//           />
//           <div className="searchIconBox3">

//             <div className="searchIcon3">
//               {filteredData.length === 0 ? (
//                 <SearchIcon />
//               ) : (
//                 <CloseIcon id="clearBtn3" onClick={clearInput} />
//               )}
//             </div>

//           </div>
//         </div>
//         {filteredData.length != 0 && (
//           <div className="dataResult3">
//             {filteredData.slice(0, 15).map((value, key) => {
//               // console.log('Filter' + value);
//               return (
//                 <a key={key} className="dataItem3" target="_blank">
//                   <div className="serviceName">
//                     <Link to={"/service/" + value}> <p> {value} </p></Link>
//                   </div>
//                 </a>
//               );
//             })}
//           </div>
//         )}
//       </div>

//     </div>


//   );
// }
// export default Searchbar3;