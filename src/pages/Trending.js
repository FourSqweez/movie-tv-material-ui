import { Container } from '@material-ui/core'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import SingleContent from '../components/SingleContent'

export default function Trending() {
	const [contents, setContents] = useState([])

	const fetchTrending = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIES_API_KEY}`
		)
		console.log('data', data)

		setContents(data.results)
	}

	useEffect(() => {
		fetchTrending()
	}, [])

	return (
		<Container>
			<span className="page-title">trending</span>
			<TrendingContainer>
				{contents &&
					contents.map((c) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							media_type={c.media_type}
							vote_average={c.vote_average}
						/>
					))}
			</TrendingContainer>
		</Container>
	)
}

const TrendingContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
`
