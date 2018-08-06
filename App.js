import React, {Component} from 'react';
import styles from './styles';
import {
  Text,
  View
} from 'react-native';
import * as storageMethods from './utils/storageMethods';
import * as dateMethods from './utils/dateMethods';
import EnterBudget from './components/EnterBudget';

export default class App extends Component {
  constructor(props){
    super();

    this.state = {
      budget: undefined
    }
  }
  //Set the month and year in state, then call _updateBudget:
  async componentWillMount() {
    this.setState({
      month: dateMethods.getMonth(),
      year: dateMethods.getYear()
    });

    this._updateBudget();
    }

    //Push EnterBudget to the navigator and pass it two props.
    // Hide the navigation bar so that the user cannot leave without entering a budget for the month:
    _renderEnterBudgetComponent() {
      this.props.navigator.push({
        component: EnterBudget,
        navigationBarHidden: true,
        passProps: {
          monthString: dateMethods.getMonthString(this.state.month),
          saveAndUpdateBudget: (budget) =>
          this._saveAndUpdateBudget(budget)
        }
      });
    }

    //Save the budget into storage. The argument is passed from the EnterBudget component:
    async _saveAndUpdateBudget (budget) {
      await storageMethods.saveMonthlyBudget(this.state.month, this.state.year, budget);

      this._updateBudget();
    }

    // Previously found in componentWillMount, set the budget in state if it exists and render EnterBudget if it does not:
    async _updateBudget () {
      let response = await storageMethods.checkCurrentMonthBudget();

      if(response !== false) {
        this.setState({
          budget: response
        });
        return;
      }
      this._renderEnterBudgetComponent();
    }

  render() {
    return (
      <View style={styles.appContainer}>
        <Text>
          Your Budget is { this.state.budget || 'not set'}!
        </Text>
      </View>
    )
  }
}