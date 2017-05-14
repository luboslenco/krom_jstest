// ./Krom_bin/macos/Krom.app/Contents/MacOS/Krom . . --nosound

var vs = `
#version 330
in vec3 pos;
void main() {
	gl_Position = vec4(pos, 1.0);
}
`;

var fs = `
#version 330
out vec4 fragColor;
void main() {
	fragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;

var vertices = [
   -1.0, -1.0, 0.0,
    1.0, -1.0, 0.0,
    0.0,  1.0, 0.0
];

var indices = [0, 1, 2];

Krom.init("KromApp", 640, 480, 0, false, 0);
Krom.setCallback(renderCallback);
Krom.setKeyboardDownCallback(keyboardDownCallback);
Krom.setKeyboardUpCallback(keyboardUpCallback);
Krom.setMouseDownCallback(mouseDownCallback);
Krom.setMouseUpCallback(mouseUpCallback);
Krom.setMouseMoveCallback(mouseMoveCallback);
// Krom.setMouseWheelCallback(mouseWheelCallback);
// Krom.setGamepadAxisCallback(gamepadAxisCallback);
// Krom.setGamepadButtonCallback(gamepadButtonCallback);
Krom.setAudioCallback(audioCallback);

var program = Krom.createProgram();
var elem = { name: "pos", data: ["Float3", 2] };
var structure0 = { elements: [elem] };
var vert = Krom.createVertexShaderFromSource(vs);
var frag = Krom.createFragmentShaderFromSource(fs);
Krom.compileProgram(program, structure0, null, null, null, 1, vert, frag, null, null, null);

var vb = Krom.createVertexBuffer(vertices.length / 3, structure0.elements, 0);
var vbData = new Float32Array(vertices.length);
for (i = 0; i < vertices.length; i++) vbData[i] = vertices[i];
Krom.setVertices(vb, vbData);

var ib = Krom.createIndexBuffer(indices.length);
Krom.setIndices(ib, indices);

function renderCallback() {
	Krom.begin(null, null);
	
	var flags = 0;
	flags |= 1; // Color
	flags |= 2; // Depth
	Krom.clear(flags, 0xff000000, 1.0, null);

	Krom.setProgram(program);
	// Krom.setCullMode(0);
	// Krom.setDepthMode(false, 0);
	Krom.setVertexBuffer(vb);
	Krom.setIndexBuffer(ib);
	Krom.drawIndexedVertices(0, -1);

	Krom.end();
}

function keyboardDownCallback(code, charCode) {}
function keyboardUpCallback(code, charCode) {}
function mouseDownCallback(button, x, y) {}
function mouseUpCallback(button, x, y) {}
function mouseMoveCallback(x, y, mx, my) {}
function mouseWheelCallback(delta) {}
function gamepadAxisCallback(gamepad, axis, value) {}
function gamepadButtonCallback(gamepad, button, value) {}
function audioCallback(samples)  {}