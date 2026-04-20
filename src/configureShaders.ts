
export default async function configureShaders(context: WebGL2RenderingContext, basePath: string, vertexShaderPath: string, fragmentShaderPath: string): Promise<WebGLProgram> {
    const vShaderModule = await import(`${basePath}/${vertexShaderPath}.vert`);
    const fShaderModule = await import(`${basePath}/${fragmentShaderPath}.frag`);
    const vSource = vShaderModule.default;
    const fSource = fShaderModule.default;
    console.log(vShaderModule);
    console.log(fShaderModule);
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
    return glShaderInterface;
}