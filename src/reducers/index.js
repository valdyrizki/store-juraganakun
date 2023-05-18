import { combineReducers } from 'redux';
import ProductReducer from './product';
import AuthReducer from './auth';
import CartReducer from './cart';
import BankReducer from './bank';
import TransactionReducer from './transaction';
import DownloadReducer from './download';
import UserReducer from './user';
import CategoryReducer from './category';

export default combineReducers({
    ProductReducer,
    AuthReducer,
    CartReducer,
    BankReducer,
    TransactionReducer,
    DownloadReducer,
    UserReducer,
    CategoryReducer,
});
