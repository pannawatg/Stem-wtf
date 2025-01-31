function parseCoefficients(input) {
    try {
        const coefficients = JSON.parse(input);
        if (!Array.isArray(coefficients) || coefficients.some(isNaN)) {
            throw new Error("Invalid input! Please enter a list of numbers.");
        }
        return coefficients;
    } catch (error) {
        alert("Invalid input! Please enter coefficients as a list (e.g., [3, 2, 1]).");
        throw error;
    }
}

function evaluatePolynomial(x, coefficients) {
    return coefficients.reduce((acc, coef, index) => {
        const degree = coefficients.length - 1 - index;
        return acc + coef * Math.pow(x, degree);
    }, 0);
}

function computeDerivative(coefficients) {
    const derivative = [];
    for (let i = 0; i < coefficients.length - 1; i++) {
        const degree = coefficients.length - 1 - i;
        derivative.push(coefficients[i] * degree);
    }
    return derivative;
}

function plotGraph(coefficients, tangentX = null) {
    const canvas = document.getElementById('graph');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 20;

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, centerY - evaluatePolynomial(-centerX / scale, coefficients) * scale);
    for (let x = -centerX; x <= centerX; x++) {
        const y = evaluatePolynomial(x / scale, coefficients);
        ctx.lineTo(centerX + x, centerY - y * scale);
    }
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    if (tangentX !== null) {
        const derivative = computeDerivative(coefficients);
        const slope = evaluatePolynomial(tangentX, derivative);
        const tangentY = evaluatePolynomial(tangentX, coefficients);
        plotTangentLine(ctx, centerX, centerY, scale, tangentX, tangentY, slope);
    }
}

function plotTangentLine(ctx, centerX, centerY, scale, x0, y0, slope) {
    const xCanvas = x => centerX + x * scale;
    const yCanvas = y => centerY - y * scale;
    const xStart = -10;
    const xEnd = 10;
    const yStart = y0 + slope * (xStart - x0);
    const yEnd = y0 + slope * (xEnd - x0);

    ctx.beginPath();
    ctx.moveTo(xCanvas(xStart), yCanvas(yStart));
    ctx.lineTo(xCanvas(xEnd), yCanvas(yEnd));
    ctx.strokeStyle = 'red';
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
}

document.getElementById('plot').addEventListener('click', () => {
    const input = document.getElementById('coefficients').value;
    let coefficients;
    try {
        coefficients = parseCoefficients(input);
    } catch (error) {
        return;
    }
    plotGraph(coefficients);
});

document.getElementById('plot-tangent').addEventListener('click', () => {
    const input = document.getElementById('coefficients').value;
    const tangentX = parseFloat(document.getElementById('tangent-x').value);
    if (isNaN(tangentX)) {
        alert("Please enter a valid x-value for the tangent line.");
        return;
    }
    let coefficients;
    try {
        coefficients = parseCoefficients(input);
    } catch (error) {
        return;
    }
    plotGraph(coefficients, tangentX);
});
