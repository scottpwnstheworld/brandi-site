import logo from "./logo.svg";
import "./App.css";

import { Layout, Home, Admin, PersonPage } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Browse } from "./pages/Browse";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DoePage } from "./pages/DoePage";

export const SERVER_ADDR = "192.168.0.171";

function App() {
  const queryClient = new QueryClient();
  // const fetchUserData = () => {
  //   fetch("localhost")
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(data => {
  //       setUsers(data)
  //     })
  // }
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="admin" element={<Admin />} />
            <Route path="browse">
              <Route index element={<Browse />} />
              <Route path="missing">
                <Route path=":id" element={<PersonPage />} />
              </Route>
              <Route path="unidentified">
                <Route path=":id" element={<DoePage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
