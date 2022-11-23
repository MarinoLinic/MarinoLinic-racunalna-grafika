const vertices = [-0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0]
const indices = [0, 1, 2]

let InitMarino = function () {
	const canvas = document.getElementById('1')
	const gl = canvas.getContext('webgl')

	if (!gl) {
		gl = canvas.getContext('experimental-webgl')
	}

	if (!gl) {
		alert('Vaš preglednik ne podržava WebGL')
	}

	// BUFFERS
	let vertex_buffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
	gl.bindBuffer(gl.ARRAY_BUFFER, null)

	let Index_Buffer = gl.createBuffer()
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer)
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

	// SHADERS
	let vertCode = `attribute vec3 coordinates;
				
            void main(void) {
               gl_Position = vec4(coordinates, 1.0);
            }`

	let vertShader = gl.createShader(gl.VERTEX_SHADER)
	gl.shaderSource(vertShader, vertCode)
	gl.compileShader(vertShader)

	let fragCode = `void main(void) {
               gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);
            }`

	let fragShader = gl.createShader(gl.FRAGMENT_SHADER)
	gl.shaderSource(fragShader, fragCode)
	gl.compileShader(fragShader)

	let shaderProgram = gl.createProgram()
	gl.attachShader(shaderProgram, vertShader)
	gl.attachShader(shaderProgram, fragShader)
	gl.linkProgram(shaderProgram)
	gl.useProgram(shaderProgram)

	// ASSOCIATION
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer)
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer)

	let coord = gl.getAttribLocation(shaderProgram, 'coordinates')
	gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0)
	gl.enableVertexAttribArray(coord)

	// DRAWING
	gl.clearColor(0.6, 0.6, 0.5, 1.0)
	gl.enable(gl.DEPTH_TEST)
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

	gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
}
