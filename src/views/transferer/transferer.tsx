import { TransferCase } from './components/transfer-case/transfer-case'
import transfer from './transferer.module.sass'
export const Transferer = () => {
	return (
		<div className={transfer.transfer}>
			<TransferCase />
		</div>
	)
}
