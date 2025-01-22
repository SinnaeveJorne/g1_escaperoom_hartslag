const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');

let currentDraggable = null;
let offsetX = 0;
let offsetY = 0;

draggables.forEach((draggable) => {
  // Start drag
  draggable.addEventListener('mousedown', (e) => {
    currentDraggable = draggable;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    currentDraggable.style.cursor = 'grabbing';
  });

  // Move element
  document.addEventListener('mousemove', (e) => {
    if (!currentDraggable) return;
    currentDraggable.style.left = `${e.pageX - offsetX}px`;
    currentDraggable.style.top = `${e.pageY - offsetY}px`;
  });

  // Stop drag
  document.addEventListener('mouseup', (e) => {
    if (!currentDraggable) return;

    currentDraggable.style.cursor = 'grab';

    const draggableColor = currentDraggable.dataset.color;
    const draggableRect = currentDraggable.getBoundingClientRect();

    // Find the closest dropzone
    let closestZone = null;
    let closestDistance = Infinity;

    dropzones.forEach((zone) => {
      const zoneRect = zone.getBoundingClientRect();
      const zoneCenterX = (zoneRect.left + zoneRect.right) / 2;
      const zoneCenterY = (zoneRect.top + zoneRect.bottom) / 2;

      const draggableCenterX = (draggableRect.left + draggableRect.right) / 2;
      const draggableCenterY = (draggableRect.top + draggableRect.bottom) / 2;

      const distance = Math.sqrt(
        Math.pow(zoneCenterX - draggableCenterX, 2) +
        Math.pow(zoneCenterY - draggableCenterY, 2)
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestZone = zone;
      }
    });

    // Check if the closest dropzone is valid
    if (closestZone) {
      const zoneColor = closestZone.dataset.color;

      if (draggableColor === zoneColor) {
        closestZone.style.borderColor = draggableColor; // Highlight the zone
        const zoneRect = closestZone.getBoundingClientRect();
        currentDraggable.style.left = `${zoneRect.left}px`;
        currentDraggable.style.top = `${zoneRect.top}px`;
      } else {
        alert(`Only ${zoneColor} items can be dropped here!`);
        currentDraggable.style.left = '';
        currentDraggable.style.top = '';
      }
    } else {
      currentDraggable.style.left = '';
      currentDraggable.style.top = '';
    }

    currentDraggable = null; // Release the current draggable
  });
});
