import { useState, useEffect } from 'react';
import MoviesData from './../movies';
import Pagination from './Pagination'
import Header from './Header'




function ReactTest() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [moviesPerPage] = useState(4)

    useEffect(() => {
        setLoading(true)
        setMovies(MoviesData)
        setLoading(false)
    }, [movies])

    console.log("MoviesData", MoviesData)

    const likeStyle = {
        marginRight: "5px"
    }

    const deleteMovie = (index) => {
        let newMovies = movies
        newMovies.splice(index, 1)
        setMovies([...newMovies])
    }

    const toggler = (movieId) => {
        var buttonState = document.getElementById("button" + movieId).innerHTML
        movies.forEach(function (movie) {
            if (movie.id === movieId) {
                if (buttonState === "like") {
                    document.getElementById("button" + movieId).innerHTML = "dislike"
                }
                if (buttonState === "dislike") {
                    document.getElementById("button" + movieId).innerHTML = "like"
                }
            }
        })
    }

    if (loading && movies.length === 0) {
        return <h2>Loading Movies...</h2>
    }

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovie = movies.slice(indexOfFirstMovie, indexOfLastMovie)
    const howManyPages = Math.ceil(movies.length / moviesPerPage)

    return (
        <>

            <Header />
            <div className="App">
                <ul>

                    <div className="row">                        
                        <div className="col-12 text-center mb-1 mt-1">
                            <div className="input-group mb-3">
                                <select className="custom-select" onChange={() => {

                                }} >
                                    {movies.map((movie, index) => (
                                        <option key={index} value={movies.id}>
                                            {movie.category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>
                        {
                            currentMovie.map((movie, index) => (
                                <div className="mb-5 col-xs-12 col-sm-12 col-md-6" key={index}>
                                    <div className="card">
                                        <h3 className="card-header"><strong>{movie.id} {movie.title}</strong></h3>

                                        <div className="card-body">
                                            <h5 className="card-title">{movie.category}</h5>
                                            <button id={"button" + movie.id} className="btn btn-success" onClick={() => { toggler(movie.id) }} style={likeStyle}>
                                                like
                                    </button>
                                            <button className="btn btn-danger" onClick={() => deleteMovie(index)} style={likeStyle}>Delete</button>
                                            <div>Likes : {movie.likes}</div>
                                            <div>Dislikes : {movie.dislikes}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                            )
                        }
                    </div>
                </ul>
            </div>
            <Pagination setCurrentPage={setCurrentPage} />


        </>
    )
}

export default ReactTest
