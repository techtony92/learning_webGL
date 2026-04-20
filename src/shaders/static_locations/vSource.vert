#version 300 es

uniform float uPointSize;
uniform vec2 uPosition; 
in float aPointSize;
in vec2 aPosition;
in vec3 aColor;

out vec3 vColor;
void main(){
    vColor = aColor;
    gl_PointSize = aPointSize;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
