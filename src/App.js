import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import GlobalStyle from './components/common/GlobalStyle';
import HomePage from './pages/Home';
import { useEffect } from 'react';
import Todo from './pages/Todo';

function App() {


  return (
    <>
      <GlobalStyle />
      <Router >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
