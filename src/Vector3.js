Vector3 = function(x, y, z) {
    if (typeof(x) !== "number") {
        console.error("Vector3:", x, "is not a number.");
    }
    if (typeof(y) !== "number") {
        console.error("Vector3:", y, "is not a number.");
    }
    if (typeof(z) !== "number") {
        console.error("Vector3:", z, "is not a number.");
    }

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};
