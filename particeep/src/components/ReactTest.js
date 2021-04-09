import { useState, useEffect } from 'react';
import MoviesData from './../movies';
import Pagination from './Pagination'



function ReactTest() {

    const [movies, setMovies] = useState([]);

    const [currentPage] = useState(1);
    const [moviesPerPage] = useState(2);


    const pages = [];

    for (let i = 1; i <= Math.ceil(movies.length / moviesPerPage); i++) {
        pages.push(i);
    }

    const renderPageNumbers = pages.map(number => {
        return (
            <li key={number} id={number}>
                {number}
            </li>
        )
    })


    const indexOfLastMovie = currentPage + 10;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    console.log("indexOfFirstMovie", indexOfFirstMovie)

    useEffect(() => {
        setMovies(MoviesData)
        console.log(movies)

    }, [movies])



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
                if(buttonState === "like") {
                    document.getElementById("button" + movieId).innerHTML = "dislike"
                }
                if(buttonState === "dislike") {
                    document.getElementById("button" + movieId).innerHTML = "like"
                }
            }
        })
    }


    return (
        <>
            <div className="row">
                <div className="col-12 text-center mb-1 mt-1"><h1>Movies</h1></div>
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
                    movies.map((movie, index) => (
                        <div className="mb-5 col-xs-12 col-sm-6 col-md-4" key={index}>
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
            <ul className="pageNumbers">
                {renderPageNumbers}
            </ul>

            <Pagination />

        </>
    )
}

export default ReactTest
