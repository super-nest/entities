import { applyDecorators } from '@nestjs/common';
import { Prop } from '@nestjs/mongoose';
import { SuperPropOptions } from '../metadata/entity.interface';

export const SuperProp = (options?: SuperPropOptions) => {
    return applyDecorators(Prop(options));
};
