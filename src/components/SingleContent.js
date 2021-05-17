import styled from 'styled-components'
import Badge from '@material-ui/core/Badge'
import { img_300, unavailable } from './../config/index'
import ContentModal from './contentModal'
export default function SingleContent({
	id,
	poster,
	title,
	date,
	media_type,
	vote_average,
}) {
	return (
		<ContentModal media_type={media_type} id={id}>
			<ContentContainer>
				<Badge
					badgeContent={vote_average}
					color={vote_average > 6 ? 'primary' : 'secondary'}
				/>
				<ImagePoster
					src={poster ? `${img_300}/${poster}` : unavailable}
					alt={title}
				/>
				<Title title={title}>{title}</Title>
				<SubTitleContainer>
					<span>{media_type === 'tv' ? 'TV Series' : 'Movie'}</span>
					<span>{date}</span>
				</SubTitleContainer>
			</ContentContainer>
		</ContentModal>
	)
}

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 200px;
	padding: 5px;
	margin: 5px 0;
	background-color: #282c34;
	border-radius: 10px;
	position: relative;
	font-family: 'Montserrat', sans-serif;
	cursor: pointer;
	transition: all 0.2s ease-in-out;

	:hover {
		background-color: white;
		color: black;
		transform: scale(1.02);
	}
	@media (min-width: 1265px) {
		margin: 5px 5px;
	}

	@media (max-width: 480px) {
		width: 46%;
	}
`

const ImagePoster = styled.img`
	border-radius: 10px;
`

const Title = styled.b`
	width: 100%;
	text-align: center;
	font-size: 1.1rem;
	padding: 8px 0;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`

const SubTitleContainer = styled.span`
	display: flex;
	justify-content: space-between;
	padding: 0 2px 3px;
`
