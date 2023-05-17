import { useNavigate } from 'react-router-dom';

function Authenticated(props) {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    try {
        if (token === null) {
            navigate('/login');
            return;
        } else {
            return props.children;
        }
    } catch (e) {
        navigate('/login');
    }
}

export default Authenticated;
