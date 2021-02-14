export const CHART_OPTIONS = {
    series: [44, 55],
    chart: {
        // width: 300,
        type: "donut"
    },
    labels: ["Ingresos", "Gastos"],
    responsive: [{
        breakpoint: 576,
        options: {
            chart: {
                width: 250
            },
            legend: {
                position: "bottom"
            }
        }
    }]
}