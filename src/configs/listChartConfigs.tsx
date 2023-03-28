export const listChartOptions = {
    stroke: {
        curve: 'smooth',
        width: 3
    },
    chart: {
        toolbar: {
            show: false
        },
        animations: {
            enabled: false
        },
        zoom: {
            enabled: false
        }
    },
    grid: {
        show: false
    },
    tooltip: {
        enabled: false
    },
    xaxis: {
        labels: {
            show: false
        }
    },
    yaxis: {
        labels: {
            show: false
        }
    }
} as const;
