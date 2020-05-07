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

export default class Graph{
    name: string;
    description: string;
    type: string;
    edgeWeightType: string;
    displayDataType: string;
    numberOfNode: number;
    
    adjacencyMatrix: number[][]; //Matrice di adiacenza che descrive le distanze tra nodi
    nodeList: Array<GraphNode>; //Lista di nodi del grafo

    constructor(){
        this.name = this.description = this.type = this.edgeWeightType = this.displayDataType = "";
        this.numberOfNode = 0;
        this.adjacencyMatrix = [];
        this.nodeList = new Array();
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

    addNewNode(id: string, x_coord: string, y_coord: string){
        this.nodeList.push(new GraphNode(id, x_coord, y_coord));
    }

    computeDistanceEUC(firstNode: GraphNode, secondNode: GraphNode): number{
        let firstValue = Math.pow(firstNode.getXCoord() - secondNode.getXCoord(), 2);
        let secondValue = Math.pow(firstNode.getYCoord() - secondNode.getYCoord(), 2);

        return Math.sqrt(firstValue + secondValue);
    }

    createAdjacencyMatrix(){
        if(this.edgeWeightType == "EUC_2D"){
            this.nodeList.forEach(firstNode => {
                this.adjacencyMatrix[firstNode.getNodeId()] = [];

                this.nodeList.forEach(secondNode =>{
                    let distance = this.computeDistanceEUC(firstNode, secondNode);
                    this.adjacencyMatrix[firstNode.getNodeId()][secondNode.getNodeId()] = distance;
                })
            });
        }
        else{
            //TODO
        }
    }

    createFromFile(graphDescriptionFile: string){
        graphDescriptionFile = graphDescriptionFile.split("EOF")[0];
        let graphDescription = graphDescriptionFile.split("NODE_COORD_SECTION")[0].split("\n").filter(Boolean);
        let coordinatesDescription = graphDescriptionFile.split("NODE_COORD_SECTION")[1].split("\n").filter(Boolean);

        this.name = graphDescription[0].split(": ")[1];
        this.type = graphDescription[1].split(": ")[1];
        this.description = graphDescription[2].split(": ")[1];
        this.numberOfNode = parseInt(graphDescription[3].split(": ")[1]);
        this.edgeWeightType = graphDescription[4].split(": ")[1];
        this.displayDataType = graphDescription[5].split(": ")[1];

        coordinatesDescription.forEach(coordinate => {
            let id = coordinate.split(" ")[0];
            let x_coord = coordinate.split(" ")[1];
            let y_coord = coordinate.split(" ")[2];

            this.addNewNode(id, x_coord, y_coord);
        });
        this.createAdjacencyMatrix()
    }

}
/**
 * TODO:
 * Distanza euclidea tra due punti EUC_2D: 
 * P(px,py) e Q(qx, qy) due punti allora la distanza è
 * RadiceQuadra([px - qx]^2 + [py - qy]^2)
 * 
 * Riferimenti: https://it.wikipedia.org/wiki/Distanza_euclidea
 * TODO:
 * Distanza euclidea tra due punti GEO:
 * http://comopt.ifi.uni-heidelberg.de/software/TSPLIB95/TSPFAQ.html
 */