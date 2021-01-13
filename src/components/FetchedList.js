import React from "react";
import { Image, Typography } from "antd";
const { Title } = Typography;

function FetchedList({ FetchedJSON }) {
  let displayedCount = 0;

  return (
    <>
      <div className="MovieItemList">
        {FetchedJSON.data.titles.map((element, index) => {
          displayedCount++;
          return (
            <div className="MovieItem" key={displayedCount}>
              <Image height={300} width={200} src={element.image} />
              <Title>{element.title}</Title>
            </div>
          );
        })}

        {console.log("Fetched JSON =", FetchedJSON.data.titles[0].title)}
      </div>
    </>
  );
}

export default FetchedList;
