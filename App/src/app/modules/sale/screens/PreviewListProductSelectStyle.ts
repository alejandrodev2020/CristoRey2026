import { Dimensions, StyleSheet } from "react-native";
import { AppTheme } from "../../../core/themes/colors";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export const PreviewListProductSelectStyle = (theme: AppTheme) =>
    StyleSheet.create({
        container: {
            backgroundColor: '#fff',
            flex: 1,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 5,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        itemContainer: {
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            paddingVertical: 10,
        },
        name: {
            fontSize: 16,
            fontWeight: '500',
            fontFamily: 'Poppins-SemiBold',
            color: '#000',
        },
        emptyText: {
            textAlign: 'center',
            marginTop: 20,
            color: '#999',
        },
        footerFixed: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            backgroundColor: '#fff',
        },
        rowBetween: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        buttonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
            fontFamily: 'Poppins-SemiBold',
        },
        flexButton: {
            flex: 1,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
        },
        button: {
            paddingVertical: 16,
            borderRadius: 40,
            alignItems: 'center',
        },
        detailText: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 14,
            color: '#333',
            marginTop: 2,
        },
        discountText: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 14,
            color: '#d32f2f',
        },
        subtotalContainer: {
            marginTop: 10,
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 12,
            backgroundColor: '#f5f7fa',
            alignItems: 'center',
        },
        subtotalLabel: {
            fontSize: 13,
            fontWeight: '600',
            color: '#666',
        },
        subtotalValue: {
            fontSize: 26,
            fontWeight: '800',
            color: '#000',
        },

        summaryContainerManual: {
  paddingHorizontal: 15,
  paddingVertical: 12,
  borderTopWidth: 1,
  borderTopColor: '#e0e0e0',
  backgroundColor: '#fff',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
summaryInfoText: {
  fontSize: 13,
  color: '#555',
  marginBottom: 2
},
totalAmountText: {
  fontFamily: 'Poppins-Bold',
  fontSize: 26,
  color: '#000',
},
    });
