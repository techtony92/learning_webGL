#version 300 es

precision mediump float;
uniform int uIndex;


uniform vec4 uColors[3];
out vec4 fragColor;

void main(){
    //fragColor = vec4(1.0,0.0,0.0, 1.0);
    fragColor = uColors[uIndex];
}