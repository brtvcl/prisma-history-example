import { PrismaClient } from '@prisma/client';

let prisma = new PrismaClient();

const recordedOperations = ['create', 'createMany', 'update', 'updateMany', 'delete', 'deleteMany'];

prisma = prisma.$extends({
    query: {
        async $allOperations(params) {

            const { model, operation, args, query } = params;

            if (recordedOperations.includes(operation) && !args.skipHistory) {
                await prisma.history.create({
                    data: {
                        model: model,
                        operation: operation,
                        args: JSON.stringify(args)
                    },
                    skipHistory: true
                });
            }

            delete args.skipHistory;
            return await query(args);
        }
    }
})




export { prisma };