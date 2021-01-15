import React from "react";
import { Image, Typography } from "antd";
import No_Results from "../Static/Images/No_Results.svg";
const { Title } = Typography;

function FetchedList({ FetchedJSON }) {
  let displayedCount = 0;

  return (
    <>
      <div className="MovieItemList">
        {FetchedJSON.data.titles !== undefined &&
        FetchedJSON.data.titles.length !== 0
          ? FetchedJSON.data.titles.map((element, index) => {
              displayedCount++;
              return (
                <div className="MovieItem" key={displayedCount}>
                  <Image height={300} width={200} src={element.image} />
                  <Title>{element.title}</Title>
                </div>
              );
            })
          : ""}

        {FetchedJSON.data.titles !== undefined &&
        FetchedJSON.data.titles.length === 0 ? (
          <div className="MovieItem" key={displayedCount}>
            <Image preview={false} width={200} src={No_Results} />
            <Title>Nothing found, Sorry</Title>
            {/* {console.log("fetchedJSON =", FetchedJSON)} */}
          </div>
        ) : (
          ""
        )}

        {FetchedJSON.data.titles === undefined &&
        !Array.isArray(FetchedJSON.data) ? (
          <>
            {/* {console.log("bitch offline JSON =", FetchedJSON.data)} */}
            <Title>Heh! you can't afford me offline!</Title>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default FetchedList;
