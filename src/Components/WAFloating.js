export default function WAFloating() {
    const floatingStyle = {
        position: 'fixed',
        width: '60px',
        height: '60px',
        bottom: '40px',
        right: '40px',
        backgroundColor: '#25d366',
        color: '#fff',
        borderRadius: '50px',
        textAlign: 'center',
        fontSize: '30px',
        boxShadow: '2px 2px 3px #999',
        zIndex: '100',
    };

    return (
        <>
            <link
                rel='stylesheet'
                href='https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'
            />
            <a
                href='https://api.whatsapp.com/send?phone=6283818213645&text=Halo%21%20Saya%20butuh%20bantuan.'
                style={floatingStyle}
                target='_blank'
                rel='noreferrer'
            >
                <i className='fa fa-whatsapp' style={{ marginTop: '16px' }}></i>
            </a>
        </>
    );
}
