import Header from './components/header/header';
import Pagination from './components/pagination/pagination';
import Container from './components/container/container';
import ProductDetail from './components/detail/detail';
/**
 * Main application component
 * @returns {JSX.Element}
 */
function App() {
	return (
		<>
			<Header />
			{/* <Container /> */}
			<ProductDetail />
			<Pagination />
		</>
	);
}

export default App;
