import { StyleSheet } from "react-native";

export const saleStoreScreenStyle = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
    flexGrow: 1,
    backgroundColor: '#ffffffff',
    // paddingBottom: 150,
    // marginTop:30
  },
  cardTitle: {
    textAlign: 'center',
    // fontWeight: 'bold',
    color: '#fff',
    borderRadius: 4,
    paddingVertical: 6,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  image: {
    width: '100%',
    height: 120,
    marginBottom: 12,
  },
  footerSection: {
    flex: 1,
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#ccc', // color de la línea
    marginHorizontal: 8,
  },
  cardBase: {
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    margin: 8,
    shadowOffset: {width: 0, height: 2},
    marginBottom: 10,
  },
  card: {
    marginVertical: 8,
    padding: 16,
    width: '100%',
    marginBottom: 1,
  },
  footer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    height: 55,
  },
    row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // o 'flex-start' si querés más pegado
    gap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
