import './style.css'
import 'basecoat-css/all';
import vSource from "./shaders/vSource.vert";
import fSource from "./shaders/fSource.frag";


const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
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

if (!context.getProgramParameter(glShaderInterface, context.LINK_STATUS)) {
    console.log(context.getShaderInfoLog(vertexShader));
    console.log(context.getShaderInfoLog(fragmentShader));
}

context.useProgram(glShaderInterface);

// Uniform Positioning
const uPositionLocation = context.getUniformLocation(glShaderInterface, 'uPosition');
context.uniform2f(uPositionLocation, 0, -.2);

const uPointSizeLocation = context.getUniformLocation(glShaderInterface, 'uPointSize');
context.uniform1f(uPointSizeLocation, 100);

const uIndexLocation = context.getUniformLocation(glShaderInterface, 'uIndex');
context.uniform1i(uIndexLocation, 1);

const uColorsLocation = context.getUniformLocation(glShaderInterface, 'uColors');
context.uniform4fv(uColorsLocation, [
    1, 0, 0, 1,
    0, 1, 0, 1,
    0, 0, 1, 1,

]);

// Attribute Positioning

// Get Attribute Locations 
const aPositionLocation = context.getAttribLocation(glShaderInterface, 'aPosition');
const aPointSizeLocation = context.getAttribLocation(glShaderInterface, 'aPointSize');
console.log(aPositionLocation, aPointSizeLocation);


// Enable Vertex Attributes
context.enableVertexAttribArray(aPointSizeLocation);
context.enableVertexAttribArray(aPositionLocation);


//^----BufferData----^\\ 
/**
 * * Total values: X,Y,Size = 3
 * * Datatype: Float32Array
 * * DateType Byte value: Float = 4
 * * In The context of webGL/GLSL, think of bufferdata as rows and columns
 * * each column holds a specific value that maps to a GLSL attribute value requirement
 * * [X, Y, Size] {
 *      *X , Y = aPositionLocation (position data, X,Y coords) X,Y are columns;
 *      *Size = aPositionSizeLocation (position Size Data, Size(width & height)) is a column; 
 * * }
 * * All columns create a row,
 * * Each row makes a desired shape/graphic
 * * The stride is (Total number of values in a row(3) * the ARRAYS PRIMITIVE BYTE type (4)) = 3*4
 * *
 * **/
const bufferData = new Float32Array([
    0, 0, 100,
    .5, -.8, 32,
    -.9, .5, 50,
]);
const buffer = context.createBuffer();
context.bindBuffer(context.ARRAY_BUFFER, buffer);
context.bufferData(context.ARRAY_BUFFER, bufferData, context.STATIC_DRAW);

//^----vertexAttribPointer----^\\
/**
 *  * Tells WebGL how to unravel our data in JS 
 *  * Attributes are always float based values or objects made of floats(like vects and matricies),
 *  *       - simple declarations
 *  *       - floats of made of floats
 *  * JS Mainly deals with integers 
 *  *       - chin of interleaving values
 *  *       - different datatypes
 *  *       - including 8- and 16-bit integers
 *  
 * 
 *  *@param index: The Attribute itself
 *  *@param size: total number of coords inside bufferData; X & Y so 2
 *  *@param type: Type of data: Float
 *  *@param normalized: normally false*
 *  *@param stride: 
 *          * The stride is the number of 'BYTES' in each SET of vertex data
 *          * buffer data contains 3 floats: 0,0, 100 AS X,Y,Size = 3
 *          * Each float contains 4 Bytes = 3 * 4
 *  *@param offset: index of the attribute in the set * the number of BYTES in the DataType(float)
 *          *  X, Y, 100 
 *          *  0, 1,  2
 *  * The Float32Array maps JS values to values that attributes require.IE
 *  * [x,y] = coords, aPositionLocation is a vec2
 *  * [100] = size, aPositionSizeLocation is a float
 *  * [x,y,size] 3 * each values number of type; float32Array is a float type 
 *      * which has 4 byes per value so ( stride = number of values * Bytes in said type
 * **/
context.vertexAttribPointer(aPositionLocation, 2, context.FLOAT, false, 3 * 4, 0);
context.vertexAttribPointer(aPointSizeLocation, 1, context.FLOAT, false, 3 * 4, 2 * 4);
context.drawArrays(context.POINTS, 0, 3);