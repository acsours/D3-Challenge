# D3-Challenge:
# US Census Health Risks
This is a script created to read US Census Data from a CSV file and load into an interactive visualization using javascript. 

* HTML page to display data on health risks by demographics  
* Uses app.js to display the data from data.csv on the interactive html page 
* Explore different demographics and health risks by clicking on axes
* uses d3 selectors and event handlers to filter data and create subsequent visualizations 

#### CDN snippets:

Bootstrap:
```
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
```
JavaScript:
```
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>

```
D3:
```
  <script src="https://d3js.org/d3.v6.min.js"></script>

```
JQuery:
```
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
```

D3-Tip
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-tip/0.7.1/d3-tip.min.js"></script>
```
#### HTML Preview

Click on axes to change demographics and health risks
![chart_preview_1.png](D3_data_journalism/assets/images/chart_preview_1.png?raw=true "Title")

![chart_preview_2.png](D3_data_journalism/assets/images/chart_preview_2.png?raw=true "Title")

Tooltip displays state name and chosen indicator values
![tooltip_preview.png](D3_data_journalism/assets/images/tooltip_preview.png?raw=true "Title")
