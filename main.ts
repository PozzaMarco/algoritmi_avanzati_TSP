import fs from "fs";
import createGraphsFromFile from "./typescript_files/read_from_files";
import {held_karp} from "./typescript_files/held_karp";
import {approx_t_tsp} from "./typescript_files/approx_t_tsp"
import {nearest_neighbor} from "./typescript_files/nearest_neighbor";

let graphList = createGraphsFromFile();
let fileName = "TSP"
writeOnFile(fileName+"_approx", "[NOME GRAFO] ---- [PESO TOTALE] ---- [TEMPO]");
writeOnFile(fileName+"_nearest_neighbor", "[NOME GRAFO] ---- [PESTO TOTALE] ---- [TEMPO]");
writeOnFile(fileName+"_held_karp", "[NOME GRAFO] ---- [PESO TOTALE] ---- [TEMPO]");

//──── Approx_t_TSP con Kruskal UnionFind ────────────────────────────────────────────────
for(let index = 0; index < graphList.length; index++){
    let tsp_weight;
    let elapsedTime;
    let graph = graphList[index];
    [tsp_weight, elapsedTime] = approx_t_tsp(graph);
    writeOnFile(fileName+"_approx", graph.getName() + " - " + tsp_weight + " - " + elapsedTime);
}
//──── Nearest Neighbor ────────────────────────────────────────────────────────────────── 
for(let index = 0; index < graphList.length; index++){
    let tsp_weight;
    let elapsedTime;
    let graph = graphList[index];
    [tsp_weight, elapsedTime] = nearest_neighbor(graph);
    writeOnFile(fileName+"_nearest_neighbor", graph.getName() + " - " + tsp_weight +" - " + elapsedTime);
}
//──── Held-Karp ─────────────────────────────────────────────────────────────────────────
for(let index = 0; index < graphList.length; index++){
    let tsp_weight;
    let elapsedTime;
    let graph = graphList[index];
    [tsp_weight, elapsedTime] = held_karp(graph);
    writeOnFile(fileName+"_held_karp", graph.getName() + " - " + tsp_weight + " - " + elapsedTime);
}

async function writeOnFile(fileName: string, text: string){
    await fs.appendFile(fileName+".txt", text+"\r\n", function(err) {
        if (err)
            return console.error(err);  
    });
}