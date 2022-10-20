import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";

const basename = !!process.env.REACT_APP_DEPLOY_DIRECTORY
  ? process.env.REACT_APP_DEPLOY_DIRECTORY
  : null;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-kqv0piheu8yn8wbd.us.auth0.com"
      clientId="BUFQlrwA2u8Z7nJNwMLgPNUnzVOt2D6i"
      redirectUri={window.location.origin}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <Router basename={basename}>
        <App />
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
