import { Dimensions, StyleSheet } from "react-native";
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export const styles = StyleSheet.create({
   container: {
    padding: 16,
    flex: 1,
    marginTop:10,
    fontFamily: 'Poppins-Regular',
    backgroundColor:'#ffff'
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    height: 40,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  inputContainer: {
    flex: 8,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: '100%',
    paddingHorizontal: 8,
    color: '#000',
  },
 
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    paddingBottom: 8,
    marginBottom: 8,
  },
  cardBody: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#495057',
    width: 80, // Ancho fijo para alinear las etiquetas
    fontFamily: 'Poppins-Regular'
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },

  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },

  gradientContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    height: screenHeight * 0.06,
  },

   cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  saleDate: {
    fontSize: 14,
    color: '#888',
  },

  clientInfo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
    fontFamily: 'Poppins-Regular',
  },
  sellerInfo: {
    fontSize: 16,
    color: '#555',
  },

  paymentInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  // -- Estilos dinámicos de estado --
  statusDefault: {
    backgroundColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusCompleted: {
    backgroundColor: '#28a745',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusCanceled: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPending: {
    backgroundColor: '#ffc107',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  
   centerSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    marginBottom: 0,
    color: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },

    header2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      top:screenHeight * 0,
      paddingHorizontal: 20,
      paddingTop: 10,
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


// cardFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: '#f0f0f0',
//     paddingTop: 8,
//   },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center', // Centra los botones entre el estado y el monto
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa', // Fondo suave para que resalte el icono
    borderWidth: 1,
    borderColor: '#eee',
  },
  // statusText: {
  //   fontSize: 11,
  //   fontWeight: '700',
  //   color: 'white',
  //   paddingHorizontal: 8,
  //   paddingVertical: 2,
  // }

});
