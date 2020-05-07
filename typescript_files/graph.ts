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