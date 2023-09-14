import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import {SocketProvider} from "./providers/Socket";
import '../src/App.css'

function App() {
  return (
    <div>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </SocketProvider>
    </div>
  );
}

export default App;
