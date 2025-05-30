import axios from "axios"

const baseUrl = import.meta.env.VITE_REACT_APP_BASEURL;
const apiKey = import.meta.env.VITE_REACT_APP_APIKEY;


export const getMovieList = async () => {
    const movie = await axios.get(
        `${baseUrl}/movie/popular?page=1&api_key=${apiKey}`
    )
    return movie.data.results
    
}

export const searchMovie = async(q) => {
    const search = await axios.get(
        `${baseUrl}/search/movie?query=${q}&page=1&api_key=${apiKey}`
    )
    return search.data
}