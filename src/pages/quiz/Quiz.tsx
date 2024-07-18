import { useEffect,  useState } from 'react'
import axios from 'axios'
// @ts-expect-error TODO check later
import {famousFilms} from "./movies.ts"
import "./Quiz.scss"

interface IMovie {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}

const Quiz = () => {
    const [movies, setMovies] = useState<Array<string>>([])
    const [hints, setHints] = useState<Array<string>>([])
    const [rightMovie, setRightMovie] = useState<IMovie>()
    const [currentHints, setCurrentHints] = useState<Array<string>>([])
    const [winner, setWinner] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [wrongs, setWrongs] = useState<Array<string>>([])

    const getRandomMovies = ()=> {
        const randomMovies = []
        for(let i = 0; i < 3; i++){
            const randomIndex =  Math.floor(Math.random() * 700);
            randomMovies.push(famousFilms[randomIndex])
        }
        return randomMovies
    }
    function shuffleMovies(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }
    

    const loadMovies = ()=>{
        const randomMovies = getRandomMovies();
        setMovies(randomMovies);
        (async()=> {
            const response = await axios.get(`http://www.omdbapi.com/?t=${randomMovies[0]}&plot=full&apikey=3e1791d`)
            const movie = response.data
            const hint = ["Actors: \n "+movie.Actors, "Director: \n"+movie.Director, "Plot: \n"+movie.Plot]
            setMovies(prev => shuffleMovies([movie.Title, ...prev.slice(1,3)]))
            setCurrentHints(hint.slice(0,1))
            setRightMovie(movie)
            setHints(hint)
        })();
    }
    useEffect(()=> {
        loadMovies()
    }, [])

    const revealNewHint = ()=> {
        const currentHintCount = currentHints.length
        if(currentHintCount == 3) return
        setCurrentHints(hints.slice(0,currentHintCount+1))
    }

    const clickMovie = (clickedMovie: string)=> {
        console.log({clickedMovie})
        console.log(rightMovie)
        if(clickedMovie == rightMovie?.Title){
            setMessage("That was right")
            setWrongs(movies)
            setWinner(clickedMovie)
        }else{
            setWrongs(prev => [...prev, clickedMovie])
            setMessage("That was wrong, try again")
        }
    }

    const newGame = ()=> {
        setHints([])
        setCurrentHints([])
        setWinner("")
        setMessage("")
        loadMovies()
    }
  return (
        <>
            <div className='playground'>
                <h5>Try to guess the Movie based on the hints</h5>
                <div className='hints'>
                    <button disabled={currentHints.length === 3} onClick={revealNewHint}>New Hint ({currentHints.length}/3)</button>
                    <div className='hints'>
                        {currentHints.map((hint: string)=>(
                            <p>{hint}</p>
                        ))}
                    </div>
                </div>
                <div className='answers'>
                        {movies.map((movie, i)=>(
                            <button disabled={wrongs.includes(movie)} className={winner == movie ? "winner" : ""} key={i} onClick={()=>clickMovie(movie)}>{movie}</button>
                        ))}
                </div>
            </div>
            <div className='results'>
                <div className='restult'>
                        <p>{message}</p>
                </div>
                <div>
                    {winner !== "" &&  <button onClick={newGame} className='newGame'>New Game</button>}
                </div>
            </div>
        </>
    )
}

export default Quiz