import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Container from './components/container/container';
import ProductDetail from './components/detail/detail';
/**
 * Main application component
 * @returns {JSX.Element}
 */
function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<></>} />
				<Route path='/items' element={<Container />} />
				<Route path='/items/:id' element={<ProductDetail />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
