import './App.css'
import Authentication from './components/Authentication.jsx'
import SearchTrack from './components/SearchTrack.jsx'
import {Routes, Route } from "react-router-dom";
import CreateTrack from './components/CreateTrack.jsx'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Authentication/>} />
        <Route path='searchtrack' element={<SearchTrack/>} />
        <Route path='createtrack' element={<CreateTrack/>} />
      </Routes>
  )
}

export default App
