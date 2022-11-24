const vertices = [-0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0]
const colors = [0, 0, 1, 1, 0, 0, 0, 1, 0]
const indices = [0, 1, 2]

window.onload = function init() {
	const canvas = document.getElementById('1')
	const gl = canvas.getContext('webgl')

	if (!gl) {
		gl = canvas.getContext('experimental-webgl')
	}

	if (!gl) {
		alert('Vaš preglednik ne podržava WebGL')
	}

	// BUFFERI
	let vertex_buffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
	gl.bindBuffer(gl.ARRAY_BUFFER, null)

	let index_Buffer = gl.createBuffer()
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_Buffer)
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

	let color_buffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

	// SHADERI
	let vertCode = `
	attribute vec4 coordinates;
	attribute vec3 color;
	varying vec3 vColor;
	uniform mat4 u_xformMatrix;
	void main(void) {
		gl_Position = u_xformMatrix * coordinates;
		vColor = color;
	}`

	let vertShader = gl.createShader(gl.VERTEX_SHADER)
	gl.shaderSource(vertShader, vertCode)
	gl.compileShader(vertShader)

	let fragCode = `
	precision mediump float;
	varying vec3 vColor;
	void main(void) {
		gl_FragColor = vec4(vColor, 1.);
	}`

	let fragShader = gl.createShader(gl.FRAGMENT_SHADER)
	gl.shaderSource(fragShader, fragCode)
	gl.compileShader(fragShader)

	let shaderProgram = gl.createProgram()
	gl.attachShader(shaderProgram, vertShader)
	gl.attachShader(shaderProgram, fragShader)
	gl.linkProgram(shaderProgram)
	gl.useProgram(shaderProgram)

	// SKALIRANJE
	let Sx = 1.5,
		Sy = 1.0,
		Sz = 1.0
	let xformMatrix = new Float32Array([Sx, 0.0, 0.0, 0.0, 0.0, Sy, 0.0, 0.0, 0.0, 0.0, Sz, 0.0, 0.0, 0.0, 0.0, 1.0])

	let u_xformMatrix = gl.getUniformLocation(shaderProgram, 'u_xformMatrix')
	gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix)

	// ASOCIJACIJA
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer)
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_Buffer)
	gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer)

	var color = gl.getAttribLocation(shaderProgram, 'color')
	gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0)
	gl.enableVertexAttribArray(color)

	let coord = gl.getAttribLocation(shaderProgram, 'coordinates')
	gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0)
	gl.enableVertexAttribArray(coord)

	// CRTANJE
	gl.clearColor(0, 0, 0, 1.0)
	gl.enable(gl.DEPTH_TEST)
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

	gl.viewport(0, 0, canvas.width, canvas.height)
	gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
}
