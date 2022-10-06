import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Mantenimiento, MantenimientoRelations} from '../models';

export class MantenimientoRepository extends DefaultCrudRepository<
  Mantenimiento,
  typeof Mantenimiento.prototype.id,
  MantenimientoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Mantenimiento, dataSource);
  }
}
