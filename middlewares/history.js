async function prismaController(req, res) {

    return function (req, res) {
        prisma.$transaction((prisma) => { });
    };

}