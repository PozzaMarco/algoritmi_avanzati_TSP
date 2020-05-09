//========================================================================================
/*                                                                                      *
 * Classe utilizzata per rappresentare un nodo del grafo nello heap.                    *
 * Sarà composto da:                                                                    *
 * - valore del nodo;                                                                   *
 * - valore della key ( ovvero il peso minimo del lato che connette il nodo all'albero )*
 *                                                                                      */
//========================================================================================

export default class HeapNode{
    node: number;
    weight: number;

    constructor(node: number, weight: number){
        this.node = node;
        this.weight = weight;
    }

    getNode(): number{
        return this.node;
    }

    getWeight(): number{
        return this.weight;
    }

    setNode(node: number){
        this.node = node;
    }

    setWeight(weight: number){
        this.weight = weight;
    }
}