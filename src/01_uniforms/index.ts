import configureShaders from "@/configureShaders";
export default async function _001_uniforms(context: WebGL2RenderingContext) {

    const glShaderInterface = await configureShaders(context, './01_uniforms', 'vSource', 'fSource');


    //^?----Uniform Positioning----\\ 
    const uPositionLocation = context.getUniformLocation(glShaderInterface, 'uPosition');
    context.uniform2f(uPositionLocation, 0, -.2);

    const uPointSizeLocation = context.getUniformLocation(glShaderInterface, 'uPointSize');
    context.uniform1f(uPointSizeLocation, 100);

    // //^?----Colors:Uniforms----?^\\
    // /***
    //  * * To modify color data, we need to modify values inside the fragment shader
    //  * * we can specify colors from JS or inside the fragment shader.
    //  * * Attributes are not available inside fragment shaders, only vertex shaders.
    //  * * As such, we can either use uniforms for color data, or attributes, with 
    //  * * storage modifiers
    //  *  * We don't need to use storage qualifiers for uniforms, only attributes
    //  * **/
    const uIndexLocation = context.getUniformLocation(glShaderInterface, 'uIndex');
    context.uniform1i(uIndexLocation, 1);

    const uColorsLocation = context.getUniformLocation(glShaderInterface, 'uColors');
    context.uniform4fv(uColorsLocation, [
        1, 0, 0, 1,
        0, 1, 0, 1,
        0, 0, 1, 1,

    ]);

    context.drawArrays(context.POINTS, 0, 3);
}