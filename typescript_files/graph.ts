//========================================================================================
/*                                                                                      *
 * Classe che descrive un grafo.                                                        *
 * Siccome stiamo utilizzando grafi completi il tutto verrà                             *
 * rappresentanto con una matrice di adiacenza di dimensione NxN                        *
 * dove N è il numero di nodi del grafo.                                                *
 * Altre informazioni che vengono mantenute sono:                                       *
 * -- nome del grafo;                                                                   *
 * -- descrizione;                                                                      *
 * -- tipologia;                                                                        *
 * -- dimensione;                                                                       *
 * -- edge weight type;                                                                 *
 *                                                                                      */
//========================================================================================
import GraphNode from "./graphNode";
import Edge from "./edge";

export default class Graph{
    name: string;
    description: string;
    type: string;
    edgeWeightType: string;
    displayDataType: string;
    numberOfNode: number;
    
    adjacencyMatrix: number[][]; //Matrice di adiacenza che descrive le distanze tra nodi
    nodeList: Array<GraphNode>; //Lista di nodi del grafo
    edgeList: Array<Edge>; //Lista di lati del grafo usata in Kruskal

    constructor(){
        this.name = this.description = this.type = this.edgeWeightType = this.displayDataType = "";
        this.numberOfNode = 0;
        this.adjacencyMatrix = [];
        this.nodeList = new Array();
        this.edgeList = new Array();
    }
    
    getName(): string{
        return this.name;
    }
    setName(name: string){
        this.name = name;
    }

    getDescription(): string{
        return this.description;
    }
    setDescription(description: string){
        this.description = description;
    }

    getType(): string{
        return this.type;
    }
    setType(type: string){
        this.type = type;
    }

    getEdgeWeightType(): string{
        return this.edgeWeightType;
    }
    setEdgeWeightType(edgeWeightType: string){
        this.edgeWeightType = edgeWeightType;
    }

    getDisplayDataType(): string{
        return this.displayDataType;
    }
    setDisplayDataType(displayDataType: string){
        this.displayDataType = displayDataType;
    }

    getNumberOfNodes(): number{
        return this.numberOfNode;
    }    
    setNumberOfNodes(numberOfNode: number){
        this.numberOfNode = numberOfNode;
    }

    getAdjacencyMatrix(): number[][]{
        return this.adjacencyMatrix;
    }

    getNodeList(): Array<GraphNode>{
        return this.nodeList;
    }

    getEdgeList(): Array<Edge>{
        return this.edgeList;
    }

    addNewNode(id: number, x_coord: number, y_coord: number){
        this.nodeList.push(new GraphNode(id, x_coord, y_coord));
    }

    computeDistanceEUC(firstNode: GraphNode, secondNode: GraphNode): number{
        let firstValue = Math.pow(firstNode.getXCoord() - secondNode.getXCoord(), 2);
        let secondValue = Math.pow(firstNode.getYCoord() - secondNode.getYCoord(), 2);

        return Math.sqrt(firstValue + secondValue);
    }

    computeDistanceGEO(firstNode: GraphNode, secondNode: GraphNode): number{
       let PI = 3.141592;
       let idealRadius = 6378.388;

       let firstLatitude = PI * (Math.trunc(firstNode.getXCoord()) + 5.0 * firstNode.getXCoord() - Math.trunc(firstNode.getXCoord()) / 3.0) / 180.0;
       let secondLatitude = PI * (Math.trunc(secondNode.getXCoord()) + 5.0 * secondNode.getXCoord() - Math.trunc(secondNode.getXCoord()) / 3.0) / 180.0;
       let firstLongitude = PI * (Math.trunc(firstNode.getYCoord()) + 5.0 * firstNode.getYCoord() - Math.trunc(firstNode.getYCoord()) / 3.0) / 180.0;
       let secondLongitude = PI * (Math.trunc(secondNode.getYCoord()) + 5.0 * secondNode.getYCoord() - Math.trunc(secondNode.getYCoord()) / 3.0) / 180.0;

       let longitude = Math.cos(firstLongitude - secondLongitude);
       let latitude = Math.cos(firstLatitude - secondLatitude);
       let latitude2 = Math.cos(firstLatitude + secondLatitude);

       return Math.trunc(idealRadius * Math.acos(0.5 * ((1 + longitude) * latitude - (1 - longitude)*latitude2)) + 1);
    }

    createAdjacencyMatrix(){
        if(this.edgeWeightType == "EUC_2D"){
            this.nodeList.forEach(firstNode => {
                this.adjacencyMatrix[firstNode.getNodeId()] = [];

                this.nodeList.forEach(secondNode =>{
                    let distance = this.computeDistanceEUC(firstNode, secondNode);
                    this.adjacencyMatrix[firstNode.getNodeId()][secondNode.getNodeId()] = Math.round(distance);
                })
            });
        }
        else{
            this.nodeList.forEach(firstNode => {
                this.adjacencyMatrix[firstNode.getNodeId()] = [];

                this.nodeList.forEach(secondNode =>{
                    let distance = this.computeDistanceGEO(firstNode, secondNode);
                    this.adjacencyMatrix[firstNode.getNodeId()][secondNode.getNodeId()] = distance;
                })
            });
        }
    }

    createFromFile(graphDescriptionFile: string){
        graphDescriptionFile = graphDescriptionFile.split("EOF")[0];
        //Prima parte in cui ho la descrizione del grafo
        let graphDescription = graphDescriptionFile.split("NODE_COORD_SECTION")[0].split("\n").filter(Boolean);
        //Seconda parte in cui ho i nodi
        let coordinatesDescription = graphDescriptionFile.split("NODE_COORD_SECTION")[1].split("\n").filter(Boolean);

        this.name = graphDescription[0].split(": ")[1];
        this.type = graphDescription[1].split(": ")[1];
        this.description = graphDescription[2].split(": ")[1];
        this.numberOfNode = parseInt(graphDescription[3].split(": ")[1]);
        this.edgeWeightType = graphDescription[4].split(": ")[1];
        this.displayDataType = graphDescription[5].split(": ")[1];

        coordinatesDescription.forEach(coordinate => {
            let id = parseInt(coordinate.split(" ")[0]);
            let x_coord = parseInt(coordinate.split(" ")[1]);
            let y_coord = parseInt(coordinate.split(" ")[2]);

            this.addNewNode(id, x_coord, y_coord);
        });
        this.createAdjacencyMatrix();
        this.createEdgeList();
    }

    createEdgeList(){
        //creo la lista di lati prendendo i valori dal triangolo superiore della 
        //matrice di adiacenza in modo da evitare lati duplicati

        for(let node = 1; node <= this.numberOfNode; node++)
            for(let index = 1; index <= this.numberOfNode; index++)
                if(index >= node){
                    let edge = new Edge();
                    edge.createNewEdge(node, index, this.adjacencyMatrix[node][index]);
                    this.edgeList.push(edge);
                }
    }

    getSortedWeights(): Array<Edge> {
        return this.edgeList.sort(//Ordino l'array di lati usando i pesi
          (a: Edge, b: Edge) => a.getWeight() - b.getWeight()
        );
    }

    weightBetween(firstNodeId: number, secondNodeId: number){
        return this.adjacencyMatrix[firstNodeId][secondNodeId];
    }

}