import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import GlobalStyle from './components/common/GlobalStyle';
import HomePage from './pages/Home';
import { useEffect } from 'react';
import Todo from './pages/Todo';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');

    // 로컬 스토리지에 토큰이 있는지 확인하여 리다이렉트 처리
    if (token && (window.location.pathname === '/signin' || window.location.pathname === '/signup')) {
      window.location.href = '/todo';
    } else if (!token && window.location.pathname === '/todo') {
      window.location.href = '/signin';
    }
  })

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
