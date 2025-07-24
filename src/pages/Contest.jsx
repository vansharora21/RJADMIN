import Header from "../components/common/Header";
import ProductsTable from "../components/contest/contestable";

const Gamesmanagement = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title=' Contest Management' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>

				<ProductsTable />
			</main>
		</div>
	);
};
export default Gamesmanagement;
