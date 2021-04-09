import movies from "../movies";

const Pagination = ({ pages, setCurrentPage, currentMovies, sortedMovies }) => {


    const numOfPages = [];

    for (let i = 1; i <= pages; i++) {
        numOfPages.push(i);
    }

    return (
        <div className="clearfix">
            <div className="hint-text">Showing <b>{numOfPages.length}</b> out of <b>{movies.length}</b> entries</div>

            <button className="btn btn-primary m-2">Previous</button>

           <button className="btn btn-primary m-2">Next</button>

        </div>
    )
}

export default Pagination;
