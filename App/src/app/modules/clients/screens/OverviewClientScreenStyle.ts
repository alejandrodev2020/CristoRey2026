import { StyleSheet, Dimensions } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

export const styles = StyleSheet.create({
  /* ========================
     GENERAL
  ======================== */

  container: {
    flex: 1,
    backgroundColor: '#f5f6f8',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ========================
     PORTADA (IMAGEN + DEGRADADO)
  ======================== */

  headerWrapper: {
    height: 280,
    position: 'relative',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden', // recorta imagen + degradado
  },

  headerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  headerGradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
  },

  /* ========================
     HEADER FLOTANTE (VOLVER + TÍTULO)
  ======================== */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -screenHeight * 0.-1,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerText: {
    color: '#6d6a6a',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },

  backIcon: {
    fontSize: 22,
    color: '#325284',
    fontWeight: '600',
  },

  /* ========================
     CARD INFO CLIENTE
  ======================== */

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },

  clientName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#5e5e5e',
  },

  clientCompany: {
    fontSize: 14,
    color: '#a5a5a5',
    marginTop: 4,
  },

  infoRow: {
    marginBottom: 14,
  },

  label: {
    fontSize: 12,
    color: '#6b7280',
  },

  value: {
    fontSize: 15,
    color: '#111827',
    marginTop: 2,
  },

  /* ========================
     BOTÓN MAPS
  ======================== */

  mapButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#e6ecff',
    alignItems: 'center',
  },

  mapButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#325284',
  },
});
