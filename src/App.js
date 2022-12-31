import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
// import Signup from "./components/auth/Signup"
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Clients from "./scenes/clients";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar";
import PrivateRoutes from "./PrivateRoutes";
import ClientDetailsPage from "./scenes/clientDetails";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function App() {
  const [user, loading, error] = useAuthState(auth);

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  // for hiding sidebar
  const [currPath, setCurrPath] = useState(window.location.pathname);

  // also for hiding the sidebar/topbar
  // set the current path
  useEffect(() => {
    setCurrPath(window.location.pathname);
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* IF THE USER IS IN THE LOGIN PAGE
              DO NOT SHOW THE SIDEBAR OR THE TOPBAR*/}
          {currPath !== "/login" && (
            <>
              {" "}
              <Sidebar isSidebar={isSidebar} />
            </>
          )}

          <main className="content">
            {currPath !== "/login" && (
              <>
                {" "}
                <Topbar setIsSidebar={setIsSidebar} />
              </>
            )}

            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/clients/:id" element={<ClientDetailsPage />} />
                <Route path="/dashboard" element={<Dashboard />} exact />
                <Route path="/team" element={<Team />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Route>
              <Route path="/" element={<Login />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
