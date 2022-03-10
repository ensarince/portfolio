import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home'
import About from './components/About'
import Post from './components/Post'
import SinglePost from './components/SinglePost'
import Project from './components/Project'
import Navbar from './components/Navbar';
import Photos from './components/Photos';


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/post/:slug' element={<SinglePost />} />
        <Route path='/post' element={<Post />} />
        <Route path='/photos' element={<Photos />} />
        <Route path='/project' element={<Project />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
