import React from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Chart } from '@progress/kendo-charts-react-wrapper';
import { filterBy } from '@progress/kendo-data-query';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';


import nutrition from './nutrition.json';

class App extends React.Component {

      constructor(props){
        super(props)

      const initialFilter = {
          logic: 'and',
          filters: [{
                      field: 'Description',
                      operator: 'contains',
                      value: 'Apple'
          }]
    };

    this.state = {
      data: this.getNutrition(initialFilter),
      filter: initialFilter,
      habitId: 0,
      habitName: '',
      habitIteration: 0,
      habits: [],
      habitsOptions: [
                        'Drink One Cup of Water',
                        '1 Hour od coding',
                        '10 Pushups',
                        'Eat Your Fruits & Veggies',
                        '10 Minutes of Meditation'
                      ],
      series: [{ data: [1, 1, 1]}],
      seriesDefaults: {type: 'pie'},
      graphProtein: 0,
      graphCarb: 0,
      graphSugar: 0

      }
    };


      handleNameChange = (event) => {
          this.setState({
                habitName: event.target.value
          })
      }

      handleIterationChange = (event) => {
        this.setState({
          habitIteration: event.target.value
          })
      }

      handleAddHabit = (event) => {
          this.setState({
            habits: this.state.habits.concat([{
                key: this.state.habitId,
                name: this.state.habitName,
                iterations: this.state.habitIteration
            }]),
            habitId: this.state.habitId + 1
          });
      }

      getNutrition = (filter) => filterBy(nutrition, filter);

      handleFilterChange = (event) => {
          this.setState({
            data: this.getNutrition(event.filter),
            filter: event.filter
          });
      }

      handleProteinChange = (event) => {
        this.setState({
          graphProtein: event.target.value
        })
        this.handleGraphChange();
      }

      handleGraphChange = () => {
        this.setState({
          series: [{
              data: [
                  this.state.graphProtein,
                  this.state.graphCarb,
                  this.state.graphSugar
              ]
          }]
        })
      }


render(){
    return (
      <div className="App">
            <h1> Healthy Things </h1>
            <div className='healthy-habits'>
                <ul>
                    {this.state.habits.map((habit) => [
                          <li key={habit.habitId}>
                            <h3>{habit.name}</h3>
                            <div className="iterations-area">
                                {[...Array(habit.iterations)].map((iteration, index) => {
                                    return <input key={index} type='radio'/> 
                                })}
                            </div>
                          </li>
                    ])}
                </ul>      
            </div>
            <div className='add-habits'>
              <DropDownList 
                  data={this.state.habitsOptions}
                  value={this.state.habitName}
                  onChange={this.state.handleNameChange}
              />
              <NumericTextBox
                format='0'
                min={0}
                max={22}
                value={this.state.habitIteration}
                onChange={this.state.handleIterationChange}
              />
              <Button primary={true} onClick={this.handleAddHabit}>Add Habit</Button>
          </div>
          <div className='nutrition-group'>
              <Grid
                data={this.state.data}
                style={{maxHeight: '500px'}}
                filterable={true}
                filter={this.state.filter}
                filterChange={this.handleFilterChange}
              >
                <Column field='Description' title='Food'/>
                <Column field='Measure' title='Amount'/>
                <Column field='Protein(g)Per Measure' title='Protein'/>
                <Column field='Carbohydrate, by difference(g)Per Measure' title='Carbs'/>
                <Column field='Sugars, total(g)Per Measure' title='Sugars'/>
              </Grid>
          </div>
          <div className="food-graph-inputs">
              <p>Protein Amount:
                    <input
                        type='text'
                        onChange={this.handleProteinChange}
                    />
              </p>
              <p>Carb Amount:
                    <input
                        type='text'
                        onChange={this.handleProteinChange}
                    />
              </p>
              <p>Sugar Amount:
                    <input
                        type='text'
                        onChange={this.handleProteinChange}
                    />
              </p>
          </div>
          <div className="food-graph">
              <Chart
                  seriesDefaults={this.state.seriesDefaults}
                  series={this.state.series}
              />
          </div>
      </div>
    );
  }
}

export default App;
