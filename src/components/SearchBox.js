import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function SearchBox({ parentCallback }) {
  return (
    <div>
      <Input
        placeholder="Enter movie name"
        prefix={<SearchOutlined />}
        allowClear={true}
        style={{ width: 220, backgroundColor: "transparent" }}
        onChange={(e) => parentCallback(e.target.value)}
      />
    </div>
  );
}

export default SearchBox;
