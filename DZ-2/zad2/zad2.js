'use strict'

let canvas
let gl

let NumVertices = 36

let points = []
let colors = []

let xAxis = 0
let yAxis = 1
let zAxis = 2

let axis = 0
let theta = [30, 20, 10]
let thetaLoc

window.onload = function init() {
	canvas = document.getElementById('gl-canvas')

	gl = WebGLUtils.setupWebGL(canvas)
	if (!gl) {
		alert("WebGL isn't available")
	}

	colorCube()

	gl.viewport(0, 0, canvas.width, canvas.height)
	gl.clearColor(1.0, 1.0, 1.0, 1.0)

	gl.enable(gl.DEPTH_TEST)

	var program = initShaders(gl, 'vertex-shader', 'fragment-shader')
	gl.useProgram(program)

	var cBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW)

	var vColor = gl.getAttribLocation(program, 'vColor')
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0)
	gl.enableVertexAttribArray(vColor)

	var vBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW)

	var vPosition = gl.getAttribLocation(program, 'vPosition')
	gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0)
	gl.enableVertexAttribArray(vPosition)

	thetaLoc = gl.getUniformLocation(program, 'theta')

	render()
}

function colorCube() {
	kvad(1, 0, 3, 2)
	kvad(2, 3, 7, 6)
	kvad(3, 7, 4, 0)
	kvad(6, 5, 1, 2)
	kvad(4, 7, 6, 5)
	kvad(5, 1, 0, 4)
}

function kvad(a, b, c, d) {
	let vertices = [
		vec4(-0.7, -0.6, 0.5, 1.0),
		vec4(-0.7, 0.6, 0.5, 1.0),
		vec4(0.7, 0.6, 0.5, 1.0),
		vec4(0.7, -0.6, 0.5, 1.0),
		vec4(-0.7, -0.6, -0.5, 1.0),
		vec4(-0.7, 0.6, -0.5, 1.0),
		vec4(0.7, 0.6, -0.5, 1.0),
		vec4(0.7, -0.6, -0.5, 1.0),
	]

	let vertexColors = [
		vec4(0.0, 0.0, 0.0, 1.0),
		vec4(0.0, 0.6, 0.3, 1.0),
		vec4(0.4, 0.0, 1.0, 1.0),
		vec4(0.5, 0.0, 0.3, 1.0),
		vec4(0.0, 0.6, 0.3, 1.0),
		vec4(0.4, 0.0, 1.0, 1.0),
		vec4(0.5, 0.0, 0.3, 1.0),
		vec4(0.0, 0.0, 0.0, 1.0),
	]

	let indices = [a, b, c, a, c, d]

	for (let i = 0; i < indices.length; ++i) {
		points.push(vertices[indices[i]])
		colors.push(vertexColors[a])
	}
}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

	gl.uniform3fv(thetaLoc, theta)

	gl.drawArrays(gl.TRIANGLES, 0, NumVertices)
}
