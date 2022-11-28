window.onload = function init() {
	const canvas = document.getElementById('1')
	const gl = canvas.getContext('webgl')

	if (!gl) {
		gl = canvas.getContext('experimental-webgl')
	}

	if (!gl) {
		alert('Vaš preglednik ne podržava WebGL')
	}

	var vertices = [-0.5, 0.5, 0.0]

	var vertex_buffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
	gl.bindBuffer(gl.ARRAY_BUFFER, null)

	var vertCode = `
        attribute vec3 coordinates;
		void main(void){
		gl_Position = vec4(coordinates, 1.0);
		gl_PointSize = 10.0;
		}`

	var vertShader = gl.createShader(gl.VERTEX_SHADER)
	gl.shaderSource(vertShader, vertCode)
	gl.compileShader(vertShader)

	var fragCode = `
		void main(void){
		gl_FragColor = vec4(0.0, 0.5, 0.0, 1.0);
		}`

	var fragShader = gl.createShader(gl.FRAGMENT_SHADER)
	gl.shaderSource(fragShader, fragCode)
	gl.compileShader(fragShader)

	var shaderProgram = gl.createProgram()
	gl.attachShader(shaderProgram, vertShader)
	gl.attachShader(shaderProgram, fragShader)

	gl.linkProgram(shaderProgram)
	gl.useProgram(shaderProgram)

	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer)

	var coord = gl.getAttribLocation(shaderProgram, 'coordinates')
	gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0)
	gl.enableVertexAttribArray(coord)

	gl.clearColor(0.5, 0.0, 0.5, 1.0)
	gl.clear(gl.COLOR_BUFFER_BIT)

	gl.drawArrays(gl.POINTS, 0, 1)
}
