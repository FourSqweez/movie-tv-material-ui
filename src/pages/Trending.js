import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import CustomPagination from '../components/CustomPagination'
import SingleContent from '../components/SingleContent'
import { ContentContainer } from '../components/utils/ContentContainer'

export default function Trending() {
	const [contents, setContents] = useState([])
	const [page, setPage] = useState(1)

	const fetchTrending = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&page=${page}`
		)
		setContents(data.results)
	}
	useEffect(() => {
		fetchTrending()
		// eslint-disable-next-line
	}, [page])

	return (
		<div>
			<span className="page-title">trending</span>
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
			<CustomPagination setPage={setPage} />
		</div>
	)
}
