import createGraphsFromFile from "./typescript_files/read_from_files";
import Graph from "./typescript_files/graph"
import {held_karp} from "./typescript_files/held_karp";
import {approx_t_tsp} from "./typescript_files/approx_t_tsp"
let x : Graph = createGraphsFromFile()[0];

console.log(held_karp(x))
console.log(approx_t_tsp(x))