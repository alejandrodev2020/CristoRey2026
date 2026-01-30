import { Dimensions, StyleSheet } from "react-native";
import { AppTheme } from "../../../core/themes/colors";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export const createSaleStoreProductStyle = (theme: AppTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        container2: {
            marginTop: 0,
        },
        header: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            top: -10
        },
        productCard: {
            flexDirection: 'row',
            padding: 12,
            marginVertical: 8,
            backgroundColor: theme.colors.card.background,
            borderRadius: 8,
            alignItems: 'center',

        },

        productInfo: { flex: 1 },
        productName: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
            color: theme.colors.card.productName.color
        },
        categoryInfo: {
            color: theme.colors.card.productName.color,
            fontFamily: 'Poppins-SemiBold'
        },
        choiceContainer: {
            height: 50,
            textAlign: 'center',
            color: 'red',
            marginBottom: 10,
            paddingHorizontal: 16
        },
        choiceButton: {
            paddingHorizontal: 16,
            backgroundColor: '#cbcbcbff',
            color: '#fe0000ff',
            borderRadius: 20,
            marginRight: 8,
            minWidth: 80,
            // minHeight:20,
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Poppins-Regular',
            textTransform: 'uppercase',
        },
        choiceButtonSelected: {
            backgroundColor: '#F54927',
            borderColor: '#ee3f3f',
        },
        choiceText: {
            fontSize: 14,
            color: '#444444ff',
            fontWeight: '500',
        },
        choiceTextSelected: {
            color: '#fff',
            fontWeight: 'bold',
        },
        animatedTextContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        animatedContainer: {
            zIndex: 999,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255,255,255,0.95)', 
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            overflow: 'hidden',
        },

        bottomSheetContent: {
            backgroundColor: 'white',
            padding: 16,
            height: 250,
            alignItems: 'center',
        },

        linear: {
            height: screenHeight * 0.25,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            color: '#fff',
            fontSize: 20,
            fontWeight: '600',
        },
        headerRight: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        headerText: {
            color: '#6d6a6aff',
            fontSize: 16,
            fontFamily: 'Poppins-SemiBold',
        },
        filterChip: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#e6eef9',
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 4,
            marginHorizontal: 8,
            maxWidth: 180,
        },
        filterChipText: {
            fontSize: 13,
            color: '#325284',
            fontFamily: 'Poppins-SemiBold',
            maxWidth: 130,
        },
        filterChipClose: {
            marginLeft: 6,
            backgroundColor: '#325284',
            borderRadius: 12,
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        filterChipCloseText: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
        },
    });
