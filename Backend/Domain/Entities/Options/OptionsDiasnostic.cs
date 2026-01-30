using Resources.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Options
{
    public class OptionsDiasnostic : BaseModel, IAggregateChild<Options>
    {
        internal OptionsDiasnostic(int optionsId , string title, string description, string code, bool? isActive, bool? hasPicture, byte[] picture, int id = default) : this()
        {
            Id = id;
            OptionsId = optionsId;
            Title = title;
            Description = description;
            Code = code;
            HasPicture = hasPicture;
            Picture = picture;
            IsActive = isActive;
        }

        internal OptionsDiasnostic()
        {
        }

        /// <summary>
        /// Id
        /// </summary>
        [Column("nOptionsDiasnosticId")]
        [Required]
        public override int Id { get; protected set; }

        /// <summary>
        /// Nombre
        /// </summary>
        [Column("nOptionsId")]
        [Required]
        public int OptionsId { get; private set; }


        /// <summary>
        /// Nombre
        /// </summary>
        [Column("sTitle")]
        [Required]
        public string Title { get; private set; }

        /// <summary>
        /// Descripción
        /// </summary>
        [Column("sDescription")]
        [Required]
        public string Description { get; private set; }

        /// <summary>
        /// Code
        /// </summary>
        [Column("sCode")]
        [Required]
        public string Code { get; private set; }

        /// <summary>
        /// Tiene Foto
        /// </summary>
        [Column("bHasPicture")]
        public bool? HasPicture { get; private set; }

        /// <summary>
        /// <summary>
        /// Foto producto
        /// </summary>
        [Column("fPicture")]
        public byte[] Picture { get; private set; }

        /// <summary>
        /// IsActive
        /// </summary>
        [Column("bIsActive")]
        public bool? IsActive { get; private set; }

        public void UpdateDiasnostic(string title, string description, string code, bool? hasPicture, byte[] picture = null)
        {
            Title = title;
            Description = description;
            Code = code;
            HasPicture = hasPicture;
            Picture = picture;
            IsActive = true;
        }

    }
}