from flask import Flask, render_template, request, redirect, url_for
import pandas as pd
import numpy as np
import json


# アプリケーションを初期化する際に、static_folder や　template_folder wo
# 明示的に変更していない限り、以下の記述で問題ありません。
app = Flask(__name__)

#1. トップページ/入力フォーム
@app.route('/')
def index():
    return render_template('index.html')

#2. シミュレーション処理と結果表示のページ
@app.route('/simulation_result', methods=['POST'])
def simulation_result():
    #--- データの取得とシミュレーションの実行 ---
    # 例: フォームから初期投資額、積立額、年数、リターン率などを取得

    try:
        initial_investment = float(request.form.get('initial_amount', 100000))
        monthly_contribution = float(request.form.get('monthly_amount', 10000))
        years = int(request.form.get('years', 20))
        annual_return_rate = float(request.form.get('return_rate', 0.05))

    except ValueError:
        return redirect(url_for('index')) # エラー処理
    
    # --- 投資シミュレーションの計算 (月次積立・単利) ---
    months = years * 12
    data = []
    current_value = initial_investment

    for m in range(1, months + 1):
        # 投資額の増加
        current_value += monthly_contribution
        # 運用益の計算（簡略化された単利計算）
        current_value *= (1 + annual_return_rate)

        data.append({
            'month' : m,
            'total_value': round(current_value, 2),
            # 'principal': initial_investment + (m * monthly_contribution)
        })

    # Pandas DataFrameに変換（オプション）
    df_result = pd.DataFrame(data)

    # --- 結果のHTMLレンダリング ---
    return render_template(
    #'simulation.html',
    total_value=f"{current_value:,.2f}", #最終結果
    #chart_labels=json.dumps(chart_labels),
    #chart_data=json.dumps(chart_data)
    )

if __name__ == '__main__':
    app.run(debug=True) # debug=Trueにする