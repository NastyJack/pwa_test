import "./App.css";
import "antd/dist/antd.css";
import { Button, Typography } from "antd";
import { SearchOutlined, HomeFilled } from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Search from "./pages/Search";

const { Title } = Typography;

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul className="MenuBar">
              <li>
                <Link to="/">
                  <Button
                    style={{ zIndex: 1 }}
                    size="large"
                    type="primary"
                    shape="circle"
                    icon={<HomeFilled />}
                  />
                </Link>
              </li>
              <li>
                <Link to="/search">
                  <Button
                    style={{ zIndex: 1 }}
                    size="large"
                    type="primary"
                    shape="circle"
                    icon={<SearchOutlined />}
                  />
                </Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Title
                style={{
                  position: "relative",
                  top: "200px",
                  fontSize: "50px",
                  color: "lightgrey",
                }}
              >
                IMDb DB 🎬
              </Title>
            </Route>
            <Route path="/search">
              <Search />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
