/**
 * Smoothly scrolls the page to the given Y position.
 * @param {number} elementY - The Y position to scroll to.
 * @param {number} duration - The duration of the scroll animation in milliseconds.
 */
export default function doScrolling(elementY: number, duration: number) {
  var startingY = window.pageYOffset;
  var diff = elementY - startingY;
  var start: number;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    var time = timestamp - start;
    var percent = Math.min(time / duration, 1);

    window.scrollTo(0, startingY + diff * percent);

    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}
