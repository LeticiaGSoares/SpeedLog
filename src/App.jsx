import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./assets/pages/Protected/Protected";
import Dashboard from "./assets/pages/Dashboard/Dashboard";
import MessageDisplay from "./assets/components/Message/MessageDisplay.jsx";
import { MessageProvider } from "./assets/components/Message/MessageContext.jsx";

import { Login } from "./assets/routes/index.js";
import Navbar from "./assets/components/Navbar/Navbar";
import Config from "./assets/pages/Config/Config";
import ViewProfile from "./assets/pages/Config/pages/Profile/ViewProfile.jsx";

const App = () => {
  return (
    <MessageProvider>
      <BrowserRouter>
        <MessageDisplay />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/u"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/config"
            element={
              <>
                <Config />
                <Navbar />
              </>
            }
          />
          <Route
            path="/config/profile"
            element={
              <>
                <ViewProfile />
                <Navbar />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </MessageProvider>
  );
};

export default App;
