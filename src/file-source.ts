import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import fs from 'fs-extra';
import { Doc, applyUpdate } from "yjs";

import { SurfaceElements, dealDocs } from "./util";

const yDocElements: Record<SurfaceElements | 'frame' | 'total', number> = {
    'frame': 0,
    'brush': 0,
    'shape': 0,
    'connector': 0,
    'total': 0,
}

const doc = new Doc();
const path = resolve(dirname(fileURLToPath(import.meta.url)), './whiteboard.ydoc');
const binary = fs.readFileSync(path);
applyUpdate(doc, binary);

const ydocs = [doc];

dealDocs(ydocs, yDocElements);
console.log(`count: `, yDocElements);