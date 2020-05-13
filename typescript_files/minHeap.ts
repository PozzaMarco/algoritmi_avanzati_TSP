//========================================================================================
/*                                                                                      *
 * Classe che implementa la logica ed i metodi utilizzati per andare a gestire          *
 * la struttura dati MinHeap tramite array.                                             *
 *                                                                                      *
 * Note:                                                                                *
 * Accesso al padre: i / 2;                                                             *
 * Accesso al figlio SX: 2 * i + 1;                                                     *
 * Accesso al figlio DX: 2 * i + 2.                                                     *
 *                                                                                      */
//========================================================================================
import HeapNode from "./heapNode";

export default class MinHeap {
  heap: HeapNode[];
  areInHeap: Map<number, any> // Map nodo -> posizione nello heap

  constructor() {
    this.heap = [];
    this.areInHeap = new Map();
  }

  getMin(): HeapNode {
    return this.heap[0];
  }

  insert(node: HeapNode){
    this.heap.push(node);
    let position = this.heapifyUp(this.heap.length - 1);
    this.areInHeap.set(node.node, position);
  }

  heapifyUp(index: number): number{
    while (index > 0) {
      // finchè non raggiungo la radice
      let element = this.heap[index],
        parentIndex = Math.floor((index - 1) / 2),
        parent = this.heap[parentIndex]; //prendo il padre dell'elemento corrente

      if (parent.weight <= element.weight) break; // se il padre è minore o uguale del figlio allora non ho niente da fare

      this.areInHeap.set(this.heap[parentIndex].node, index)

      this.heap[index] = parent; // altrimenti devo fare uno swap
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
    return index;
  }

  extractMin(): HeapNode {
    let min = this.heap[0]; // salvo il minimo
    
    let lastElement = this.heap.pop();

    if(min != null) // se il minimo è null significa che l'albero è vuoto e non ho niente da fare
      this.areInHeap.delete(min.node)

    if(this.heap.length != 0){
      this.heap[0] = lastElement; // l'ultimo elemento sostituisce la radice
      this.heapifyDown(0); // trovo la posizione corretta della nuova radice nell'albero
    }
    return min;
  }

  heapifyDown(index: number) {
    let left = 2 * index + 1,
      right = 2 * index + 2,
      smallest = index;
    const length = this.heap.length;

    // se il figlio sinistro esiste ed è piu piccolo del padre
    if (left <= length && this.heap[left] && this.heap[left].weight < this.heap[smallest].weight) {
      smallest = left;
    }
    // se il figlio destro esiste ed è piu piccolo del padre
    if (right <= length && this.heap[right] && this.heap[right].weight < this.heap[smallest].weight) {
      smallest = right;
    }
    // Swap degli indici delle posizioni
    this.areInHeap.set(this.heap[smallest].node, index);
    this.areInHeap.set(this.heap[index].node, smallest);

    //Swap dei valori
    if (smallest !== index) {
      [this.heap[smallest], this.heap[index]] = [this.heap[index],this.heap[smallest]];

      this.heapifyDown(smallest);
    }
  }

  contains(node: number): boolean{
    return this.areInHeap.has(node);
  }

  update(node: number, weight: number){
    let index = this.areInHeap.get(node);

    this.heap[index].setWeight(-Infinity);
    this.heapifyUp(index);
    this.heap[0].setWeight(weight);
    this.heapifyDown(0);
}

  isEmpty(): boolean{
    return this.heap.length == 0;
  }
}
