#version 300 es


in mediump float aPointSize;
in mediump vec2 aPosition; 
in mediump vec3 aColor;
out vec3 vColor;
void main(){
    vColor = aColor;
    gl_PointSize = aPointSize;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
