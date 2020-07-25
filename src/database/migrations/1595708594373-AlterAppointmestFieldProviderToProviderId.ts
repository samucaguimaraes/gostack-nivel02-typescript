import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";
import { query } from "express";

export class AlterAppointmestFieldProviderToProviderId1595708594373 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      // delete a column at provider
      await queryRunner.dropColumn('appointments','provider');

      // add column provider_id
      await queryRunner.addColumn(
        'appointments',
        new TableColumn({
          name: 'provider_id',
          type: 'uuid',
          isNullable: true,
        }),
      );

      // Created foreignkey
      await queryRunner.createForeignKey(
        'appointments',
        new TableForeignKey({
          name: 'AppointmentProvider',
          columnNames: ['provider_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          /** Caso o usuario for deletado: 'RESTRICT' (Não Altera) , 'SET NULL' (Atribui Valor null)
           * , 'CASCADE' (Exclui o appointment) */
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

      await queryRunner.dropColumn('appointments','provider_id' );

      await queryRunner.addColumn(
        'appointments',
        new TableColumn({
          name: 'provider',
          type: 'varchar',
        }));

    }

}
