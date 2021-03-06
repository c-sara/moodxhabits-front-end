import MoodButton from './MoodButton'
import HabitButton from './HabitButton'
import './MoodForm.css'

import { Component } from 'react'
import axios from 'axios'

class MoodForm extends Component {
  
  state = {
    mood: '',
    habits: [
      {id: 1, value: 'Eat healthy', isChecked: false},
      {id: 2, value: 'Drink lots of water', isChecked: false},
      {id: 3, value: 'Adequate sleep', isChecked: false},
      {id: 4, value: 'Exercise', isChecked: false},
      {id: 5, value: 'Practice meditation', isChecked: false},
      {id: 6, value: 'Practice gratitude', isChecked: false},
      {id: 7, value: 'Spend time with friends/family', isChecked: false},
      {id: 8, value: 'Complete a personal goal', isChecked: false},
      {id: 9, value: 'Cleaned your space', isChecked: false},
      {id: 10, value: 'Other', isChecked: false},

    ],
    note: '',
    submit: false
  }
  
  moodsArr = ['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']

  selectedHabits() {
    let habits = this.state.habits
    let selectedHabits = []

    habits.forEach(habit => {
      if (habit.isChecked) {
        selectedHabits.push(habit.value)
      }
    })

    return selectedHabits

  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('form submitted')
    let userId = this.props.userId
    let mood = this.state.mood
    let habits = this.selectedHabits()
    let note = this.state.note

    let dateUtc = new Date()
    let date = dateUtc.toLocaleString('en-US', { timeZone: 'Australia/Melbourne' })

    if (mood !== '') {
      axios
        .post('/api/moods', { userId, mood, habits, note, date })
        .then(res =>
          console.log(res))
        .catch(err =>
          console.log(err))
  
      this.setState({
        submit: true
      })
  
      this.props.history.push('/')

    }

    this.setState({
      submit: true
    })

  }

  handleMood = (e) => {
    this.setState({
      mood: e.target.value
    })

  }

  handleChecked = (targetId) => {
    let habits = this.state.habits

    this.setState({
      habits: habits.map(habit => {
        if (habit.id === targetId) {
          return {...habit, isChecked: !habit.isChecked}
        } else {
          return {...habit}
        }
      })

    })

  }

  handleTextAreaChange = (e) => {
    this.setState({
      note: e.target.value
    })
  }

  render() {
    console.log(this.props.userId)
    return (
      <section>
        
        <form onSubmit={this.handleSubmit}>
          <h3 style={{ 
      backgroundImage: `url("/blue.png")` 
    }} className="form-heading">How are you feeling?</h3>
          
          {this.moodsArr.map((mood, idx) => 
            <MoodButton mood={mood} key={idx} handleMood={this.handleMood}/>
          )}

          <br />
          <br />
  
          <h3 style={{ 
      backgroundImage: `url("/purple.png")` 
    }} className="form-heading">What have you been up to today?</h3>
          <div className="habits-wrapper">
            {this.state.habits.map((habit, idx) => 
              <HabitButton habit={habit} key={idx} handleChecked={this.handleChecked}/>
            )}

          </div>

          <br />
          <br />
  
          <h3 className="note-heading" style={{ 
      backgroundImage: `url("/green.png")` 
    }} className="form-heading">Notes</h3>
          <h6 className="note-description">You are able to record anything here. <br/> For example: highlights/lowlights of the day, daily affirmations, food journal, etc</h6>
          <textarea onChange={this.handleTextAreaChange}></textarea>
          
          <br />
          <br />
            
          <input type="submit" value="Submit" className='format-btn'/>

          {this.state.submit && (this.state.mood === '') ? <h4> Please select your mood</h4> : <></>}
  
        </form>
      </section>
    )
  }
}

export default MoodForm
