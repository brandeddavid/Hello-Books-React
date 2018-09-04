const polly = (global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
});

export default polly;
