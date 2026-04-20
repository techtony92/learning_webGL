#version 300 es

precision mediump float;
// uniform int uIndex;
in vec3 vColor;

// uniform vec4 uColors[3];
out vec4 fragColor;

void main(){
    //fragColor = vec4(1.0,0.0,0.0, 1.0);
    fragColor = vec4(vColor, 1.0);
}
