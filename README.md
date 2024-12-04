## Introduction

Welcome to the `@super-nest/entities` package! This library provides a
structured approach to managing entities in your NestJS applications. It
simplifies the process of defining, organizing, and utilizing entities, ensuring
data consistency and improving maintainability across your codebase.

## Features

-   **Entity Metadata Management**: Automatically extracts and stores metadata
    for entity properties, facilitating API documentation and validation.
-   **Integration with Mongoose**: Seamlessly integrates with Mongoose to manage
    MongoDB schemas and models. In the future, support for other popular ORMs
    such as Prisma and TypeORM will also be provided.
-   **Custom Property Options**: Supports custom property definitions with
    enhanced options, including type definitions, labels, and more.

## Installation

To install the package, run the following command:

```bash
$ npm i @super-nest/entities @nestjs/mongoose mongoose
```

### Usage

**Step 1: Import the Module**

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.entity';
import { SuperEntityModule } from '@super-nest/entities';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => ({
                uri: 'mongodb://localhost:27017/test',
            }),
        }),
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
        // import module
        SuperEntityModule.forRoot(),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
```

**Step 2: Create your entity** Use @Prop() if you only get metadata or
@SuperProp() to fit with @super-nest

```ts
@Schema({
    timestamps: true,
    collection: 'users',
})
export class User {
    @Prop({ type: String })
    // or @SuperProp({ type: String })
    name: string;

    @Prop({ type: String })
    // or @SuperProp({ type: String })
    email: string;

    @Prop({ type: Types.ObjectId, ref: 'roles' })
    // or @SuperProp({ type: Types.ObjectId, ref: 'roles' })
    role: Types.ObjectId;
}
```

**Step 3: Use entites metadata in Your Services**

```ts
@Controller()
export class AppController {
    constructor(private readonly superEntityService: SuperEntityService) {}

    @Get()
    async getHello() {
        const result = this.superEntityService.findOne(User.name);
        // result will be:
        // {
        //     "name": "User",
        //     "schema": {
        //         "name": {
        //             "type": "String",
        //             "key": "name"
        //         },
        //         "email": {
        //             "type": "String",
        //             "key": "email"
        //         },
        //         "role": {
        //             "type": "Relation",
        //             "ref": "roles",
        //             "key": "role"
        //         }
        //     }
        // }
        return result;
    }
}
```

### Contact

For any questions or issues, please reach out to the author:

-   Hoang Cong Nhut Vy
-   [GitHub Profile](https://github.com/vyhcn3012)
-   [Linkedin](https://www.linkedin.com/in/vyhcn3012/)
