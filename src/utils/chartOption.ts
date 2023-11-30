export const defaultOption = {
  grid: {
    top: 40,
    bottom: 40,
    right: 30,
    left: 40,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      axis: "x",
      label: {
        color: "black",
      },
    },
  },
  xAxis: {
    type: "category",
    //坐标轴两边留白
    boundaryGap: false,
    splitLine: {
      show: true,
      lineStyle: {
        opacity: 0.3,
        type: [3, 6],
      },
    },

    axisLine: {
      show: false,
    },
    axisLabel: {
      color: "#fff",
    },
    axisPointer: {
      snap: true,
    },
    data: [],
  },
  yAxis: [
    {
      type: "value",
      name: "电压",
      nameLocation: "end",
      position: "right",

      axisLine: {
        lineStyle: {
          color: "#9efff0",
          type: [3, 6],
        },
      },
      alignTicks: true,
      splitLine: {
        show: true,
        lineStyle: {
          type: [3, 6],
          opacity: 0.3,
        },
      },
      axisPointer: {
        snap: true,
      },
    },
    {
      type: "value",
      name: "电流",
      nameLocation: "end",
      position: "left",
      axisLine: {
        lineStyle: {
          color: "#ffff24f2",
          type: [3, 6],
        },
      },

      alignTicks: true,
      splitLine: {
        show: true,
        lineStyle: {
          type: [3, 6],
          opacity: 0.3,
        },
      },
      axisPointer: {
        snap: true,
      },
    },
  ],
  animation: false,
  series: [
    {
      name: "电压",
      type: "line",
      yAxisIndex: 0,
      itemStyle: {
        color: "#9efff0",
      },
      symbol: "none",
      data: [],
    },
    {
      name: "电流",
      type: "line",
      yAxisIndex: 1,

      itemStyle: {
        color: "#ffff24f2",
      },
      showSymbol: false,
      data: [],
    },
  ],
};

// export const WeldChartOption = {
//   grid: {
//     top: 40,
//     bottom: 40,
//     right: 30,
//     left: 40,
//   },
//   tooltip: {
//     trigger: "axis",
//     axisPointer: {
//       axis: "x",
//       label: {
//         color: "black",
//         // formatter: function (value) {
//         //   return value.toFixed(0);
//         // },
//       },
//     },
//   },
//   xAxis: {
//     type: "category",
//     //坐标轴两边留白
//     boundaryGap: false,
//     splitLine: {
//       show: true,
//       lineStyle: {
//         opacity: 0.3,
//         type: [3, 6],
//       },
//     },

//     axisLine: {
//       show: false,
//     },
//     axisLabel: {
//       color: "#fff",
//     },
//     axisPointer: {
//       snap: true,
//     },
//     data: [],
//   },
//   yAxis: [
//     {
//       type: "value",
//       name: "电压",
//       nameLocation: "end",
//       position: "right",

//       axisLine: {
//         lineStyle: {
//           color: "#9efff0",
//           type: [3, 6],
//         },
//       },
//       alignTicks: true,
//       splitLine: {
//         show: true,
//         lineStyle: {
//           type: [3, 6],
//           opacity: 0.3,
//         },
//       },
//       axisPointer: {
//         snap: true,
//       },
//     },
//     {
//       type: "value",
//       name: "电流",
//       nameLocation: "end",
//       position: "left",
//       axisLabel: {
//         // minInterval: 10,
//         formatter: function (value) {
//           return value.toFixed(0);
//         },
//       },
//       axisLine: {
//         lineStyle: {
//           color: "#ffff24f2",
//           type: [3, 6],
//         },
//       },

//       alignTicks: true,
//       splitLine: {
//         show: true,
//         lineStyle: {
//           type: [3, 6],
//           opacity: 0.3,
//         },
//       },
//       axisPointer: {
//         snap: true,
//       },
//     },
//   ],
//   animation: true,
//   series: [
//     {
//       name: "电压",
//       type: "line",

//       yAxisIndex: 0,
//       itemStyle: {
//         color: "#9efff0",
//       },
//       symbol: "none",
//       data: [],
//     },
//     {
//       name: "电流",
//       type: "line",
//       yAxisIndex: 1,

//       itemStyle: {
//         color: "#ffff24f2",
//       },
//       showSymbol: false,
//       data: [],
//     },
//   ],
// };

// export const AdminWeldChartOption = {
//   grid: {
//     top: 40,
//     bottom: 40,
//     right: 30,
//     left: 40,
//   },
//   tooltip: {
//     trigger: "axis",
//     axisPointer: {
//       axis: "x",
//       label: {
//         color: "black",
//         // formatter: function (value) {
//         //   return value.toFixed(0);
//         // },
//       },
//     },
//   },
//   dataZoom: {
//     type: "inside",
//     // start: 0,
//     // end: 100,
//     // bottom: 14,
//     // type: "slider",
//     // animation: true,
//     // handleStyle: {
//     //   borderWidth: 5,
//     // },
//     // dataBackground: {
//     //   areaStyle: {
//     //     color: "#ffff24f2",
//     //     opacity:1
//     //   }
//     // }
//   },
//   xAxis: {
//     type: "time",
//     //坐标轴两边留白
//     boundaryGap: 0,
//     splitLine: {
//       show: true,
//       lineStyle: {
//         opacity: 0.3,
//         type: [3, 6],
//       },
//     },

//     axisLine: {
//       show: false,
//     },
//     axisLabel: {
//       color: "#fff",
//       interval: "auto",
//       hideOverlap: true,
//     },
//     axisPointer: {
//       snap: true,
//     },
//     data: [],
//   },
//   yAxis: [
//     {
//       type: "value",
//       name: "电压",
//       nameLocation: "end",
//       position: "right",
//       axisLine: {
//         lineStyle: {
//           color: "#9efff0",
//           type: [3, 6],
//         },
//       },
//       alignTicks: true,
//       splitLine: {
//         show: true,
//         lineStyle: {
//           type: [3, 6],
//           opacity: 0.3,
//         },
//       },
//       axisPointer: {
//         snap: true,
//       },
//     },
//     {
//       type: "value",
//       name: "电流",
//       nameLocation: "end",
//       position: "left",
//       axisLabel: {
//         // minInterval: 10,
//         formatter: function (value) {
//           return value.toFixed(0);
//         },
//       },
//       axisLine: {
//         lineStyle: {
//           color: "#ffff24f2",
//           type: [3, 6],
//         },
//       },

//       alignTicks: true,
//       splitLine: {
//         show: true,
//         lineStyle: {
//           type: [3, 6],
//           opacity: 0.3,
//         },
//       },
//       axisPointer: {
//         snap: true,
//       },
//     },
//   ],
//   animation: true,
//   series: [
//     {
//       name: "电压",
//       type: "line",
//       connectNulls: false,
//       // step: "end",
//       yAxisIndex: 0,
//       itemStyle: {
//         color: "#9efff0",
//       },
//       symbol: "none",
//       data: [],
//     },
//     {
//       name: "电流",
//       type: "line",
//       yAxisIndex: 1,
//       // step: "end",
//       connectNulls: false,

//       itemStyle: {
//         color: "#ffff24f2",
//       },
//       showSymbol: false,
//       data: [],
//     },
//   ],
// };
