import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import {startOfHour} from 'date-fns';

/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros / excessões
 * [x] Acesso ao repositório
 */

interface Request{
  provider: string;
  date: Date;
}

class CreateAppointmentService{

  /** Princípio: Dependency Inversion: (SOLI-D-) */
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository){
      this.appointmentsRepository = appointmentsRepository;
    }

  public execute({date, provider}: Request): Appointment {

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if(findAppointmentInSameDate){
      throw Error('This appointments is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date:appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;

