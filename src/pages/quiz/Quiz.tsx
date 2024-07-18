import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
// @ts-expect-error TODO check later
import {famousFilms} from "./movies.ts"

interface IMovie {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}

const Quiz = () => {
    const search_ref = useRef<HTMLInputElement>(null)
    const [movies, setMovies] = useState<Array<IMovie>>([])
    const [hints, setHints] = useState<Array<string>>([])
    const [rightMovie, setRightMovie] = useState()
    const [currentHints, setCurrentHints] = useState<Array<string>>([])

    const getRandomMovies = ()=> {
        const randomMovies = []
        for(let i = 0; i < 3; i++){
            randomMovies.push(famousFilms[i])
        }
        return randomMovies
    }
    useEffect(()=> {
        const randomMovies = getRandomMovies();
        setMovies(randomMovies);
        (async()=> {
            const response = await axios.get(`http://www.omdbapi.com/?t=${randomMovies[0]}&plot=full&apikey=3e1791d`)
            const movie = response.data
            const hint = ["Actors: "+movie.Actors, "Director: "+movie.Director, "Plot: "+movie.Plot ]
            setCurrentHints(hint.slice(0,1))
            setRightMovie(movie)
            setHints(hint)
        })();
    }, [])
    // TODO add logic for adding new hint, adding check logic add output of the choices
  return (
        <>
            <div>
                <div className='hints'>
                    {currentHints.map((hint: string)=>(
                        <p>{hint}</p>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Quiz