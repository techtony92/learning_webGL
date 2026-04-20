import './style.css'
import 'basecoat-css/all';
import _001_uniforms from './01_uniforms';
import _002_attributes_part_1 from './02_attributes_part_1';
import _003_attributes_part_1_color from './03_attributes_part_1_color';
import _004_attributes_part_1_bind_Attrib_location from './04_attributes_part_1_bind_attrib_location';
import _005_attributes_part_1_static_locations_via_shader from './05_attributes_part_1_static_locations_via_shader';
import _006_attributes_part_1_static_color_triangle from './06_attributes_part_1_static_color_triangle';

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
const context = canvas.getContext("webgl2") as WebGL2RenderingContext;
// _001_uniforms(context);
// _002_attributes_part_1(context);
// _003_attributes_part_1_color(context);
// _004_attributes_part_1_bind_Attrib_location(context);
// _005_attributes_part_1_static_locations_via_shader(context);
_006_attributes_part_1_static_color_triangle(context);


