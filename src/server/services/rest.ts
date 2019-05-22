import Axios from "axios";
import {MovieId} from "../../client/reducers/movies";
import {ShowId} from "../../client/reducers/shows";

const instance = Axios.create({
    baseURL: `http://apiapp:3000/v1/`,
    timeout: 5000
});

export function fetchMovieDetails(hostname: string, id: MovieId) {
    return instance.get(`/Movies/${id}/`)
        .then((res) => res.data)
}

export function fetchShowDetails(hostname: string, id: ShowId) {
    return instance.get(`/Shows/${id}/`)
        .then((res) => res.data)
}
