import { Router, request, response } from 'express';
import { getCustomRepository } from 'typeorm'
import { parseISO, isEqual } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentesRouter = Router();

//** Aplicando em todas as rotas */
appointmentesRouter.use(ensureAuthenticated);

appointmentesRouter.get('/', async (request, response) => {
  console.log(request.user);

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});
//** Criando um novo agendamento passando um barbeiro e uma data e hora prevista */
appointmentesRouter.post('/', async  (request, response) => {
  try {
      // Dados do view para inserção
      const { provider_id, date } = request.body;
      //
      const parsedDate = parseISO(date);

      const createAppointment = new CreateAppointmentService();

      const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id
      });

      return response.json(appointment);
  } catch (err) {
      return response.status(400).json({ error: err.message })
  }
});

export default appointmentesRouter;
