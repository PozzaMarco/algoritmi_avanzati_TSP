import Graph from "./graph";
import MinHeap from "./minHeap";
import HeapNode from "./heapNode";

function initialization(graph: Graph): any{
    let key: number[] = [];
    let parents: number[] = [];
    
    for(let node = 1; node <= graph.getNumberOfNodes(); node++){
        key[node] = Infinity;
        parents[node] = null;
    }
    return [key, parents]
}

function createPriorityQueue(graph: Graph, key: number[]): MinHeap{
    let minHeap = new MinHeap();

    for(let node = 1; node <= graph.getNumberOfNodes(); node++){
        minHeap.insert(new HeapNode(node, key[node]));
    }

    return minHeap;
}

function prim(graph: Graph, startingNode: number): any{
    let key: number[];// Peso minimo di un qualsiasi lato che connette un nodo all'albero
    let parents: number[];// Rappresenta il padre del nodo nell'albero
    
    [key, parents] = initialization(graph);
    key[startingNode] = 0;

    let priorityQueue = createPriorityQueue(graph, key);
    
    while(!priorityQueue.isEmpty()){
        let current = priorityQueue.extractMin();

        for(let adjNode = 1; adjNode <= graph.getNumberOfNodes(); adjNode++){
            if(priorityQueue.contains(adjNode) && graph.weightBetween(current.getNode(), adjNode) < key[adjNode]){
                parents[adjNode] = current.getNode();
                key[adjNode] = graph.weightBetween(current.getNode(), adjNode);
                priorityQueue.update(adjNode, key[adjNode]);
            }
        }
    }
    return [key, parents]
}

export default prim;