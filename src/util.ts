import { Doc, Map as YMap } from "yjs";

export type SurfaceElements = 'brush' | 'shape' | 'connector';
type AffineSurface = {
    elements: Array<{
        type: SurfaceElements,
        [key: string]: any
    }>
}

type YDocElements = Record<SurfaceElements | 'frame' | 'total', number>;

export function dealDocs(docs: Doc[], yDocElements: YDocElements) {
    docs.forEach(doc => dealDoc(doc, yDocElements));
}

function dealDoc(doc: Doc, yDocElements: YDocElements) {
    const yMaps: YMap<unknown>[] = [];
    for (const key in doc.toJSON()) {
        const map = doc.getMap(key);
        const keys = [...map.keys()];
        if (!(keys.includes('versions') || keys.length === 0)) {
            yMaps.push(map);
        }
    }
    yMaps.forEach((yMap) => dealYMap(yMap, yDocElements));
}

function dealYMap(map: YMap<unknown>, yDocElements: YDocElements) {
    for (let [_, block] of map) {
        block = block.toJSON();
        if (block['sys:flavour'] === 'affine:frame') {
            yDocElements['frame']++;
            yDocElements['total']++;
        } else if (block['sys:flavour'] === 'affine:surface') {
            const surface = block as AffineSurface;
            for (const key in surface.elements) {
                const element = surface.elements[key];
                if (!element) {
                    console.warn('element empty');
                    continue;
                }
                yDocElements[element.type]++;
                yDocElements['total']++;
            }
        } else {
            yDocElements['total']++;
        }
    }
}
