//========================================================================================
/*                                                                                      *
 * Algoritmo di 2-approssimazione per il calcolo del TSP metrico ovvero                 *
 * il problema in cui vale la disuguaglianza triangolare tra tre nodi                   *
 * del grafo.                                                                           *
 * L'algoritmo che calcola il MSP è Kruskal con UnionFind.                              *
 *                                                                                      */
//========================================================================================
import {kruskal} from "./kruskal";
import Edge from "./edge";
import Graph from "./graph";

function approx_t_tsp(graph: Graph): [Array<Edge>, number]{
    let mst: Array<Edge> = kruskal(graph); //Calcolo l'mst

    //Recupero il primo e l'ultimo nodo per creare il lato che crea il ciclo Hamiltoniano
    let firstNode = mst[0].firstNode;
    let lastNode = mst[mst.length - 1].secondNode;

    //Creo il nuovo lato
    let edge = new Edge();
    edge.createNewEdge(firstNode, lastNode, graph.weightBetween(firstNode,lastNode));

    //Aggiungo il lato per creare il ciclo
    mst.push(edge); 

    return [mst, kruskalMstTotalWeight(mst)];
}

function kruskalMstTotalWeight(mst: Array<Edge>): number{
    let totalWeight = 0;

    mst.forEach(edge => {
        totalWeight += edge.getWeight();
    });

    return totalWeight;
}

export{
    approx_t_tsp
}