import Appointment from '../models/Appointment';
import {startOfHour, parseISO, isEqual} from 'date-fns';

/** Interface para criar o DTO (Data Tranfer Object) */
interface CreateAppontmentDTO{
  provider: string;
  date: Date;
}

class AppointmentsRepository{
  private appointments: Appointment[];

  constructor(){
    this.appointments = [];
  }

  /**
   * @description Executa uma consulta com todos os agendamentos
   * @returns Appointment[]
   */
  public all(): Appointment[]{
    return this.appointments;
  }

  /**
   * @description Verifica se uma Date passada existe no array
   * @returns Caso exista a data, retorna a data caso contrártio null
   * @param date
   */
  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointmente =>
      isEqual(date, appointmente.date),
    );

    return findAppointment || null;
  }

  public create({provider, date}: CreateAppontmentDTO): Appointment {
    const appointment = new Appointment({provider, date});

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;



