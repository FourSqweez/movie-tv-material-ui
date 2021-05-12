import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { useEffect, useState } from 'react'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import MovieIcon from '@material-ui/icons/Movie'
import TvIcon from '@material-ui/icons/Tv'
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
	root: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
		backgroundColor: '#1f313a',
		zIndex: 100,
	},
})

export default function SimpleBottomNavigation() {
	const classes = useStyles()
	const [value, setValue] = useState(0)
	const history = useHistory()

	useEffect(() => {
		switch (value) {
			case 0:
				return history.push('/')
			case 1:
				return history.push('/movies')
			case 2:
				return history.push('/series')
			default:
				return history.push('/search')
		}
	}, [value])

	return (
		<BottomNavigation
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue)
			}}
			showLabels
			className={classes.root}
		>
			<BottomNavigationAction label="Trending" icon={<WhatshotIcon />} />
			<BottomNavigationAction label="Movies" icon={<MovieIcon />} />
			<BottomNavigationAction label="TV Series" icon={<TvIcon />} />
			<BottomNavigationAction label="Search" icon={<SearchIcon />} />

			<style jsx>{`
				.MuiBottomNavigationAction-label {
					color: gray;
				}
				.MuiSvgIcon-root {
					color: gray;
				}
				.Mui-selected {
					color: white;
				}
				.Mui-selected svg {
					color: white;
				}
			`}</style>
		</BottomNavigation>
	)
}
