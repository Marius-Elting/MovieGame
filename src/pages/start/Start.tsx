import { useRef, useState } from 'react'
import "./Start.scss"
import axios from 'axios'

interface IMovie {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}

const Start = () => {
    const search_ref = useRef<HTMLInputElement>(null)
    const [movies, setMovies] = useState<Array<IMovie>>([])

    const searchMovie = async ()=> {
        if(!search_ref.current?.value) return
        const response: {data: {Search: Array<IMovie>}} = await axios.get(`http://www.omdbapi.com/?s=${search_ref.current?.value}&range=100&apikey=3e1791d`)
        console.log(response)
        setMovies(response.data.Search)
    }
  return (
        <>
            <div className='search_input_container'>
                <input className='search_input' placeholder='Film Name' ref={search_ref}></input>
                <button className="search_button" onClick={searchMovie}>Search</button>
            </div>
            <section className='movie_search_output'>
                {movies.map((movie: IMovie, i: number)=> (
                    <div key={i}>
                        <img src={movie.Poster} alt={`Movie poster ${movie.Title}`}></img>
                        <span><p>Title: </p><p>{movie.Title}</p></span>
                        <span><p>Release Year: </p><p>{movie.Year}</p></span>
                        <span><p>Type: </p><p>{movie.Type}</p></span>
                    </div>
                ))}
            </section>
        </>
    )
}

export default Start