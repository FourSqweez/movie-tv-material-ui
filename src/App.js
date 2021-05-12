import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Trending from './pages/Trending'
import Movies from './pages/Movies'
import Series from './pages/Series'
import Search from './pages/Search'
import SimpleBottomNavigation from './components/MainNav'
import { Container } from '@material-ui/core'

function App() {
	return (
		<Router>
			<Header />
			<div className="app">
				<Container>
					<Switch>
						<Route path="/" exact component={Trending} />
						<Route path="/movies" component={Movies} />
						<Route path="/series" component={Series} />
						<Route path="/search" component={Search} />
					</Switch>
				</Container>
				<SimpleBottomNavigation />
			</div>
		</Router>
	)
}

export default App
