import { getColorTrx, getStsTransaction } from '../Helpers';

export default function StatusTrx({ transaction }) {
    const color = getColorTrx(transaction.status);
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full bg-${color}-50 px-2 py-1 text-xs font-semibold text-${color}-600`}
        >
            <span className={`h-1.5 w-1.5 rounded-full bg-${color}-600`}></span>
            {getStsTransaction(transaction.status)}
        </span>
    );
}
