import React, { useEffect, useState } from 'react';
import axios from '../axios';
import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/original/';
function Row({ title, fetchURL, isLargeRow }) {
	const [movies, setMovies] = useState([]);

	//code runs based on a specific condition
	useEffect(() => {
		//if [], run once when the row loads, and don't run it again
		async function fetchData() {
			const request = await axios.get(fetchURL);
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchURL]);

	return (
		<div className="row">
			{/* title */}
			<h2>{title}</h2>

			<div className="row__posters">
				{movies.map((movie) => (
					<img
						key={movie.id}
						className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
						src={`${base_url}${
							isLargeRow ? movie.poster_path : movie.backdrop_path
						}`}
						alt={movie.name}
					/>
				))}
			</div>
			{/* container => posters */}
		</div>
	);
}

export default Row;
