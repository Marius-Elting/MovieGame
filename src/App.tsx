import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Start from './pages/start/Start'
import Navbar from './components/Navbar/Navbar'
import Quiz from './pages/quiz/Quiz'

function App() {

    return (
        <>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path="/start" index element={<Start></Start>}></Route>
                    <Route path="/quiz" index element={<Quiz></Quiz>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
