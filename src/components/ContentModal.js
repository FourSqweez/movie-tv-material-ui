import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { img_500, unavailable, unavailableLandscape } from '../config'
import YouTubeIcon from '@material-ui/icons/YouTube'
import { Button } from '@material-ui/core'
import Carousel from './Carousel'

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		width: '90%',
		height: '80%',
		backgroundColor: '#39445a',
		border: '1px solid #282c34',
		borderRadius: 10,
		color: 'white',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(1, 1, 3),
		marginTop: '20px',
	},
}))

export default function ContentModal({ children, media_type, id }) {
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const [content, setContent] = useState()
	const [video, setVideo] = useState()

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const fetchData = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US`
		)

		setContent(data)
	}

	const fetchVideo = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US`
		)

		setVideo(data.results[0]?.key)
	}

	useEffect(() => {
		fetchData()
		fetchVideo()
	}, [])

	return (
		<div>
			<div onClick={handleOpen}>{children}</div>

			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					{content && (
						<div className={classes.paper}>
							<ModalContainer>
								<ModalImagePortrait
									src={
										content.poster_path
											? `${img_500}/${content.poster_path}`
											: unavailable
									}
									alt={content.name || content.title}
								/>

								<ModalImageLandscape
									src={
										content.backdrop_path
											? `${img_500}/${content.backdrop_path}`
											: unavailableLandscape
									}
									alt={content.name || content.title}
								/>

								<ModalAboutContainer>
									<AboutTitle>
										{content.name || content.title} (
										{(
											content.first_air_date ||
											content.release_date ||
											'-----'
										).substring(0, 4)}
										)
									</AboutTitle>
									<AboutTagline>
										{content.tagline && content.tagline}
									</AboutTagline>
									<Description>{content.overview}</Description>

									<div>
										<Carousel media_type={media_type} id={id} />
									</div>

									<Button
										variant="contained"
										startIcon={<YouTubeIcon />}
										color="secondary"
										target="__blank"
										href={`https://www.youtube.com/watch?v=${video}`}
									>
										Watch the Trailer
									</Button>
								</ModalAboutContainer>
							</ModalContainer>
						</div>
					)}
				</Fade>
			</Modal>
		</div>
	)
}

const ModalImagePortrait = styled.img`
	display: none;
	object-fit: contain;
	border-radius: 10px;
`

const ModalImageLandscape = styled.img`
	object-fit: contain;
	border-radius: 10px;
`

const ModalAboutContainer = styled.div`
	padding: 10px;
	width: 95%;
	height: 90%;
	display: flex;
	flex-direction: column;
	font-family: 'Roboto', sans-serif;
	justify-content: space-evenly;
	font-weight: 300;
`

const AboutTitle = styled.span`
	height: 12%;
	font-size: 5vw;
	display: flex;
	align-items: center;
	justify-content: center;
`

const AboutTagline = styled.i`
	padding-bottom: 10px;
	align-self: center;
`

const Description = styled.span`
	text-indent: 30px;
	display: flex;
	height: 40%;
	overflow-y: scroll;
	padding: 15px;
	border-radius: 20px;
	scrollbar-width: thin; /* Firefox */
	box-shadow: inset 0 0 5px #000000;
	text-align: justify;
	::-webkit-scrollbar {
		display: none;
	}
`

const ModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	width: 100%;
	overflow-y: scroll;
	scrollbar-width: none;
	::-webkit-scrollbar {
		display: none;
	}
	@media (min-width: 835px) {
		flex-direction: row;
		justify-content: space-around;
		padding: 10px 0;
		align-items: center;
		${ModalImagePortrait} {
			display: flex;
			width: 38%;
			border-radius: 10px;
			max-width: 350px;
			margin-top: 20px;
		}
		${ModalImageLandscape} {
			display: none;
		}
		${ModalAboutContainer} {
			width: 58%;
			padding: 0;
			height: 100%;
		}
		${AboutTitle} {
			font-size: 3vw;
		}
		${Description} {
			font-size: 1.3rem;
		}
	}
`
