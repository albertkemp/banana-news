(function(){
    class vdom {
        constructor() {
            this.vdom = new DOMParser().parseFromString("<!DOCTYPE "
                + document.doctype.name
                + (document.doctype.publicId ? ` PUBLIC "${document.doctype.publicId}"` : "")
                + (document.doctype.systemId ? ` "${document.doctype.systemId}"` : "")
                + ">"
                + "\n"
                + document.documentElement.outerHTML, "text/html");
        }
        updateVDOM() {
            this.vdom = new DOMParser().parseFromString("<!DOCTYPE "
                + document.doctype.name
                + (document.doctype.publicId ? ` PUBLIC "${document.doctype.publicId}"` : "")
                + (document.doctype.systemId ? ` "${document.doctype.systemId}"` : "")
                + ">"
                + "\n"
                + document.documentElement.outerHTML, "text/html");
        }
        updateDOM() {
            this.diff(document, this.vdom, document.body)
        }
        updateAll() {
            this.diff(document, this.vdom, document.documentElement)
        }
        getVDOM() {
            return this.vdom;
        }
        diff(oldNode, newNode, parent) {
            if (oldNode.nodeType === 3 && newNode.nodeType === 3) {
                if (oldNode.nodeValue !== newNode.nodeValue) {
                    oldNode.nodeValue = newNode.nodeValue;
                }
                return;
            }
            if (oldNode.nodeName !== newNode.nodeName) {
                parent.replaceChild(newNode.cloneNode(true), oldNode);
                return;
            }
            if (oldNode.nodeType === 1 && newNode.nodeType === 1) {
                for (const attr of newNode.attributes) {
                    if (oldNode.getAttribute(attr.name) !== attr.value) {
                        oldNode.setAttribute(attr.name, attr.value);
                    }
                }
                for (const attr of [...oldNode.attributes]) {
                    if (!newNode.hasAttribute(attr.name)) {
                        oldNode.removeAttribute(attr.name);
                    }
                }
            }
            const oldKids = [...oldNode.childNodes];
            const newKids = [...newNode.childNodes];
            const hasKeys = newKids.some(n => n.id);
            if (!hasKeys) {
                const len = Math.max(oldKids.length, newKids.length);
                for (let i = 0; i < len; i++) {
                    const o = oldKids[i];
                    const n = newKids[i];
                    if (!o && n) {
                        oldNode.appendChild(n.cloneNode(true));
                    } else if (o && !n) {
                        oldNode.removeChild(o);
                    } else {
                        this.diff(o, n, oldNode);
                    }
                }
                return;
            }
            const oldKeyIndex = new Map();
            oldKids.forEach((c, i) => {
                if (c.id) oldKeyIndex.set(c.id, i);
            });
            const seq = [];
            const newKeySet = new Set();
            newKids.forEach((newK, i) => {
                const key = newK.id;
                newKeySet.add(key);
                const oldIndex = oldKeyIndex.has(key) ? oldKeyIndex.get(key) : -1;
                seq[i] = oldIndex;
                if (oldIndex === -1) {
                    oldNode.insertBefore(newK.cloneNode(true), oldNode.childNodes[i] || null);
                } else {
                    this.diff(oldKids[oldIndex], newK, oldNode);
                }
            });
            const lis = this.getLIS(seq);
            let lisPos = lis.length - 1;
            for (let i = newKids.length - 1; i >= 0; i--) {
                if (seq[i] === -1) continue;
                if (lisPos >= 0 && lis[lisPos] === i) {
                    lisPos--;
                } else {
                    const oldIndex = seq[i];
                    const el = oldKids[oldIndex];
                    oldNode.insertBefore(el, oldNode.childNodes[i] || null);
                }
            }
            oldKids.forEach(c => {
                if (c.id && !newKeySet.has(c.id)) {
                    oldNode.removeChild(c);
                }
            });
        }
        getLIS(arr) {
            const p = arr.slice();
            const result = [];
            let u, v;
            for (let i = 0; i < arr.length; i++) {
                const x = arr[i];
                if (x < 0) continue;
                if (result.length === 0 || arr[result[result.length - 1]] < x) {
                    p[i] = result.length ? result[result.length - 1] : -1;
                    result.push(i);
                    continue;
                }
                u = 0;
                v = result.length - 1;
                while (u < v) {
                    const m = ((u + v) / 2) | 0;
                    if (arr[result[m]] < x) u = m + 1;
                    else v = m;
                }
                if (x < arr[result[u]]) {
                    if (u > 0) p[i] = result[u - 1];
                    result[u] = i;
                }
            }
            u = result.length;
            v = result[result.length - 1];
            const seq = new Array(u);
            while (u--) {
                seq[u] = v;
                v = p[v];
            }
            return seq;
        }
    }
    return new vdom();
})();