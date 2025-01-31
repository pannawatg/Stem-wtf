// Function to parse the coefficients from the user's input
function parseCoefficients(input) {
    try {
        // Parse the input string into an array
        const coefficients = JSON.parse(input);

        // Validate the input (must be an array of numbers)
        if (!Array.isArray(coefficients) || coefficients.some(isNaN)) {
            throw new Error("Invalid input! Please enter a list of numbers.");
        }

        return coefficients; // Return as-is since input order matches decreasing powers
    } catch (error) {
        alert("Invalid input! Please enter coefficients as a list (e.g., [3, 2, 1]).");
        throw error;
    }
}

// Function to plot the graph of the polynomial
function plotGraph() {
    const input = document.getElementById('coefficients').value;
    const canvas = document.getElementById('graph');
    const ctx = canvas.getContext('2d');
    
    let coefficients;

    try {
        coefficients = parseCoefficients(input); // Get coefficients from input
    } catch (error) {
        return; // Stop if input is invalid
    }

    // Clear the canvas before drawing the new graph
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set up axis
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 10; // 10 pixels per unit
    
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY); // X axis
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height); // Y axis
    ctx.strokeStyle = 'black';
    ctx.stroke();
    
    // Graph the polynomial function
    ctx.beginPath();
    ctx.moveTo(0, centerY - evaluatePolynomial(-centerX / scale, coefficients) * scale);

    // Plot points for a range of x values
    for (let x = -centerX; x <= centerX; x++) {
        const y = evaluatePolynomial(x / scale, coefficients); // scale x to fit in the canvas
        ctx.lineTo(centerX + x, centerY - y * scale);
    }

    ctx.strokeStyle = 'blue';
    ctx.stroke();
}

// Function to evaluate the polynomial at a given x
function evaluatePolynomial(x, coefficients) {
    let result = 0;
    const degree = coefficients.length - 1;

    for (let i = 0; i < coefficients.length; i++) {
        result += coefficients[i] * Math.pow(x, degree - i); // Use degree - i for descending powers
    }

    return result;
}

// Event listener for the "Plot Graph" button
document.getElementById('plot').addEventListener('click', plotGraph);
