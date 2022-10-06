import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Parque} from '../models';
import {ParqueRepository} from './parque.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly parques: HasManyRepositoryFactory<Parque, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ParqueRepository') protected parqueRepositoryGetter: Getter<ParqueRepository>,
  ) {
    super(Ciudad, dataSource);
    this.parques = this.createHasManyRepositoryFactoryFor('parques', parqueRepositoryGetter,);
    this.registerInclusionResolver('parques', this.parques.inclusionResolver);
  }
}
