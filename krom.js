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
Krom.setDropFilesCallback(dropFilesCallback);
Krom.setKeyboardDownCallback(keyboardDownCallback);
Krom.setKeyboardUpCallback(keyboardUpCallback);
Krom.setKeyboardPressCallback(keyboardPressCallback);
Krom.setMouseDownCallback(mouseDownCallback);
Krom.setMouseUpCallback(mouseUpCallback);
Krom.setMouseMoveCallback(mouseMoveCallback);
Krom.setMouseWheelCallback(mouseWheelCallback);
Krom.setGamepadAxisCallback(gamepadAxisCallback);
Krom.setGamepadButtonCallback(gamepadButtonCallback);
Krom.setAudioCallback(audioCallback);

var pipeline = Krom.createPipeline();
var elem = { name: "pos", data: ["Float3", 2] };
var structure0 = { elements: [elem] };
var vert = Krom.createVertexShaderFromSource(vs);
var frag = Krom.createFragmentShaderFromSource(fs);
Krom.compilePipeline(pipeline, structure0, null, null, null, 1, vert, frag, null, null, null, {
	interleavedLayout: true,
	cullMode: 0,
	depthWrite: true,
	depthMode: 0,
	stencilMode: 0,
	stencilBothPass: 0,
	stencilDepthFail: 0,
	stencilFail: 0,
	stencilReferenceValue: 0,
	stencilReadMask: 0,
	stencilWriteMask: 0,
	blendSource: 0,
	blendDestination: 0,
	alphaBlendSource: 0,
	alphaBlendDestination: 0,
	colorWriteMaskRed: true,
	colorWriteMaskGreen: true,
	colorWriteMaskBlue: true,
	colorWriteMaskAlpha: true,
	conservativeRasterization: false
});

var vb = Krom.createVertexBuffer(vertices.length / 3, structure0.elements, 0);
var vbData = new Float32Array(vertices.length);
for (i = 0; i < vertices.length; i++) vbData[i] = vertices[i];
Krom.setVertices(vb, vbData);

var ib = Krom.createIndexBuffer(indices.length);
var ibData = new Uint32Array(indices.length);
for (i = 0; i < indices.length; i++) ibData[i] = indices[i];
Krom.setIndices(ib, ibData);

function renderCallback() {
	Krom.begin(null, null);
	
	var flags = 0;
	flags |= 1; // Color
	flags |= 2; // Depth
	Krom.clear(flags, 0xff000000, 1.0, null);

	Krom.setPipeline(pipeline);
	Krom.setVertexBuffer(vb);
	Krom.setIndexBuffer(ib);
	Krom.drawIndexedVertices(0, -1);

	Krom.end();
}

function dropFilesCallback(path) {}
function keyboardDownCallback(key) {}
function keyboardUpCallback(key) {}
function keyboardPressCallback(char) {}
function mouseDownCallback(button, x, y) {}
function mouseUpCallback(button, x, y) {}
function mouseMoveCallback(x, y, mx, my) {}
function mouseWheelCallback(delta) {}
function gamepadAxisCallback(gamepad, axis, value) {}
function gamepadButtonCallback(gamepad, button, value) {}
function audioCallback(samples)  {}
