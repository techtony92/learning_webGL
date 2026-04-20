import configureShaders from "@/configureShaders";

export default async function _002_attributes_part_1(context: WebGL2RenderingContext) {
    const glShaderInterface = await configureShaders(context, './02_attributes_part_1', 'vSource', 'fSource');
    //^----Attributes----^\\
    /**
     * * Only available in vertex shaders.
     * * Uses storage qualifiers for passing values from vertex-shader to fragment-shader
     * * These values can change for every vertex in the buffer.
     * * In WebGL 1.0 the `attribute` type qualifier was used.
     * * In WebGL 2.0+ the `attribute` type qualifier was depricated and no longer compiles.  
     * * Instead we not use the storage qualifier `in`. 
     * * The type qualifier `varying` is also depricated and instead we use the storage
     * * qualifier `out`
     * * The number of attribute you can declare in a vertex shader is limited, but each WebGLProgram guarantees at
     * * least 16, though some platforms allow for more(varies from device to device).
     * * This value can be found using "context".getParameter('context'.MAX_VERTEX_ATTRIBS);
     * * Some devices may be unable to view your app if you declare more attributes than they can support so
     * * using more than 16 is risky.
     * * The number of vertices is also limited, but its unlikely you will use anywhere near the max of about 65,536
     * ****/

    //^----Flow of the Attribute----^\\
    /***
     * * Vertex Shader                              Fragment Shader
     * *  attributes                                    varyings
     * * in vec4 aPosition;                          in vec4 vColor;
     * * in vec4 aColor.                           fragment output  
     * * out vec4 vColor;                           out vec4 fragColor;
     * * main()                                     main()
     * * {                                          {
     * *    gl_Position = aPosition;                    fragColor = vColor;
     * *    vColor = aColor;                        }
     * * }
     * * 
     * * In your vertex shader, `attributes` come *in* from your Javascript/Typescript,
     * * and `varyings` go *out* to your fragment shader
     * * In your fragment shader, `varyings` come in from your vertex shader, and the 
     * * resulting color information go out to the framebuffer and to the canvas.
     * **/
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
}