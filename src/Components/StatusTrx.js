import { getColorTrx, getStsTransaction } from '../Helpers';

export default function StatusTrx({ transaction }) {
    const color = getColorTrx(transaction.status);
    // return (
    //     <span
    //         className={`inline-flex items-center gap-1 rounded-full bg-${color}-50 px-2 py-1 text-xs font-semibold text-${color}-600`}
    //     >
    //         <span className={`h-1.5 w-1.5 rounded-full bg-${color}-600`}></span>
    //         {getStsTransaction(transaction.status)}
    //     </span>
    // );

    switch (transaction.status) {
        case 0:
            return (
                <span
                    className={`inline-flex items-center rounded-md bg-${color}-50 px-2 py-1 text-xs font-medium text-${color}-600 ring-1 ring-inset ring-${color}-500/10`}
                >
                    {getStsTransaction(transaction.status)}
                </span>
            );
        case 1:
            return (
                <span
                    className={`inline-flex items-center rounded-md bg-${color}-50 px-2 py-1 text-xs font-medium text-${color}-600 ring-1 ring-inset ring-${color}-500/10`}
                >
                    {getStsTransaction(transaction.status)}
                </span>
            );
        case 2:
            return (
                <span
                    className={`inline-flex items-center rounded-md bg-${color}-50 px-2 py-1 text-xs font-medium text-${color}-600 ring-1 ring-inset ring-${color}-500/10`}
                >
                    {getStsTransaction(transaction.status)}
                </span>
            );
        case 3:
            return (
                <span
                    className={`inline-flex items-center rounded-md bg-${color}-50 px-2 py-1 text-xs font-medium text-${color}-600 ring-1 ring-inset ring-${color}-500/10`}
                >
                    {getStsTransaction(transaction.status)}
                </span>
            );
        case 9:
            return (
                <span
                    className={`inline-flex items-center rounded-md bg-${color}-50 px-2 py-1 text-xs font-medium text-${color}-600 ring-1 ring-inset ring-${color}-500/10`}
                >
                    {getStsTransaction(transaction.status)}
                </span>
            );
        default:
            return (
                <span
                    className={`inline-flex items-center rounded-md bg-${color}-50 px-2 py-1 text-xs font-medium text-${color}-600 ring-1 ring-inset ring-${color}-500/10`}
                >
                    {getStsTransaction(transaction.status)}
                </span>
            );
    }
}
