//========================================================================================
/*                                                                                      *
 * Implementazione dell'algoritmo esatto di Held e Karp per il calcolo del TSP ottimo.  *
 * Siccome è un algoritmo esponenziale il tutto deve essere eseguito per un certo       *
 * numero di iterazioni o di minuti passati i quali ritorna o la soluzione ottima       *
 * o la soluzione migliore trovata in quel momento.                                     *
 *                                                                                      */
//========================================================================================
import Graph from "./graph";

function held_karp(graph: Graph){
    let d: Map<string, number> = new Map(); // d[v, S] è il peso del cammino che parte da 1, termina in v passando per tutti i nodi di 
    let pi: Map<string, number> = new Map(); // pi[v, S] è il predecessore di v nel cammino minimo che parte da 1, termina in v, passando per tutti i nodi di S
    let nodes: Set<number>;

    for(let node = 1; node <= graph.getNumberOfNodes(); node++)
        nodes.add(node);

    return held_karp_visit(1, nodes, graph.getAdjacencyMatrix(), d, pi, performance.now());
}

function held_karp_visit(currentNode: number, nodeList: Set<number>, adjMatrix: number[][], d: Map<String, number>, pi: Map<string, number>, startingTime: number): number{
    if(containsOnly(nodeList, currentNode))
        return adjMatrix[1][currentNode];
    else if (d.has(currentNode.toString+"_"+nodeList.toString))
        return d.get(currentNode.toString+"_"+nodeList.toString);
    else{
        let minDist = Infinity;
        let minPrec = null;
        let nodeListCopy = new Set(nodeList);
        nodeListCopy.delete(currentNode);

        for(let node of Array.from(nodeListCopy.values())){
            let dist;
            if(performance.now() - startingTime < 900000) // controllo che siano passati meno di 15 minuti dall'inizio dell'esecuzione
                dist = held_karp_visit(node, nodeListCopy, adjMatrix, d, pi, startingTime);
            else
                return minDist;

            if(dist + adjMatrix[currentNode][node] < minDist){
                minDist = dist + adjMatrix[currentNode][node];
                minPrec = node;
            }
        }

        d.set(currentNode.toString+"_"+nodeList.toString, minDist);
        pi.set(currentNode.toString+"_"+nodeList.toString, minPrec);
        return minDist;
    }
}

function containsOnly(nodeList: Set<Number>, currentNode: number): boolean{
    return nodeList.size == 1 && nodeList.has(currentNode) ? true : false;
}
export{
    held_karp
}