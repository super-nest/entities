import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { Model } from 'mongoose';
import { Entity, SuperPropOptions } from './metadata/entity.interface';
import { isDate, isNumber, isString, isBoolean } from './common/helper.utils';

@Injectable()
export class SuperEntityService implements OnModuleInit {
    private entities = new Array<Entity>();
    constructor(private readonly modulesContainer: ModulesContainer) {}

    async onModuleInit() {
        await this.getMongooseModels();
    }

    findOne(collectionName: string) {
        return this.entities.find((entity) => entity.name === collectionName);
    }

    find() {
        return this.entities;
    }

    private async getMongooseModels() {
        const modules = [...this.modulesContainer.values()];
        const models: Array<Entity> = [];

        for (const module of modules) {
            for (const [, provider] of module.providers) {
                if (
                    provider.instance &&
                    (provider.instance as Model<any>).modelName
                ) {
                    const model = provider.instance as Model<any>;
                    models.push({
                        name: model.modelName,
                        schema: model.schema as any,
                        class: model.constructor,
                    });
                }
            }
        }

        const result = await this.processModels(models);
        return result;
    }

    private async processModels(models: any[]) {
        for (const model of models) {
            const { name, schema } = model;
            const propOptions: SuperPropOptions[] = [];

            for (const [key, value] of Object.entries(schema.obj)) {
                const _schema = value as SuperPropOptions;
                const ref = _schema?.ref;
                let type = _schema?.type;

                switch (true) {
                    case isString(type):
                        type = 'String';
                        break;
                    case isNumber(type):
                        type = 'Number';
                        break;
                    case isDate(type):
                        type = 'Date';
                        break;
                    case isBoolean(type):
                        type = 'Boolean';
                        break;
                    case !!ref:
                        type = 'Relation';
                        break;
                    default:
                        type = 'String';
                }

                propOptions.push({
                    ..._schema,
                    key,
                    type,
                    ref,
                });
            }

            propOptions.sort(
                (a, b) => (a?.columnPosition || 0) - (b?.columnPosition || 0),
            );

            const schemaObject = propOptions.reduce((acc, curr) => {
                acc[curr.key] = curr;
                return acc;
            }, {});

            this.entities.push({ name, schema: schemaObject });
        }
    }
}
