import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TipoMantenimiento, TipoMantenimientoRelations} from '../models';

export class TipoMantenimientoRepository extends DefaultCrudRepository<
  TipoMantenimiento,
  typeof TipoMantenimiento.prototype.id,
  TipoMantenimientoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(TipoMantenimiento, dataSource);
  }
}
