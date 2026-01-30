using Resources.Domain.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.Options
{
    public class Options : BaseModel, IAggregateRoot
    {
        internal Options(string title, string description, string code,  bool? isActive, bool? hasPicture , byte[] picture, int id = default) : this()
        {
            Id = id;
            Title = title;
            Description = description;
            Code = code;
            HasPicture = hasPicture;
            Picture = picture;
            IsActive = isActive;
        }

        internal Options()
        {
            _diasnostics = new List<OptionsDiasnostic>();
            _trataments = new List<OptionsTratament>();
        }

        /// <summary>
        /// Id
        /// </summary>
        [Column("nOptionsId")]
        [Required]
        public override int Id { get; protected set; }

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

        /// <summary>
        /// Listado de  equivalencias 
        /// </summary>
        private List<OptionsDiasnostic> _diasnostics;

        /// <summary>
        /// Listado de detalles de venta
        /// </summary>
        public IReadOnlyList<OptionsDiasnostic> Diasnostics => _diasnostics;


        /// <summary>
        /// Listado de  equivalencias 
        /// </summary>
        private List<OptionsTratament> _trataments;

        /// <summary>
        /// Listado de detalles de venta
        /// </summary>
        public IReadOnlyList<OptionsTratament> Trataments => _trataments;






        public static Options CreateOptions(string title, string description, string code, bool? hasPicture, byte[] picture = null)
        {
            var record = new Options();
            record.Title= title;
            record.Description = description;
            record.Code = code;
            record.HasPicture = hasPicture;
            record.Picture = picture;
            record.IsActive = true;
            return record;
        }
        public void UpdateOptions(string title, string description, string code, bool? hasPicture, byte[] picture = null)
        {
            Title = title;
            Description = description;
            Code = code;
            HasPicture = hasPicture;
            Picture = picture;
            IsActive = true;
        }

        public void CreateDiasnostic(int optionsId, string title, string description, string code, bool? hasPicture, byte[] picture) 
        {
            var record = new OptionsDiasnostic(optionsId: optionsId, 
                                               title:title, 
                                               description:description,
                                               code:code,
                                               isActive:true,
                                               hasPicture:hasPicture,
                                               picture:picture);
            _diasnostics.Add(record);
        }

        public void CreateTratament(int optionsId, string title, string description, string code, bool? hasPicture, byte[] picture)
        {
            var record = new OptionsTratament(optionsId: optionsId,
                                               title: title,
                                               description: description,
                                               code: code,
                                               isActive: true,
                                               hasPicture: hasPicture,
                                               picture: picture);
            _trataments.Add(record);
        }

    }
}