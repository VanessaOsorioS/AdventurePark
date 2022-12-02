import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CodigosAutenticacion, CodigosAutenticacionRelations} from '../models';

export class CodigosAutenticacionRepository extends DefaultCrudRepository<
  CodigosAutenticacion,
  typeof CodigosAutenticacion.prototype._id,
  CodigosAutenticacionRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(CodigosAutenticacion, dataSource);
  }
}
