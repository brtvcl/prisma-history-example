import express from 'express';
import { controller } from './utils/controller.js';
const app = express();
const port = 3000;

// MIDDLEWARES
app.use(express.json());



// API
// READ USERS
app.get('/users', controller(async function (req, res) {
    const users = await req.prisma.user.findMany({});


    res.send({ users: users });
}));

// CREATE USER
app.post('/users', controller(async (req, res) => {
    const user = req.body;

    // validate
    if (!user.email || !user.name) {
        return res.send({ error: 'email or name missing' });
    };
    if (typeof user.email != 'string' || typeof user.name != 'string') {
        return res.send({ error: 'email and name must be string' });
    };

    await req.prisma.user.create({
        data: {
            name: user.name,
            email: user.email
        }
    });

    // throw new Error('end transaction');

    res.send({ success: true });
}));

// UPDATE USER
app.put('/users/:id', controller(async (req, res) => {
    const user = req.body;
    const id = req.params.id;

    // validate
    if (!user.email || !user.name) {
        return res.send({ error: 'email or name missing' });
    };
    if (typeof user.email != 'string' || typeof user.name != 'string') {
        return res.send({ error: 'email and name must be string' });
    }
    if (!id) {
        return res.send({ error: 'id missing' });
    }

    await req.prisma.user.update({
        where: {
            id: id
        },
        data: {
            name: user.name,
            email: user.email
        }
    });

    res.send({ success: true });
}));

// DELETE USER
app.delete('/users/:id', controller(async () => {
    const id = req.params.id;
    if (!id) {
        return res.send({ error: 'id missing' });
    };

    await req.prisma.user.delete({
        where: {
            id: id
        }
    });

    res.send({ success: true });
}));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})