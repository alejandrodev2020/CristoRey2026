using Resources.Domain.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public abstract class BaseModel : BaseMappedModel
    {
        [Column("bStatus")]
        public bool Status { get; set; }
    }
}
