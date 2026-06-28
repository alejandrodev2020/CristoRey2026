using Domain.Entities.DoctorAggregate;
using MediatR;

namespace Service.Command.DoctorAggregate
{
    public class ActivateDoctorCommandHandler : IRequestHandler<ActivateDoctorCommand, Unit>
    {
        private readonly IDoctorRepository _repository;
        public ActivateDoctorCommandHandler(IDoctorRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(ActivateDoctorCommand request, CancellationToken cancellationToken)
        {

            var doctor = await _repository.FindByIdAsync(request.Id);
            if (doctor != null)
            {

                doctor.ActiveDoctor();
                if (doctor.AuthUser != null)
                {
                    doctor.AuthUser.ActiveAuthUser();
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
