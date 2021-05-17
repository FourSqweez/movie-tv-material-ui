import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
export default function Header() {
	const history = useHistory()
	return (
		<HeaderContainer>
			<span
				onClick={() => {
					window.scroll(0, 0)
					history.push('/')
				}}
			>
				🎬 Entertainment hub 🎥
			</span>
		</HeaderContainer>
	)
}

const HeaderContainer = styled.div`
	width: 100%;
	height: 70px;
	position: fixed;
	display: flex;
	background-color: #39445a;
	box-shadow: 0px 1px 5px black;
	z-index: 100;
	justify-content: center;

	span {
		color: white;
		text-transform: uppercase;
		cursor: pointer;
		font-size: 3rem;
		font-family: 'Montserrat', sans-serif;
		letter-spacing: 1px;
	}

	@media (max-width: 780px) {
		align-items: center;
		span {
			font-size: 1.8rem;
		}
	}
`
