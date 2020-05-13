//========================================================================================
/*                                                                                      *
 * Implementazione dell'euristica costruttiva Nearest Neighbor per il calcolo           *
 * del TSP ottimo.                                                                      *
 * L'approssimazione è log(n).                                                          *
 *                                                                                      */
//========================================================================================
import Graph from "./graph";
import {performance} from "perf_hooks";

function nearest_neighbor(graph: Graph): [number, number]{
    let startingTime = performance.now();
    let nodeSet = new Set<number>();

    for(let node = 1; node <= graph.getNumberOfNodes(); node++)
        nodeSet.add(node);

    nodeSet.delete(1);

    //ritorna il peso del cammino che va dal primo nodo all'ultimo e qual'è quest'ultimo visitato
    let [minWeight, lastVisited] = nearest_neighbor_visit(1, nodeSet, graph.getAdjacencyMatrix());

    //aggiungo il peso dell'arco che connette l'ultimo nodo al primo cosi da formare un ciclo
    minWeight += graph.weightBetween(1, lastVisited); 

    return [minWeight, performance.now() - startingTime]
}

function nearest_neighbor_visit(currentNode: number, nodeSet: Set<number>, weight: number[][]): [number, number] {
    if(nodeSet.size == 1){
        let last = nodeSet.values().next().value;
        return [weight[currentNode][last], last];
    }
    else{
        let minWeight = Infinity;
        let minNode = null;
        let nn_weight = 0;
        let lastNode = 0;

        //trovo il nodo con peso minimo che parte da currentNode
        nodeSet.forEach(node => {
            if(weight[currentNode][node] < minWeight){
                minWeight = weight[currentNode][node];
                minNode = node;
            }
        });
        nodeSet.delete(minNode);
        [nn_weight, lastNode] = nearest_neighbor_visit(minNode, nodeSet, weight);

        return [minWeight + nn_weight, lastNode];
    }
} 

export{
    nearest_neighbor
}