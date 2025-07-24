import Header from "../components/common/Header";
import WalletManager from "../components/wallet/wallet";

const SalesPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Wallet &Transaction' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>



			<WalletManager/>
			
			</main>
		</div>
	);
};
export default SalesPage;
