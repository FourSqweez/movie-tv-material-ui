import Pagination from '@material-ui/lab/Pagination'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'

const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
	},
})

export default function CustomPagination({ setPage, numOfPages = 10 }) {
	const handlePageChang = (page) => {
		setPage(page)
		console.log('page', page)
		window.scroll(0, 0)
	}

	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				marginTop: 10,
			}}
		>
			<ThemeProvider theme={darkTheme}>
				<Pagination
					count={numOfPages}
					onChange={(e) => handlePageChang(e.target.textContent)}
					hideNextButton
					hidePrevButton
					color="primary"
				/>
			</ThemeProvider>
		</div>
	)
}
