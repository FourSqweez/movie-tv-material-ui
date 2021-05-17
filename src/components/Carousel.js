import axios from 'axios'
import { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import styled from 'styled-components'
import { img_300, noPicture } from './../config/index'

const handleDragStart = (e) => e.preventDefault()

const Carousel = ({ media_type, id }) => {
	const [credits, setCredits] = useState([])

	const items = credits.map((c) => (
		<CarouselItemContainer>
			<CarouselItemImg
				src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
				alt={c?.name}
				onDragStart={handleDragStart}
			/>
			<CarouselItemTxt>{c?.name}</CarouselItemTxt>
		</CarouselItemContainer>
	))

	const responsive = {
		0: {
			items: 3,
		},
		512: {
			items: 5,
		},
		1024: {
			items: 7,
		},
	}

	const fetchCredits = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US`
		)
		setCredits(data.cast)
	}

	useEffect(() => {
		fetchCredits()
		// eslint-disable-next-line
	}, [])

	return (
		<AliceCarousel
			mouseTracking
			infinite
			disableDotsControls
			disableButtonsControls
			responsive={responsive}
			items={items}
			autoPlay
		/>
	)
}

export default Carousel

const CarouselItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	object-fit: contain;
	padding: 10px;
`

const CarouselItemImg = styled.img`
	border-radius: 10px;
	margin-bottom: 5px;
	box-shadow: 0px 0px 5px black;
`

const CarouselItemTxt = styled.b``
