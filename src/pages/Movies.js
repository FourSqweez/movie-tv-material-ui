import axios from 'axios'
import { useEffect, useState } from 'react'
import CustomPagination from '../components/CustomPagination'
import { ContentContainer } from '../components/utils/ContentContainer'
import SingleContent from './../components/SingleContent'
import Genres from './../components/Genres'
import useGenre from '../hooks/useGenre'

export default function Movies() {
	const [page, setPage] = useState(1)
	const [contents, setContents] = useState([])
	const [numOfPages, setNumOfPages] = useState()
	const [selectedGenres, setSelectedGenres] = useState([])
	const [genres, setGenres] = useState([])
	const genreForURL = useGenre(selectedGenres)

	const fetchMovies = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
		)
		setContents(data.results)
		setNumOfPages(data.total_pages)
	}

	useEffect(() => {
		fetchMovies()
	}, [page, genreForURL])

	return (
		<div>
			<span className="page-title">Movies</span>
			<Genres
				type="movie"
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
							media_type={c.media_type}
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
