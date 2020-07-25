import { Router, request, response } from 'express';
import { getCustomRepository } from 'typeorm'
import { parseISO, isEqual } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import Appointment from '../models/Appointment';

const appointmentesRouter = Router();

appointmentesRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});
//** Criando um novo agendamento passando um barbeiro e uma data e hora prevista */
appointmentesRouter.post('/', async  (request, response) => {
  try {
      // Dados do view para inserção
      const { provider, date } = request.body;
      //
      const parsedDate = parseISO(date);

      const createAppointment = new CreateAppointmentService();

      const appointment = await createAppointment.execute({
        date: parsedDate,
        provider
      });

      return response.json(appointment);
  } catch (err) {
      return response.status(400).json({ error: err.message })
  }
});

export default appointmentesRouter;
