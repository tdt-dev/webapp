import Axios from "axios";
import {MovieId} from "../reducers/movies";
import {ShowId} from "../reducers/shows";

const instance = Axios.create({
    baseURL: '/api/v1/',
    timeout: 10000
});

const AUTH_HEADER_NAME = "Authorization";
const CAPTCHA_HEADER_NAME = "g-recaptcha-response";

export function fetchNowPlayingMovies(page = 1) {
    return instance.get(`/Movies/Playing?page=${page}`)
        .then((res) => res.data);
}

export function fetchLatestRatedMovies(page = 1) {
    return instance.get(`/Movies/Rated?page=${page}`)
        .then((res) => res.data);
}

export function fetchHighestRatedMovies(page = 1) {
    return instance.get(`/Movies/HighestRated?page=${page}`)
        .then((res) => res.data);
}

export function fetchLowestRatedMovies(page = 1) {
    return instance.get(`/Movies/LowestRated?page=${page}`)
        .then((res) => res.data);
}

export function fetchNowPlayingShows(page = 1) {
    return instance.get(`/Shows/Playing?page=${page}`)
        .then((res) => res.data);
}

export function fetchLatestRatedShows(page = 1) {
    return instance.get(`/Shows/Rated?page=${page}`)
        .then((res) => res.data);
}

export function fetchHighestRatedShows(page = 1) {
    return instance.get(`/Shows/HighestRated?page=${page}`)
        .then((res) => res.data)
}

export function fetchLowestRatedShows(page = 1) {
    return instance.get(`/Shows/LowestRated?page=${page}`)
        .then((res) => res.data)
}

export function fetchNews() {
    return instance.get('/News/')
        .then((res) => res.data)
}

export function fetchMovieDetails(id: MovieId) {
    return instance.get(`/Movies/${id}/`)
        .then((res) => res.data)
}

export function fetchShowDetails(id: ShowId) {
    return instance.get(`/Shows/${id}/`)
        .then((res) => res.data)
}

export function fetchSearchResults(query: string, page = 1) {
    return instance.get(`/Search/${query}?page=${page}`)
        .then((res) => res.data)
}

export function facebookLogin(facebookToken: string, name: string, email: string, userId: string) {
    return instance.post(`/Users/Login/Facebook`, {
        facebookToken,
        name,
        email,
        userId
    }).then((res) => res.data)
}

export function googleLogin(googleToken: string, name: string) {
    return instance.post(`/Users/Login/Google`, {
        googleToken,
        name
    }).then((res) => res.data)
}

export function fetchQuestions(jwtToken: string) {
    return instance.get(`/Questions/`, {
        headers: {[AUTH_HEADER_NAME]: jwtToken}
    }).then((res) => res.status === 200 ? res.data : [])
}

export function fetchMovieAnswers(jwtToken: string, id: MovieId) {
    return instance.get(`/Answers/movie/${id}`, {
        headers: {[AUTH_HEADER_NAME]: jwtToken}
    }).then((res) => res.status === 200 ? res.data : [])
}

export function fetchShowAnswers(jwtToken: string, id: ShowId) {
    return instance.get(`/Answers/show/${id}`, {
        headers: {[AUTH_HEADER_NAME]: jwtToken}
    }).then((res) => res.status === 200 ? res.data : [])
}

export function fetchUsersRatingForMovie(jwtToken: string, id: MovieId) {
    return instance.get(`/Answers/Movie/${id}/ratings/currentUser`, {
        headers: {[AUTH_HEADER_NAME]: jwtToken}
    }).then((res) => res.data)
}

export function fetchUsersRatingForShow(jwtToken: string, id: ShowId) {
    return instance.get(`/Answers/Show/${id}/ratings/currentUser`, {
        headers: {[AUTH_HEADER_NAME]: jwtToken}
    }).then((res) => res.data)
}

export function fetchAllRatingsForMovie(jwtToken: string, id: MovieId) {
    return instance.get(`/Answers/Movie/${id}/ratings`, {
        headers: {[AUTH_HEADER_NAME]: jwtToken}
    }).then((res) => res.data);
}

export function fetchAllRatingsForShow(id: ShowId) {
    return instance.get(`/Answers/Show/${id}/ratings`)
            .then((res) => res.data)
}

export function sendMovieAnswer(
    jwtToken: string,
    captchaToken: string,
    movieId: MovieId,
    questionId: string,
    answer: number
) {
    return instance.post(`/Answers/movie`, {
        questionId,
        movieId,
        answer
    }, {
        headers: {
            [AUTH_HEADER_NAME]: jwtToken,
            [CAPTCHA_HEADER_NAME]: captchaToken
        }
    });
}

export function deleteShowReview(jwtToken: string, showId: ShowId) {
    return instance.delete('/Answers/show/' + showId + '/review', {
        headers: {
            [AUTH_HEADER_NAME]: jwtToken
        }
    });
}

export function sendMovieReview(jwtToken: string, captchaToken: string, movieId: MovieId, review: string) {
    return instance.post(`/Answers/movie/review`, {
        movieId,
        review
    }, {
        headers: {
            [AUTH_HEADER_NAME]: jwtToken,
            [CAPTCHA_HEADER_NAME]: captchaToken
        }
    });
}

export function deleteMovieReview(jwtToken: string, movieId: MovieId) {
    return instance.delete('/Answers/movie/' + movieId + '/review', {
        headers: {
            [AUTH_HEADER_NAME]: jwtToken
        }
    });
}

export function sendShowAnswer(jwtToken: string, captchaToken: string, showId: ShowId, questionId: string, answer: number) {
    return instance.post(`/Answers/show`, {
        questionId,
        showId,
        answer
    }, {
        headers: {
            [AUTH_HEADER_NAME]: jwtToken,
            [CAPTCHA_HEADER_NAME]: captchaToken
        }
    });
}

export function sendShowReview(jwtToken: string, captchaToken: string, showId: ShowId, review: string) {
    return instance.post(`/Answers/show/review`, {
        showId,
        review
    }, {
        headers: {
            [AUTH_HEADER_NAME]: jwtToken,
            [CAPTCHA_HEADER_NAME]: captchaToken
        }
    });
}

export function sendContactUsForm(captchaToken: string, firstName: string, lastName: string, email: string, message: string) {
    return instance.post(`/ContactUs`, {
        first_name: firstName,
        last_name: lastName,
        email,
        message
    },{
        headers: {
            [CAPTCHA_HEADER_NAME]: captchaToken
        }
    });
}

export function sendSubscriptionForm(captchaToken: string, email: string) {
    return instance.post(`/Subscribe`, {
        email
    }, {
        headers: {
            [CAPTCHA_HEADER_NAME]: captchaToken
        }
    });
}