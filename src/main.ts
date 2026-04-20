import './style.css'
import 'basecoat-css/all';
import _001_uniforms from './01_uniforms';
import _002_attributes_part_1 from './02_attributes_part_1';
import _003_attributes_part_2_color from './03_attributes_part_2_color';
const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
const context = canvas.getContext("webgl2") as WebGL2RenderingContext;
// _001_uniforms(context);
// _002_attributes_part_1(context);
_003_attributes_part_2_color(context);





