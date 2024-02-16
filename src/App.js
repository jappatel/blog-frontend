import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import React,{useEffect,useState} from 'react';
import Home from './components/Home';
import Blog from './components/Blog';
import Footer from './components/Footer';
import WriteBlog from './components/WriteBlog';
import MyBlogs from './components/MyBlogs';
import Treeviewv from './components/Treeviewv';
import { fetchData } from './components/data';
import AllBlogs from './components/AllBlogs';
import Login from './user/Login';
import SignUP from './user/SignUp';
import Forgot from './user/Forgot';
import EditBlog from './components/EditBlog';
import Ai from './components/Ai';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await fetchData(); // Assuming fetchData returns the data
      setData(result);
    };

    fetchDataAsync();
  }, []);
  return (
    <Router >
      <Navbar />
      {/* {data ? <Navbar data={data} /> : <p>Loading...</p>} */}
      <Routes>
     
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/view" element={<Treeviewv />} />
        
        <Route path="/write" element={<WriteBlog />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/allblogs" element={<AllBlogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUP />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/editblog/:id" element={<EditBlog />} />
        <Route path="/ai" element={<Ai />} />
        
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
