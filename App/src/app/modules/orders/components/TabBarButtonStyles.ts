import { StyleSheet } from "react-native";
import { useTheme } from "../../../core/themes/useTheme";

export const getStyles = (theme: ReturnType<typeof useTheme>) =>
    StyleSheet.create({
        container: {
            backgroundColor: '#fff',
            padding: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            elevation: 5,
            shadowColor: '#677e00ff',
            shadowOpacity: 0.3,
            shadowOffset: { width: 10, height: 20 },
            shadowRadius: 30,
            zIndex: 10,
        },
        text: {
            fontSize: 24,
            fontWeight: '500',
            marginBottom: 8,
        },
        buttonRow: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        customButton: {
            backgroundColor: theme.colors.primary,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            marginHorizontal: 4,
            height: 60,
            width: 60,
            justifyContent: 'center',
            alignItems: 'center',
        },
        customButton2: {
            backgroundColor: theme.colors.secondary || '#b6b6b6ff',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            marginHorizontal: 4,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
        firstWord: {
            fontWeight: '800',
            color: '#000'
        },
        rateChip: {
            marginRight: 10,
            marginTop: 15,
            marginBottom: 15,
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 12,
            backgroundColor: '#f5f5f5',
            borderWidth: 1,
            borderColor: '#ccc',
        },
        rateChipSelected: {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
            borderWidth: 2,
        },
        rateChipText: {
            fontSize: 16,
            color: '#333',
        },
        rateChipTextSelected: {
            color: '#fff',
            fontWeight: 'bold',
        },
        
        checkContainer: {
        position: 'absolute',
        top: -6,
        right: -6,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#22c55e',
        alignItems: 'center',
        justifyContent: 'center',
        },

        checkText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
        },











    });