function parseToNumber(value) {
  let str = String(value || "");
  str = str.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 65248)); 
  const numStr = str.replace(/[^0-9]/g, "");
  return Number(numStr) || 0; 
}

function updateDataAndChart() {
  // 入力値の取得
  const food = parseToNumber(document.getElementById("food").value);
  const transport = parseToNumber(document.getElementById("transport").value);
  const hobby = parseToNumber(document.getElementById("hobby").value);  
  const other = parseToNumber(document.getElementById("other").value);

  //合計金額の計算と表示
  const total = food + transport + hobby + other;
  document.getElementById("total").textContent = total.toLocaleString();

  //グラフデータの更新と再描画
  myChart.data.datasets[0].data = [food, transport, hobby, other];
  myChart.update();
}

window.onload = function() {
  // 入力フィールドの初期化
  document.getElementById("food").value = "";
  document.getElementById("transport").value = "";
  document.getElementById("hobby").value = "";
  document.getElementById("other").value = "";
  document.getElementById("total").textContent = "0";

  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["食費", "交通費", "趣味", "その他"],
      datasets: [{
        data: [1,1,1,1], //初期データ
        backgroundColor: [ "#66b3ff", "#99ff99", "#ffcc66", "#ff6666"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed;
              return `${label}: ${value.toLocaleString()}円`;
            }
          }
        }
      }
    }
  });

  const calculateBtn = document.getElementById('calculateBtn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', updateDataAndChart);
  }
};
