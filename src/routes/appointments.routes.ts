import { Router, request, response } from 'express';
import { parseISO, isEqual } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentesRouter = Router();
const appointmentsRepository = new AppointmentsRepository();


appointmentesRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});
//** Criando um novo agendamento passando um barbeiro e uma data e hora prevista */
appointmentesRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository
    );
    const appointment = createAppointment.execute({ date: parsedDate, provider });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
});

export default appointmentesRouter;
