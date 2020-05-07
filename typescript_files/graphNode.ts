//========================================================================================
/*                                                                                      *
 * Classe che descrive un nodo del grafo.                                               *
 * Questo contiene varie informazioni come:                                             *
 * -- ID univoco;                                                                       *
 * -- coordinata X;                                                                     *
 * -- coordinata Y.                                                                     *
 *                                                                                      */
//========================================================================================
export default class GraphNode{
    id: number;
    x_coord: number;
    y_coord: number;

    constructor(id: number, x_coord: number, y_coord: number){
        this.id = id;
        this.x_coord = x_coord;
        this.y_coord = y_coord;
    }

    getNodeId(): number{
        return this.id;
    }

    getXCoord(): number{
        return this.x_coord;
    }

    getYCoord(): number{
        return this.y_coord;
    }
}