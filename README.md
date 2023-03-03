# Cryptocurrency Recommendation Website

This repository deploys the cryptocurrency recommendation engine to [Render](https://render.com) using [Flask](http://flask.pocoo.org/) at [https://www.coinrex.org](https://www.coinrex.org).

## Data
The [cryptocurrency-recommendations](https://github.com/werthiness/crypto-recommendations) repository generates the <b>feature_matrix.json</b> and <b>recommendation_info.json</b> files, which used by the website's recommendation engine. These files will updated periodically to stay up-to-date with the status of projects in the cryptocurrency market, and anytime developments are made to the project.

## Deployment
Render deploys the website as a web service directly from this GitHub page. Anytime this repository is updated, Render automatically retrieves the updated project and redeploys the web service.



