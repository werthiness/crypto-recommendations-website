from flask import Flask, render_template, request, flash
import os
import json
import pandas as pd
from sklearn.neighbors import NearestNeighbors
import copy

app = Flask(__name__)

app.config['SECRET_KEY'] = os.urandom(24).hex()

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('home.html')


@app.route('/data.html', methods=['GET'])
def data():
    return render_template('data.html')


@app.route('/howitworks.html', methods=['GET'])
def howitworks():
    return render_template('howitworks.html')


@app.route('/contact.html', methods=['GET', 'POST'])
def contact():
    return render_template('contact.html')


def find_recommendations(tags, master_json='coin_data/feature_matrix.json',
                         drop_rest=True, k=9):
    tags = {k: v for k, v in tags.items() if k not in ['min', 'max']}
    with open(f"{os.getcwd()}/{master_json}", "r") as f:
        cmc_data = json.load(f)
    feature_matrix = pd.DataFrame(index=cmc_data['index'], columns=cmc_data['columns'], data=cmc_data['data'])
    ranks = feature_matrix['rank']  # hold for later, but drop from feature matrix
    feature_matrix.drop(columns=['rank'], inplace=True)

    for feature in ["security", "speed", "energy_efficiency"]:
        feature_matrix[feature] = feature_matrix[feature].fillna(0)

    if drop_rest:
        feature_matrix = feature_matrix.filter(items=tags)

    user_point = pd.DataFrame(0, index=[0], columns=feature_matrix.columns)
    for tag in tags:  # add 1s to what they're looking for
        user_point[tag] = 1

    find_n = {1: 1000, 2: 600, 3: 400}
    if len(tags) in find_n.keys():
        n_neighbors = find_n[len(tags)]
    else:
        n_neighbors = 100

    nn = NearestNeighbors(n_neighbors=n_neighbors, metric='manhattan', algorithm='brute').fit(feature_matrix)
    nn.fit(feature_matrix)

    distances, indices = nn.kneighbors(user_point, return_distance=True)
    coins = list(feature_matrix.index.values)
    recs = [coins[x] for x in indices[0]]

    rec_df = pd.DataFrame(index=recs, columns=['distance', 'rank'])
    for rec, distance in zip(recs, distances[0]):
        norm_distance = distance/len(tags)
        rec_df.loc[rec, 'distance'] = norm_distance
        rec_df.loc[rec, 'rank'] = ranks[rec]
    rec_df.sort_values(by=['distance', 'rank'], inplace=True)

    final_recs = rec_df.index.values[:k].tolist()

    norm_distances = rec_df.distance.values.tolist()[:k]
    perc_match = [(1 - distance) * 100 for distance in norm_distances]
    tag_values = {rec: feature_matrix.loc[rec, :].values.tolist() for rec in final_recs}
    return final_recs, perc_match, tag_values


def read_recommendation_json(final_recs, tags,
                             rec_json='coin_data/recommendation_info.json'):

    with open(f"{os.getcwd()}/{rec_json}", "r") as f:
        rec_dict = json.load(f)
    init_sent_dict = {tag: None for tag in tags}
    init_coin_dict = {key: (copy.deepcopy(init_sent_dict) if key == "sents" else None) for key in
                      ["name", "all_tags", "sents"]}
    highlight = {key: copy.deepcopy(init_coin_dict) for key in final_recs}
    for coin in final_recs:
        info = rec_dict[coin]
        if info['name']:
            highlight[coin]['name'] = info['name']
        if info['symbol']:
            highlight[coin]["symbol"] = info['symbol']
        else:
            highlight[coin]["symbol"] = coin
        highlight[coin]["all_tags"] = info["tags"]
        highlight[coin]["sents"] = info["sents"]
        highlight[coin]["market_cap"] = info["market_cap"]
        highlight[coin]["white_paper"] = info["white_paper"]
        highlight[coin]["url"] = info["url"]

        if "speed" in tags:
            if "speed" in info.keys():
                speed, platform = info["speed"]
                # if platform:
                # highlight[coin]["sents"]["speed"] = f"{coin} transactions
                if not platform:
                    highlight[coin]["speed"] = f"{coin} has an average transaction speed of around {speed}."
        if "energy_efficiency" in tags:
            rating_dict = {"True Green": "the most energy-efficient - carbon neutral or negative",
                           "Medium Green": "very high energy-efficiency (as efficient as a VISA transaction, "
                                           "if not more.)",
                           "Light Green": "high energy-efficiency",
                           "Beige": "low energy-efficiency",
                           "Brown": "very low energy-efficiency"}
            if "energy_efficiency" in info.keys():
                energy_efficiency, platform = info["energy_efficiency"]
                if not platform:
                    highlight[coin]["energy_efficiency"] = f"{coin} has a rating of {energy_efficiency}, " \
                                                                    f"which means {rating_dict[energy_efficiency]}."
        if "security" in tags:
            if "security" in info.keys():
                highlight[coin]["security"] = f"{coin} has a security rating of {info['security']}."

        if "deflationary" in tags:
            highlight[coin]["supply"] = f"{coin} has a total supply of {info['supply']}."

    return highlight


@app.route('/recommendations.html', methods=('GET', 'POST'))
def rec():
    if request.method == 'POST':
        tags = request.form
        if len(tags) >= 1:
            recs, percs, tag_values = find_recommendations(tags)
            rec_dict = read_recommendation_json(recs, tags)
            top_recs = {0: "#FFC300", 1: "#b9ccd4", 2: "#cb8d3f"}
            return render_template('recommendations.html', recs=recs, percs=percs, tags=tags, rec_info=rec_dict.values(),
                                   top_recs=top_recs)
        else:
            flash("Please select at least one item on the form!")
            return render_template('home.html')
