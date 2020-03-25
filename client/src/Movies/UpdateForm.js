import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import Axios from 'axios';


const initialMovie = {
    title: "",
    director: "",
    metascore: null,
    stars: []
};

const UpdateForm = props => {
    // get the params and history objects
    const { id } = useParams();
    const { push } = useHistory();
    // set the movie to update
    const [movie, setMovie] = useState(initialMovie);

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        if(ev.target.name === 'stars'){
            value = value.split(",");
        }
        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    };

    // now find the right movie to load in here
    useEffect(() => {
        console.log(movie);
        console.log(props.movieList);
       const movieToUpdate = props.movieList.find(element => {
           return `${element.id}` === id;
        });
       if(movieToUpdate){
           setMovie(movieToUpdate);
       }
    }, [props.movieList, id]);

    const handleSubmit = ev => {
        ev.preventDefault();
        Axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            // setMovie(initialMovie);
            props.getMovieList();
            push(`/`);
        })
        .catch(err => console.log(err));
    }
    return (
        <div className="update-movie-form">
            <h3>Update Movie</h3>
        <form onSubmit={handleSubmit}>  
            <input name="title" type="text" value={movie.title} placeholder="title" onChange={changeHandler} />
            <input name="director" type="text" value={movie.director} placeholder="director" onChange={changeHandler} />
            <input name="metascore" type="number" value={movie.metascore} placeholder="metascore" onChange={changeHandler} />
            <input name="stars" type="text" value={movie.stars} placeholder="stars, separated by comma" onChange={changeHandler} />
            <button type="submit">update</button>
        </form>
        </div>
    )
}

export default UpdateForm;