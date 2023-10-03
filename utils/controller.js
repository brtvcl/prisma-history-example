import { prisma } from "../prisma/prisma.js";

function controller(handler) {
    return async function (req, res) {
        await prisma.$transaction(async (tx) => {
            req.prisma = tx;
            await handler(req, res);
        });
    }
}

export { controller };