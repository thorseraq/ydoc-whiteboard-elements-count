import knex from "knex";
import { Doc, applyUpdate } from "yjs";

import { SurfaceElements, dealDocs } from "./util";

const yDocElements: Record<SurfaceElements | 'frame' | 'total', number> = {
    'frame': 0,
    'brush': 0,
    'shape': 0,
    'connector': 0,
    'total': 0,
}

const connection = knex({
    client: "pg",
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: '',
        password: '',
        database: ''
    }
});

const table = '';
const ydocColumn = '';
const buffers = await connection.select(ydocColumn).from(table);
const ydocs = buffers.map(buffer => {
    const doc = new Doc();
    applyUpdate(doc, buffer);
    return doc;
});

dealDocs(ydocs, yDocElements);
console.log(`count: `, yDocElements);