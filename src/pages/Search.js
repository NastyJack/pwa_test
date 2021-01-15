import React, { useState, useEffect } from "react";
import FetchedList from "../components/FetchedList";
import SearchBox from "../components/SearchBox";
import SpinnerLoader from "../Static/Images/SpinnerLoader.svg";
import "../pages/CSS/Search.css";
import { Image } from "antd";

var axios = require("axios").default;

function Search() {
  const [SearchTerm, setSearchTerm] = useState(0);
  const [UpdateResults, setUpdateResults] = useState(0);
  const [Loader, setLoader] = useState(0);

  function GetValueFromChild(data) {
    setSearchTerm(data);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (SearchTerm !== "" && SearchTerm !== 0) {
        //  console.log("Searching... ", SearchTerm);
        setLoader(true);
        fetchIMDb(SearchTerm, setUpdateResults, setLoader);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [SearchTerm]);

  return (
    <>
      <SearchBox parentCallback={GetValueFromChild} />

      {Loader ? (
        <>
          <div className="darkenBG"></div>
          <Image
            className="SpinnerLoader"
            style={{ zIndex: 1 }}
            preview={false}
            width={50}
            src={SpinnerLoader}
          />
        </>
      ) : (
        ""
      )}
      {UpdateResults ? <FetchedList FetchedJSON={UpdateResults} /> : ""}
    </>
  );
}

function fetchIMDb(SearchTerm, setUpdateResults, setLoader) {
  axios
    .request({
      method: "GET",
      url: `${process.env.REACT_APP_IMDB_API_URL}${SearchTerm}`,
      // params: { s: movieTitle, page: "1", y: year, r: "json" },
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_HOST,
      },
    })
    .then(function (response) {
      setUpdateResults(response);
      setLoader(false);

      //   console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

export default Search;
