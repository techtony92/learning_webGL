import './style.css'
import 'basecoat-css/all';
import vSource from "./shaders/vSource.vert";
import fSource from "./shaders/fSource.frag";


const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const context = canvas.getContext("webgl2") as WebGL2RenderingContext;

const glShaderInterface = context.createProgram();
const vertexShader = context.createShader(context.VERTEX_SHADER) as WebGLShader;
context.shaderSource(vertexShader, vSource);
context.compileShader(vertexShader);
context.attachShader(glShaderInterface, vertexShader);

const fragmentShader = context.createShader(context.FRAGMENT_SHADER) as WebGLShader;
context.shaderSource(fragmentShader, fSource);
context.compileShader(fragmentShader);
context.attachShader(glShaderInterface, fragmentShader);

context.linkProgram(glShaderInterface);
context.useProgram(glShaderInterface);
context.drawArrays(context.POINTS, 0, 1);