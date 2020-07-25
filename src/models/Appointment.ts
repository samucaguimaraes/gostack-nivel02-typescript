import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

/**
 * Relacionamentos:
 *
 * Um para um (OneToOne)
 * um para Muitos (OneToMany)
 * Muitos para Muitos (ManyToMany)
 */

@Entity('appointments')
class Appointment{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne( () => User)
  @JoinColumn({ name: 'provider_id'})
  provider_id: string;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
