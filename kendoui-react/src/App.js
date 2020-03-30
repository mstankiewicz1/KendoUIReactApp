import React from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import nutrition from './nutrition.json';

class App extends React.Component {

    state = {
      data: nutrition,
      habitsOptions: [
                        'Drink One Cup of Water',
                        '1 Hour od coding',
                        '10 Pushups',
                        'Eat Your Fruits & Veggies',
                        '10 Minutes of Meditation'
                      ]
      };


render(){
    return (
      <div className="App">
          <h1>Healthy Things</h1>
          <div className="healthy-habits">
          </div>
          <div className="add-habits">
              <DropDownList data={this.state.habitsOptions}/>
              <NumericTextBox/>
              <Button>Add Habit</Button>
          </div>
          <div className='nutrition-group'>
              <Grid data={this.state.data}>
                <Column field='Description' title='Food'/>
                <Column field='Measure' title='Amount'/>
                <Column field='Protein(g)Per Measure' title='Protein'/>
                <Column field='Carbohydrate, by difference(g)Per Measure' title='Carbs'/>
                <Column field='Sugars, total(g)Per Measure' title='Sugars'/>
              </Grid>
          </div>
      </div>
    );
  }
}

export default App;
