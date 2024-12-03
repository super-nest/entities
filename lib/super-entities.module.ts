import { DynamicModule, Module } from '@nestjs/common';
import { SuperEntityService } from './super-entities.service';

@Module({})
export class SuperEntityModule {
    static forRoot(): DynamicModule {
        return {
            module: SuperEntityModule,
            imports: [],
            providers: [SuperEntityService],
            exports: [SuperEntityService],
        };
    }
}
