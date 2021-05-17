import {
	Button,
	createMuiTheme,
	Tab,
	Tabs,
	TextField,
	ThemeProvider,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ContentContainer } from './../components/utils/ContentContainer'
import SingleContent from './../components/SingleContent'
import CustomPagination from './../components/CustomPagination'

const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#fff',
		},
	},
})

export default function Search() {
	const [type, setType] = useState(0)
	const [page, setPage] = useState(1)
	const [searchText, setSearchText] = useState('')
	const [searchClicked, setSearchClicked] = useState(false)
	const [contents, setContents] = useState([])
	const [numOfPages, setNumOfPages] = useState()

	const fetchSearch = async () => {
		try {
			if (searchText) {
				const { data } = await axios.get(`https://api.themoviedb.org/3/search/
				${type ? 'tv' : 'movie'}?api_key=${process.env.REACT_APP_MOVIES_API_KEY}
				&language=en-US&query=${searchText}&page=${page}&include_adult=false`)

				setContents(data.results)
				setNumOfPages(data.total_pages)
				setSearchClicked(true)
				console.log(data.results)
				console.log('searchText : ', searchText)
			} else {
				alert('พิมพ์ก่อนไอ่เวร')
			}
		} catch (error) {
			console.log('error: ', error)
		}
	}

	useEffect(() => {
		window.scroll(0, 0)
		if (searchText) {
			fetchSearch()
		}
		// eslint-disable-next-line
	}, [type, page])

	const handleSearchChange = (e) => {
		setSearchText(e.target.value)
		setSearchClicked(false)
	}

	const handleTabsChange = (event, newValue) => {
		setType(newValue)
		setPage(1)
	}

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			fetchSearch()
		}
	}

	return (
		<div>
			<ThemeProvider theme={darkTheme}>
				<div style={{ display: 'flex', margin: '15px 0' }}>
					<TextField
						style={{ flex: 1 }}
						className="searchBox"
						label="Search"
						variant="filled"
						onChange={handleSearchChange}
						onKeyUp={handleKeyPress}
					/>

					<Button
						variant="contained"
						style={{ marginLeft: 10 }}
						onClick={fetchSearch}
					>
						<SearchIcon fontSize="large" />
					</Button>
				</div>

				<Tabs
					value={type}
					indicatorColor="primary"
					textColor="primary"
					centered
					onChange={handleTabsChange}
					style={{ paddingBottom: '15px' }}
					aria-label="disabled tabs example"
				>
					<Tab style={{ width: '50%' }} label="Search Movies" />
					<Tab style={{ width: '50%' }} label="Search TV Series" />
				</Tabs>
			</ThemeProvider>

			<ContentContainer>
				{searchClicked &&
					searchText &&
					!contents.length &&
					(type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}

				{contents &&
					contents.map((c) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							media_type={type ? 'tv' : 'movie'}
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
