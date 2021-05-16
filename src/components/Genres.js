import { Chip } from '@material-ui/core'
import axios from 'axios'
import { useEffect } from 'react'
import { ChipContainer } from './utils/ContentContainer'

export default function Genres({
	selectedGenres,
	setSelectedGenres,
	genres,
	setGenres,
	type,
	setPage,
}) {
	const handleAdd = (genre) => {
		setSelectedGenres([...selectedGenres, genre])
		setGenres(genres.filter((g) => g.id !== genre.id))
		setPage(1)
	}
	const handleRemove = (genre) => {
		setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id))
		setGenres([...genres, genre])
		setPage(1)
	}
	
	const fetchGenres = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US`
		)
		setGenres(data.genres)
	}
	console.log('genres', genres)

	useEffect(() => {
		fetchGenres()

		return () => {
			setGenres({})
		}
		// eslint-disable-next-line
	}, [])

	return (
		<ChipContainer>
			{selectedGenres &&
				selectedGenres.map((genre) => (
					<Chip
						key={genre.id}
						label={genre.name}
						clickable
						size="small"
						color="primary"
						onDelete={() => handleRemove(genre)}
					/>
				))}

			{genres &&
				genres.map((genre) => (
					<Chip key={genre.id} label={genre.name} clickable size="small" 
					onClick={() => handleAdd(genre)}/>
				))}
		</ChipContainer>
	)
}
