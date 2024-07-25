import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "./App.css";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signin from "./pages/Signin";
import User from "./pages/User";

function App() {
    return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<Error />} />
        </Routes>
      <Footer />
    </Router>
    );
  }
  
  export default App;