import makeStyles from '@material-ui/core/styles/makeStyles';

const getStyles = (theme: any = null) => {
    const styles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        logo: {
            maxWidth: '300px',
            marginTop: '30px',
        },
        testContainer: {
            width: '770px',
        },
        linearProgress: {
            marginBottom: '30px',
        },
        card: {
            padding: '30px',
            marginBottom: '30px',
        },
        questionIndex: {
            textAlign: 'right',
            fontSize: '0.7rem',
        },
        questionContainer: {
            padding: '20px 0',
        },
        textarea: {
            width: '100%',
            backgroundColor: '#f0f0f0',
            padding: '10px',
            borderRadius: '5px',
            fontFamily: 'Roboto',
            marginTop: '10px',
        },
        image: {
            maxWidth: '100%',
            marginTop: '10px',
        },
        backdrop: {
            zIndex: 2,
            color: '#fff',
        },
        questionCard: {
            position: 'relative',
            padding: '30px',
        },
        questionBadge: {
            position: 'absolute',
            top: '20px',
            right: '20px'
        },
        hint: {
            fontSize: '12px',
            float: 'right'
        }
    }));

    return styles;
};

export default getStyles;