using Domain.Entities.DoctorAggregate;
using MediatR;

namespace Service.Command.DoctorAggregate
{
    public class LowDoctorCommandHandler : IRequestHandler<LowDoctorCommand, Unit>
    {
        private readonly IDoctorRepository _repository;
        public LowDoctorCommandHandler(IDoctorRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(LowDoctorCommand request, CancellationToken cancellationToken)
        {
     
            var doctor = await _repository.FindByIdAsync(request.Id);
            if (doctor != null)
            {

                doctor.LowDoctor();
                if (doctor.AuthUser != null)
                {
                    doctor.AuthUser.LowAuthUser();
                }
                _repository.Update(doctor);
                await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);
            }
            else
            {
                throw new InvalidOperationException("No existe el registro a editar");
            }

            return Unit.Value;
        }
    }
}
