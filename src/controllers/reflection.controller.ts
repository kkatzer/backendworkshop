import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Reflection} from '../models';
import {ReflectionRepository} from '../repositories';

export class ReflectionController {
  constructor(
    @repository(ReflectionRepository)
    public reflectionRepository : ReflectionRepository,
  ) {}

  @post('/reflections', {
    responses: {
      '200': {
        description: 'Reflection model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Reflection)
          }
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reflection, {
            title: 'NewReflection',
            exclude: ['id'],
          }),
        },
      },
    })
    reflection: Omit<Reflection, 'id'>,
  ): Promise<Reflection> {
    const now = new Date();
    reflection.creationTime = now.toString();
    return this.reflectionRepository.create(reflection);
  }

  @get('/reflections/count', {
    responses: {
      '200': {
        description: 'Reflection model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Reflection) where?: Where<Reflection>,
  ): Promise<Count> {
    return this.reflectionRepository.count(where);
  }

  @get('/reflections', {
    responses: {
      '200': {
        description: 'Array of Reflection model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Reflection, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Reflection) filter?: Filter<Reflection>,
  ): Promise<Reflection[]> {
    return this.reflectionRepository.find(filter);
  }

  @patch('/reflections', {
    responses: {
      '200': {
        description: 'Reflection PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reflection, {partial: true}),
        },
      },
    })
    reflection: Reflection,
    @param.where(Reflection) where?: Where<Reflection>,
  ): Promise<Count> {
    return this.reflectionRepository.updateAll(reflection, where);
  }

  @get('/reflections/{id}', {
    responses: {
      '200': {
        description: 'Reflection model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Reflection, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Reflection, {exclude: 'where'}) filter?: FilterExcludingWhere<Reflection>
  ): Promise<Reflection> {
    return this.reflectionRepository.findById(id, filter);
  }

  @patch('/reflections/{id}', {
    responses: {
      '204': {
        description: 'Reflection PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reflection, {partial: true}),
        },
      },
    })
    reflection: Reflection,
  ): Promise<void> {
    await this.reflectionRepository.updateById(id, reflection);
  }

  @put('/reflections/{id}', {
    responses: {
      '204': {
        description: 'Reflection PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() reflection: Reflection,
  ): Promise<void> {
    await this.reflectionRepository.replaceById(id, reflection);
  }

  @del('/reflections/{id}', {
    responses: {
      '204': {
        description: 'Reflection DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.reflectionRepository.deleteById(id);
  }
}
