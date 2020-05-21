//========================================================================================
/*                                                                                      *
 * Algoritmo di 2-approssimazione per il calcolo del TSP metrico ovvero                 *
 * il problema in cui vale la disuguaglianza triangolare tra tre nodi                   *
 * del grafo.                                                                           *
 * L'algoritmo che calcola il MSP è Prim.                                               *
 *                                                                                      */
//========================================================================================
import Graph from "./graph";
import {performance} from "perf_hooks";
import prim from "./prim";

function approx_t_tsp(graph: Graph): [number, number]{
    let startingTime = performance.now();
    let preorderList: number[] = [];

    let [key, parents]= prim(graph, 1); //Calcolo l'mst

    //genero la lista di nodi visitata in ordine preorder e la salvo in preorderList
    preorderVisit(getRoot(parents),parents, preorderList);

    return [preorderWeight(preorderList, graph.getAdjacencyMatrix()), performance.now() - startingTime];
}

//Recupero la radice del MST
function getRoot(parents: number[]): number{
    for (let node = 1; node <= parents.length; node++)
        if(parents[node] == null) // se non ha padri significa che è la radice
            return node;
}

//Calcolo il peso totale dell'albero visitato tramite visita preorder
function preorderWeight(preorderList: number[], weights: number[][]): number{
    let totalWeight = 0;

    for(let index = 0; index < preorderList.length - 1; index++)
        totalWeight += weights[preorderList[index]][preorderList[index+1]]

    // aggiungo il peso che connette l'ultimo nodo con il primo in modo da creare il ciclo Hamiltoniano
    totalWeight += weights[preorderList[preorderList.length-1]][preorderList[0]]

    return totalWeight;
}

/*
    Visita preorder del MST.
    currentNode: nodo corrente che sto visitando (all'inizio è la root);
    parentList: lista che contiene, per ogni nodo, chi è suo padre
    preorderList: lista che contiene i nodi visitati in ordine preorder
*/
function preorderVisit(currentNode: number, parentList: number[], preorderList: number[]){
    preorderList.push(currentNode);//inserisco il nodo che sto visitando

    let children = getChildren(currentNode, parentList); //recupero i figli di currentNode

    if(children.length != 0){ // se ha dei figli significa che non è un nodo foglia
        children.forEach(child => {
            preorderVisit(child, parentList,preorderList);
        });
    }
}

/**
 * parent: nodo del quale voglio recuperare i figli
 * parentList: array che contiene i padri. parentList[n] rappresenta il padre del nodo "n" nell'albero
 */
function getChildren(parent: number, parentList: number[]): number[]{
    let children = [];

    for(let node = 1; node <= parentList.length; node++)
        if(parentList[node]  == parent)//ho trovato un figlio di parent
            children.push(node);

    return children;
}

export{
    approx_t_tsp
}