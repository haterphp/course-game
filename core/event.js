function listenEvent (name, callback) {
    document.addEventListener(name, callback, false);
}

function dispatchEvent (name, detail) {
    const event = new CustomEvent(name, { detail });
    document.dispatchEvent(event);
}

export { listenEvent, dispatchEvent };
