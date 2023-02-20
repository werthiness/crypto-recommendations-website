var site_color = "#ffffff"
var kraken_text = "<h1>Kraken</h1> <p>Data from cryptocurrency exchange Kraken’s website was used to assessed project speed. Kraken provides a list of over 200 cryptocurrencies and corresponding estimates for how long it takes before they confirm a transaction.<a href=\"https://support.kraken.com/hc/en-us/articles/203325283-Cryptocurrency-deposit-processing-times#\" target=\"_blank\">[Link]</a></p> <p>For individuals using a centralized exchange, this is a practical measure of how long their transactions will take.  However, these figures are based on Kraken’s own procedures for crediting funds - not the actual time to finality on the blockchain.</p>"
var cer_text = "<h1>CER</h1> <p>Data from CER – a cybersecurity company that grades the security of crypto projects and exchanges - was used to assess project security. CER grades cryptocurrency projects and exchanges on their security; these grades are calculated based on a number of factors, including previous security incidents, insurance capacity, whether the token is audited, etc. <a href=\"https://cer.live/cryptocurrency-security-rating\" target=\"_blank\">[Link]</a></p>"
var cw_text = "<h1>Cryptowisser</h1> <p>Data from Cryptowisser was used to assess the energy-efficiency of different crypto projects. Cryptowisser is a website that provides resources for crypto investors. Working together with sustainability experts, they graded cryptocurrencies on their carbon footprints. <a href=\"https://www.cryptowisser.com/crypto-carbon-footprint/\" target=\"_blank\">[Link]</a>"
var cc_text = "<h1>CryptoCompare</h1> <p>Data from CryptoCompare was used to apply categorical tags to each cryptocurrency. CryptoCompare provides in-depth information on thousands of projects, including text descriptions summarizing what each cryptocurrency is and does. <a href=\"https://www.cryptocompare.com/coins/list/all/USD/1\" target=\"_blank\">[Link]</a></p>"
var cmc_text = "<h1>CoinMarketCap</h1> <p>Data from CoinMarketCap was used as another source of project information. This website is excellent for tracking the price and market cap of each cryptocurrency. In addition, their API provides information on each project's platform, consensus mechanism, and category info. <a href=\"https://coinmarketcap.com/\" target=\"_blank\">[Link]</a></p>"

var speed_desc = "<p> Kraken lists the estimated amount of time to fully confirm a transaction on the blockchain for a number of different cryptocurrencies. The timescales of these estimates vary (from seconds all the way to days in some cases!)</p>"
var security_desc = "<p> Analyzing the security of a network is difficult! Here, it is assessed using data from CER – a cybersecurity company that grades the security of crypto projects and exchanges (check them out here). These grades are calculated based on a number of factors, including previous security incidents, insurance capacity, whether the token is audited, etc. </p>"
var energy_desc = "energy"
var tag_desc = "tag"
var project_desc = "project"


function changecontent(desc, color){
    document.getElementById("test").innerHTML=desc;
    document.getElementById("test").style.borderColor = color;
    document.getElementById("test").style.color = color;
}
