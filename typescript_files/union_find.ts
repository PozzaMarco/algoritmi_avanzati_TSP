//========================================================================================
/*                                                                                      *
 * Classe che rappresenta la struttura dati Union-Find.                                 *
 * Viene implementata come un Array numerico in cui gli indici sono i nodi,             *
 * i valori sono i padri del nodo indice e la coppia nodo-padre rappresenta il lato.    *
 * Viene inserito anche un campo size che mantiene la grandezza dei sottoalberi.        *
 *                                                                                      */
//========================================================================================

export default class UnionFind {
  union_find: Array<number>;
  sub_tree_size: Array<number>;

  constructor() {
    this.union_find = new Array<number>();
    this.sub_tree_size = new Array<number>();
  }

  initialization(numberOfNodes: number) {
    for (let i = 0; i <= numberOfNodes; i++) {
      this.union_find[i] = i;
      this.sub_tree_size[i] = 1;
    }
  }

  getParent(node: number): number {
    return this.union_find[node];
  }

  getSize(node: number): number {
    return this.sub_tree_size[node];
  }

  setParent(node: number, parent: number) {
    this.union_find[node] = parent;
  }

  setSize(firstNode: number, secondNode: number) {
    this.sub_tree_size[firstNode] =
      this.getSize(firstNode) + this.getSize(secondNode);
  }

  find(node: number): number {
    if (this.getParent(node) == undefined) return NaN;
    if (this.getParent(node) == node) return node;

    return this.find(this.getParent(node));
  }

  union(firstNode: number, secondNode: number) {
    let firstNodeSet = this.find(firstNode);
    let secondNodeSet = this.find(secondNode);

    if (firstNodeSet != secondNodeSet) {
      if (this.getSize(firstNodeSet) >= this.getSize(secondNodeSet)) {
        this.setParent(secondNodeSet, firstNodeSet);
        this.setSize(firstNodeSet, secondNodeSet);
      } else {
        this.setParent(firstNodeSet, secondNodeSet);
        this.setSize(secondNodeSet, firstNodeSet);
      }
    }
  }

  printUnionFind() {
    this.union_find.forEach((parent, node) => {
      console.log("Node: " + node);
      console.log("Parent: " + parent);
      console.log("Size: " + this.sub_tree_size[node]);
      console.log("--------------");
    });
  }
}
