/*
 * LightningChartJS example that showcases a simple XY line series.
 */
// Import LightningChartJS
const lcjs = require('@lightningchart/lcjs')

// Extract required parts from LightningChartJS.
const { lightningChart, IntensitySeriesTypes, IndividualPointFill, ColorHSV, Themes } = lcjs

// Helper function to help turn degrees to radians
function degToRad(angle) {
    return (angle * Math.PI) / 180
}

// Resolution of each row/column, specifying how many cells
// are in the heatmap.
const resolution = 20

// Create a new ChartXY.
const chart = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        }).ChartXY({
    theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
})
chart.setTitle('Heatmap using IntensityMesh')

// Add a heatmap to the chart, as a IntensityMesh
const heatmap = chart
    .addHeatmapSeries({
        rows: resolution,
        columns: resolution,
        pixelate: true,
        type: IntensitySeriesTypes.Mesh,
    })
    .setStart({ x: 10, y: 10 })
    .setEnd({ x: 1990, y: 1990 })
    // Add colors and invalidate the Series based on the colors assigned.
    .invalidateColorsOnly((row, column) => ColorHSV(Math.random() * 70, 0.8))
    // Use IndividualPointFill to apply individual color per cell.
    .setFillStyle(new IndividualPointFill())
    // Edit the geometry and invalidate the Series based on the new geometry.
    .invalidateGeometryOnly((row, column, prev) => ({
        // Compute the geometry for each cell in the heatmap.
        x: prev.x * Math.sin(degToRad(row + 1)),
        y: prev.x * Math.sin(degToRad(column + 1)),
    }))
