import {startOfHour} from 'date-fns';
import {getCustomRepository} from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';


interface Request{
  provider: string;
  date: Date;
}

class CreateAppointmentService{

  public async execute({date, provider}: Request): Promise <Appointment> {

    /** Instancia do acesso ao repositorio */
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    if(findAppointmentInSameDate){
      throw Error('This appointments is already booked');
    }

    /** Persistindo no banco */
    const appointment = appointmentsRepository.create({
      provider,
      date:appointmentDate,
    });

    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;

