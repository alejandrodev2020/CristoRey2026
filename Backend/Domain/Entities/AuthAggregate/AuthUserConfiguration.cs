using Resources.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.AuthAggregate
{
    public class AuthUserConfiguration : BaseModel, IAggregateRoot
    {
        internal AuthUserConfiguration(bool allItemsSale, int? countItemsSale, bool? printNoteSale,
                                       bool? allItemsShopping, int? countItemsShopping, bool? printNoteShopping,
                                       bool? isActive, int authUserId = default, int id = default) : this()
        {
            Id = id;
            AuthUserId = authUserId;
            AllItemsSale = allItemsSale;
            CountItemsSale = countItemsSale;
            PrintNoteSale = printNoteSale;
            AllItemsShopping = allItemsShopping;
            CountItemsShopping = countItemsShopping;
            PrintNoteShopping = printNoteShopping;
            IsActive = isActive;
        }

        public AuthUserConfiguration()
        {

        }

        /// <summary>
        /// Id
        /// </summary>
        [Column("nAuthUserConfigurationId")]
        [Required]
        public override int Id { get; protected set; }

        /// <summary>
        /// Venta Id
        /// </summary>
        [Column("nAuthUserId")]
        [Required]
        public int AuthUserId { get; private set; }

        /// <summary>
        /// Extraer todos los items
        /// </summary>
        [Column("bAllItemsSale")]
        [Required]
        public bool AllItemsSale { get; private set; }

        /// <summary>
        /// Cantidad de Items para ventas
        /// </summary>
        [Column("nCountItemsSale")]
        public int? CountItemsSale { get; private set; }

        /// <summary>
        /// Imprimi al momento de Vender
        /// </summary>
        [Column("bPrintNoteSale")]
        public bool? PrintNoteSale { get; private set; }

        /// <summary>
        /// Extraer todos los items al momento de comprar
        /// </summary>
        [Column("bAllItemsShopping")]
        public bool? AllItemsShopping { get; private set; }

        /// <summary>
        ///  Cantidad de Items para compras
        /// </summary>
        [Column("nCountItemsShopping")]
        public int? CountItemsShopping { get; private set; }

        /// <summary>
        /// Imprimi al momento de Comprar
        /// </summary>
        [Column("bPrintNoteShopping")]
        public bool? PrintNoteShopping { get; private set; }

        /// <summary>
        /// User
        /// </summary>
        public AuthUser AuthUser { get; private set; }

        /// <summary>
        /// Estado
        /// </summary>
        [Column("bIsActive")]
        public bool? IsActive { get; private set; }



        #region

        public void UpdateConfiguration(bool allItemsSale, int? countItemsSale, bool? printNoteSale, bool? allItemsShopping, int? countItemsShopping, bool? printNoteShopping)
        {
            AllItemsSale = allItemsSale;
            CountItemsSale = countItemsSale;
            PrintNoteSale = printNoteSale;
            AllItemsShopping = allItemsShopping;
            CountItemsShopping = countItemsShopping;
            PrintNoteShopping = printNoteShopping;
        }


        #endregion


    }
}