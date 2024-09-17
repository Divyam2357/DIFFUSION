"use strict";
let
M = Math, //SHORTER REFERENCE TO MATH
P = M.PI, //SHORTER REFERENCE TO MATH.PI
S = M.sin,  //SHORTER REFERENCE TO MATH.sin
X = M.random,  //SHORTER REFERENCE TO MATH.random
a = document.getElementById('c'), //Canvas element 
c = a.getContext('2d'), //Canvas context
p = [], //Particle array
t = 30000, //Particle count
m = {x: 0,y: 0}, //Mouse coordinates
u = true, //playing or paused
i, n, x, y, o, k, //Reusable variables
w, h, f, d, //width,height, imagedata, actual data array
r, g, b, z = 0, //Red, Green ,Blue ,degrees of color rotation
v = 180, // Center of color range
l = 75, //Maximum color deviation
L = () =>{ // Main loop
  z+=z < 20 ? 360 : -20; //Rotate hue through 360 degrees
   k = z * P / 180; //Degrees to radians 
  r = S(k) * l + v | 0; //Red channel value (each channel is spaced 120 degrees apart )
  g = S(k + 2 * P / 3) * l + v | 0; //Green channel value
  b = S(k + 2 * P / 3) * l + v | 0; //Blue channel value
  for(i=0; i<t; i++){ // Loop through all the particles
    n = p[i]; // Get current particle
    k = (n.y | 0) * w * 4 + (n.x | 0) * 4; // Get position in the imagedata array for the current particle
    d[k] = d[k + 1] = d[k + 2] = 30; // Set pixel back to gray (instead of having to clear the entire canvas) 
  }
  for (i = 0; i < t; i++) { // Loop through all of the particles
         n = p[i]; //Get current particle
         x = m.x - n.x; //Distance between particle and mouse on X-axis
         y = m.y - n.y;  //Distance between particle and mouse on Y-axis
         k = M.atan2(y, x); // Gravity angle in radians
         o = 100 / (M.sqrt(x * x + y * y) + 0.01); //Gravity strength
n.a += M.cos(k) * o; //Update velocity for X-axis
n.b += S(k) * o;  //Update velocity for Y-axis
n.x += n.a; // Add current velocity to X coordinate
  n.y += n.b; // Add current velocity to Y coordinate
          n.x += n.x >= w ? -w : n.x < 0 ? w : 0; //Wrap to opposite side of screen if out of bounds on X-axis
 n.y += n.y >= h ? -h : n.y < 0 ? h : 0; //Wrap to opposite side of screen if out of bounds on Y-axis
n.a *= 0.96; // Reduce the X axis velocity(friction)
n.b *= 0.96; // Reduce the Y axis velocity(friction)
    k = (n.y | 0) * w * 4 + (n.x | 0) * 4; // Get position in the imagedata array for the current particle
d[k] = r; //Set the red channel for the pixel
d[k + 1] = g; //Set the green channel for the pixel
d[k + 2] = b; //Set the blue channel for the pixel
}
c.putImageData(f , 0, 0); //Push the updated ImageData back to the canvas
u && requestAnimationFrame(L); //If playing, Loop again
},
R= () => { //window resize handler
    w = a.width = innerWidth; //Set canvas width and w to window.innerWidth
h = a.height = innerHeight; //Set canvas Height and h to window.innerHeight
c.fillStyle = 'rgb(30, 30, 30)'; //Canvas fill color
c.fillRect(0, 0, w, h); //Fill the canvas with color
f = c.getImageData(0, 0, w, h); //Get the canvas Image data
d = f.data; //Save a reference to the pixel data array
m.x = w / 2 | 0; // set mouse X to centre of screen
m.y = h / 2 | 0; // set mouse Y to centre of screen
  };
R(); // Call the resize function once to size the canvas before we begin

for(i = 0; i < t; i++ ) p[i] = {x: X() * w, y: X() * h, a: X(), b: X()};
//Fill the particle array with random particles
onresize = R; //Window resize event handler
onmousemove = e => {m.x = e.pageX; m.y = e.pageY}; //Mouse move event handler
addEventListener('touchmove' , e => {e = e.touches[0]; m.x = e.pageX;
    m.y = e.pageY
}); //Touch move event handler
a.addEventListener('click' , e => {u =!u; u && L()}); //Click event handler ; Toggle boolean and if true, Start loop

L(); // Start the Loop
Document.addEventListener('dblclick', () => {
if (!document.fullscreenElement){
    document.documentElement.requestFullscreen()
} 
else{
    document.exitFullscreen()
}

});
