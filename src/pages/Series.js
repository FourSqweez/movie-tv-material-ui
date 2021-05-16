
import Genres from './../components/Genres';
import { ContentContainer } from './../components/utils/ContentContainer';
import SingleContent from './../components/SingleContent';
import CustomPagination from './../components/CustomPagination';
import { useState, useEffect } from 'react';
import useGenre from './../hooks/useGenre';
import axios from 'axios';

export default function Series() {
    const [page, setPage] = useState(1)
	const [contents, setContents] = useState([])
	const [numOfPages, setNumOfPages] = useState()
	const [selectedGenres, setSelectedGenres] = useState([])
	const [genres, setGenres] = useState([])
	const genreForURL = useGenre(selectedGenres)

    const fetchSeries = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
		)
		setContents(data.results)
        console.log("test", data.results);
		setNumOfPages(data.total_pages)
	}

	useEffect(() => {
		fetchSeries()
	}, [page, genreForURL])

    return (
        <div>
			<span className="page-title">TV Series</span>
			<Genres
				type="tv"
				selectedGenres={selectedGenres}
				setSelectedGenres={setSelectedGenres}
				genres={genres}
				setGenres={setGenres}
				setPage={setPage}
			/>
			<ContentContainer>
				{contents &&
					contents.map((c) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							media_type="tv"
							vote_average={c.vote_average || '7.5'}
						/>
					))}
			</ContentContainer>
			{numOfPages > 1 && (
				<CustomPagination setPage={setPage} numOfPages={numOfPages} />
			)}
		</div>
    )
}
