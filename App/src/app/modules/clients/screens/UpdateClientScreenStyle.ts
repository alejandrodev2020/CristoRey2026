import { Dimensions, StyleSheet } from 'react-native';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
        paddingHorizontal: 16,
    },

    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 22,
        color: '#23305F',
        marginVertical: 16,
        textAlign: 'center',
    },

    /* ================= FOTO ================= */

    photoContainer: {
        alignSelf: 'center',
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: '#e6e9ef',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 2,
        borderColor: '#d0d5dd',
    },

    photo: {
        width: 126,
        height: 126,
        borderRadius: 63,
    },

    photoText: {
        marginTop: 6,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#777',
    },

    /* ================= INPUTS ================= */

    input: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#1a1a1a',
        marginBottom: 12,

        // sombra suave
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
    },

    /* ================= BOTÓN ================= */

    saveButton: {
        backgroundColor: '#325284',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 40,

        shadowColor: '#325284',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },

    saveButtonText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#ffffff',
        letterSpacing: 1,
    },
    avatarSquare: {
        width: 160,
        height: 160,
        borderRadius: 8,
        backgroundColor: '#ecf0f1',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#dcdcdc',
    },

    avatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    avatarActions: {
        flexDirection: 'row',
        marginTop: 10,
    },

    avatarBtn: {
        backgroundColor: '#2980b9',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 6,
        marginHorizontal: 4,
    },

    avatarBtnText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 13,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // top: screenHeight * 0.43,
        paddingHorizontal: 10,
        backgroundColor: '#f5f6fa',
        // paddingTop: 10,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        color: '#6d6a6aff',
        fontSize: 16,
        marginRight: 8,
        fontFamily: 'Poppins-SemiBold',
    },

});
