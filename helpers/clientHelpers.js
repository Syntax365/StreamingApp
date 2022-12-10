export function makeDraggable(elements) {
  if (elements.length === 0) return;
  let draggingElement = null;

  // Handle the mousedown event on an element
  const onMouseDown = (e, element) => {
    // Save a reference to the element that is being dragged
    draggingElement = element;

    // Calculate the offset between the mouse pointer and the top-left corner of the element
    const rect = element.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    // Start listening for mousemove and mouseup events on the document
    document.addEventListener("mousemove", (e) =>
      onMouseMove(e, offsetX, offsetY),
    );
    document.addEventListener("mouseup", onMouseUp);
  };

  // Handle the mousemove event on the document
  const onMouseMove = (e, offsetX, offsetY) => {
    // Calculate the new position of the element being dragged
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    // Move the element to its new position
    draggingElement.style.left = x + "px";
    draggingElement.style.top = y + "px";
  };

  // Handle the mouseup event on the document
  const onMouseUp = () => {
    // Stop listening for mousemove and mouseup events
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  // Attach the mousedown event handler to each element
  elements.forEach((element) => {
    console.log(element);
    //element.addEventListener("mousedown", (e) => onMouseDown(e, element));
  });
}

export const testArray = [
  function onClick() {
    console.log("clicked", e);
  },
];
