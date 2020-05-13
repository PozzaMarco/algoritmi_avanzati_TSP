import createGraphsFromFile from "./typescript_files/read_from_files";
import Graph from "./typescript_files/graph"
import {held_karp} from "./typescript_files/held_karp";
import {approx_t_tsp} from "./typescript_files/approx_t_tsp"
import {nearest_neighbor} from "./typescript_files/nearest_neighbor";

let x : Graph = createGraphsFromFile()[0];
console.log("HELD KARP");
console.log(held_karp(x))
console.log("APPROX TSP")
console.log(approx_t_tsp(x))
console.log("NEAREST NEIGHBOR")
console.log(nearest_neighbor(x));