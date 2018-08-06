import { Navigator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        marginTop: Navigator.NavigationBar.styles.General.TotalNavHeight
    }
});

export default styles;