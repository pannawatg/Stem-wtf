// Helper function to parse polynomial string into a list of terms
function parsePolynomial(input) {
    const terms = input.replace(/\s+/g, '').split(/(?=[+-])/); // Split by terms with + or -
    const coefficients = [];
    
    terms.forEach(term => {
        const match = term.match(/([+-]?\d*)(x(?:\^(\d+))?)?/);
        if (match) {
            let coef = parseInt(match[1] || 1); // Default to 1 or -1 for x if no coefficient
            let exponent = match[3] ? parseInt(match[3]) : (match[2] ? 1 : 0); // If there's no x, it's exponent 0
            
            // Store the coefficient at the corresponding exponent index
            coefficients[exponent] = (coefficients[exponent] || 0) + coef;
        }
    });

    // Return the coefficients array, e.g., [3, 2, -1] for 3x^2 + 2x - 1
    return coefficients;
}

// Function to plot the graph of the polynomial
function plotGraph() {
    const input = document.getElementById('polynomial').value;
    const canvas = document.getElementById('graph');
    const ctx = canvas.getContext('2d');
    
    // Parse the polynomial into coefficients
    const coefficients = parsePolynomial(input);
    
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
    ctx.moveTo(0, centerY - evaluatePolynomial(0, coefficients) * scale);

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
    for (let i = 0; i < coefficients.length; i++) {
        result += coefficients[i] * Math.pow(x, i);
    }
    return result;
}

// Event listener for the "Plot Graph" button
document.getElementById('plot').addEventListener('click', plotGraph);
