import { Dimensions, StyleSheet } from "react-native";
import { Fonts } from "../../../../styles/fonts";
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: {
        // padding: 16,
        flex: 1,
        fontFamily: 'Poppins-Regular',
        backgroundColor:'#fff'
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        marginBottom: 0,
        color: '#f5f5f5'
    },
    cardBase: {
        borderRadius: 8,
        marginVertical: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    card: {
        padding: 16,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
        marginBottom: 4,
    },
    cardSubTitle: {
        color: '#ddd',
        fontSize: 14,
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },

    cardCode: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffffff',
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginHorizontal: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 16,
    },

    searchContainer: {
        marginTop: 0,
        paddingHorizontal: 0,
        paddingVertical: 10
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFEFEF', // Fondo oscuro
        borderRadius: 30,
        paddingVertical: 5,
        paddingHorizontal: 15,
        color: 'red',
        elevation: 5, // Sombra para efecto de profundidad
    },
    input: {
        flex: 1,
        // height: 40,
        marginLeft: 10,
        fontSize: 16,
        color: '#525252ff',
        fontFamily: 'Poppins-Regular',
    },
    icon: {
        marginHorizontal: 10,
    },

    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#f4f4f4ff',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        // elevation: 3, // Sombra para Android
    },
    contactPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25, // Haciendo la imagen circular
        marginRight: 15,
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 16,
        color: '#535353ff',
        fontFamily: 'Poppins-SemiBold',
    },
    contactNumber: {
        fontSize: 14,
        color: '#666',
    },
    contactDebt: {
        fontSize: 12,
        color: '#e74c3c', // Rojo para deudas
    },
    separator: {
        // height: 1,
        // backgroundColor: '#ddd',
        // marginVertical: 5,
    },


    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
    },
    flexButton: {
        flex: 1,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Poppins-SemiBold',
    },
    button: {
        paddingVertical: 16,
        borderRadius: 40,
        alignItems: 'center',
    },

    gradientContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
        height: screenHeight * 0.18
    },

    fab: {
        position: 'absolute',
        bottom: 25,
        alignSelf: 'center', // 🔥 CENTRADO
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#325284',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6, // Android sombra
        shadowColor: '#000', // iOS sombra
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    clientCard: {
  backgroundColor: '#fff',
  borderRadius: 14,
  padding: 14,
  marginBottom: 14,
  shadowColor: '#000',
  shadowOpacity: 0.12,
  shadowRadius: 10,
  elevation: 4,
},

cardTop: {
  flexDirection: 'row',
  alignItems: 'flex-start',
},
clientPhoto: {
  width: 64,
  height: 64,
  borderRadius: 32,
  marginRight: 14,
},

clientInfo: {
 flex: 1,
  paddingTop: 2,              // 👈 pequeño ajuste visual
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
},

clientName: {
  fontSize: 16,
  fontWeight: '600',
  color: '#1f2937',
},

clientPhone: {
  fontSize: 13,
  color: '#6b7280',
  marginTop: 2,
},

clientCompany: {
  fontSize: 12,
  color: '#9ca3af',
  marginTop: 2,
},

clientCardSoft: {
  backgroundColor: '#ffffff',
  borderRadius: 18,
  
  padding: 8,
  marginBottom: 14,

  // iOS shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.10,
  shadowRadius: 10,

  // Android shadow
  elevation: 4,
},

clientPhotoSoft: {
  width: '100%',
  aspectRatio: 1,   // 👈 alto = ancho
  resizeMode: 'cover',
  borderRadius: 12, // opcional
},

clientNameSoft: {
  fontSize: 16,
  fontWeight: '600',
  color: '#1f2937',
},

clientCompanySoft: {
  fontSize: 13,
  color: '#6b7280',
  marginTop: 2,
},

clientPhoneSoft: {
  fontSize: 12,
  color: '#9ca3af',
  marginTop: 2,
},

cardActionsSoft: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: 18,
  marginTop: 12,
},

actionBase: {
  paddingVertical: 6,
  paddingHorizontal: 14,
  borderRadius: 12,
  shadowColor: '#000',
  shadowOpacity: 0.12,
  shadowRadius: 3,
  elevation: 3,
},

/* 👁️ VER */
actionView: {
  backgroundColor: '#e6ecff', // azul pastel
},

actionViewText: {
  fontSize: 13,
  fontWeight: '500',
  color: '#325284',
},

/* ✏️ EDITAR */
actionEdit: {
  backgroundColor: '#f2f3f5', // gris suave
},

actionEditText: {
  fontSize: 13,
  fontWeight: '500',
  color: '#374151',
},

/* 🧭 MAPS */
actionMap: {
  backgroundColor: '#eaf7ef', // verde pastel
},

actionMapText: {
  fontSize: 13,
  fontWeight: '500',
  color: '#166534',
},



photoWrapper: {
  width: '40%',          // 👈 lo que tú querías
  aspectRatio: 1,        // 👈 proporción natural (cuadrado)
  marginRight: 14,
  borderRadius: 12,
  overflow: 'hidden',
},

  header2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      top: 0,
      paddingHorizontal: 20,
      paddingTop: 0,
      // backgroundColor:'red'
      
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
