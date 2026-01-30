using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace Resources.Cache.Session
{
    /// <summary>
    /// Interfaz que resume la información de sesión de un usuario
    /// </summary>
    public interface ISession
    {
        /// <summary>
        /// Carga la data de un usuario en base a su token 
        /// </summary>
        /// <param name="token">Token del usuario logueado</param>
        /// <returns>Retorna falso si el token no existe</returns>
        Task<bool> LoadData(string token);

        /// <summary>
        /// obtiene el código de usuario.
        /// </summary>
        /// <returns></returns>
        int GetUserCode();

        /// <summary>
        /// Obtiene la data extra asociada al usuario
        /// </summary>
        /// <returns></returns>
        Dictionary<string, object> GetData();

        /// <summary>
        /// Obtiene un valor que indica si el usuario es Admin o no
        /// </summary>
        /// <returns></returns>
        bool IsAdmin();

        /// <summary>
        /// Determina si el usuario tiene permiso de acceso a una serioe de transacciones
        /// </summary>
        /// <param name="transactions">Array con el listado de transacciones</param>
        /// <returns>Verdadero si tiene permiso a alguna de las transacciones</returns>
        bool HasPermission(string[] transactions);

        /// <summary>
        /// Obtiene un valor que indica si el objeto tiene un usuairo asociado
        /// </summary>
        /// <returns></returns>
        bool HasUser();

        /// <summary>
        /// Destruye la sesión del usuairo actual
        /// </summary>
        void LogOut();

        /// <summary>
        /// Obtiene el token de sesión, que se puede usar en otro objeto ISession para reconstruir esta misma sesión mediante el LoadData(token)
        /// </summary>
        /// <returns>El token de sesión</returns>
        string GetToken();
    }
}

