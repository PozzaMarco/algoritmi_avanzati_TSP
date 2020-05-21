//========================================================================================
/*                                                                                      *
 * Implementazione dell'algoritmo esatto di Held e Karp per il calcolo del TSP ottimo.  *
 * Siccome è un algoritmo esponenziale il tutto deve essere eseguito per un certo       *
 * numero di iterazioni o di minuti passati i quali ritorna o la soluzione ottima       *
 * o la soluzione migliore trovata in quel momento.                                     *
 *                                                                                      */
//========================================================================================
import Graph from "./graph";
import {performance} from "perf_hooks";

function held_karp(graph: Graph){
    let d: Map<string, number> = new Map(); // d[v, S] è il peso del cammino che parte da 1, termina in v passando per tutti i nodi di 
    let pi: Map<string, number> = new Map(); // pi[v, S] è il predecessore di v nel cammino minimo che parte da 1, termina in v, passando per tutti i nodi di S
    let nodes: Set<number> = new Set();

    for(let node = 1; node <= graph.getNumberOfNodes(); node++)
        nodes.add(node);

    let startingTime = performance.now();
    return [held_karp_visit(1, nodes, graph.getAdjacencyMatrix(), d, pi, startingTime), performance.now() - startingTime];
}

function held_karp_visit(currentNode: number, nodeList: Set<number>, adjMatrix: number[][], d: Map<String, number>, pi: Map<string, number>, startingTime: number): number{
    if(containsOnly(nodeList, currentNode)) //se ho solamente currentNode ritorno il suo peso
        return adjMatrix[1][currentNode];

    else if (d.has(currentNode +",["+Array.from(nodeList.values()).toString() +"]"))//se ho già visitato currentNode passando per nodeList ritorno il valore calcolato
        return d.get(currentNode +",["+Array.from(nodeList.values()).toString() +"]");
    else{
        let minDist = Infinity;
        let minPrec = null;
        let nodeListCopy = new Set(nodeList);//creo una copia di nodeList dalla quale rimuovere currentNode
        nodeListCopy.delete(currentNode);

        for(let node of Array.from(nodeListCopy.values())){
            if(performance.now() - startingTime < 200000){//Timer che limita le iterazioni a circa 3 minuti
                let dist = held_karp_visit(node, nodeListCopy, adjMatrix, d, pi, startingTime);

                if(dist + adjMatrix[currentNode][node] < minDist){
                    minDist = dist + adjMatrix[currentNode][node];
                    minPrec = node;
                }
            }
            else//se il timer è scaduto ritorno la distanza minima calcolata fin ad ora
                return minDist;
        }

        d.set(currentNode +",["+Array.from(nodeList.values()).toString() +"]", minDist);
        pi.set(currentNode +",["+Array.from(nodeList.values()).toString() +"]", minPrec);
        return minDist;
    }
}

function containsOnly(nodeList: Set<Number>, currentNode: number): boolean{
    if(nodeList.size == 1 && nodeList.has(currentNode))
        return true;
    else
        return false
}
export{
    held_karp
}

