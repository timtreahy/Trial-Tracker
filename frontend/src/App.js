import './App.css';
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import SideNavbar from './components/SideNavbar'
import MyAccount from './components/MyAccount'
import PatientsContainer from './components/PatientsContainer'
import TrialsContainer from './components/TrialsContainer'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import TrialPage from './components/TrialPage';
import PatientPage from './components/PatientPage';
import NotesContainer from './components/NotesContainer';
import CreateTrial from './components/CreateTrial';
import CreatePatient from './components/CreatePatient';
import CreateNote from './components/CreateNote';

function App() {

  const [trials, setTrials] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [trialId, setTrialId] = useState()
  const [patientId, setPatientId] = useState()
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState([])
  const [deletedTrial, setDeletedTrial] = useState([]);

  useEffect(function () {
    fetch("http://localhost:3000/trials")
      .then(function (resp) {
        return resp.json()
      })
      .then(function (data) {
        console.log(data)
        return setTrials(data)
      })
  }, [trialId, deletedTrial])

  return (
    <div className="App">
      {(loggedIn === true) ? (
        <div>
          <SideNavbar setLoggedIn={setLoggedIn} />
          <Switch>
            <Route exact path='/'>
              <Dashboard trials={trials} />
            </Route>
            <Route path='/trials/create'>
              <CreateTrial setTrialId={setTrialId} trialId={trialId} />
            </Route>
            <Route path='/trials/:id'>
              <TrialPage trialId={trialId} setPatientId={setPatientId} setDeletedTrial={setDeletedTrial} />
            </Route>
            <Route path='/trials'>
              <TrialsContainer
                trials={trials}
                setTrials={setTrials}
                setTrialId={setTrialId}
              />
            </Route>
            <Route path='/patients/create'>
              <CreatePatient patientId={patientId} setPatientId={setPatientId} trialId={trialId} />
            </Route>
            <Route path='/patients/:id'>
              <PatientPage patientId={patientId} newNote={newNote} setTrialId={setTrialId} />
            </Route>
            <Route path='/patients'>
              <PatientsContainer setPatientId={setPatientId} />
            </Route>
            <Route path='/notes/create'>
              <CreateNote patientId={patientId} setNewNote={setNewNote} />
            </Route>
            <Route path='/notes'>
              <NotesContainer setNotes={setNotes} newNote={newNote} notes={notes} setPatientId={setPatientId} />
            </Route>
            <Route path='/myaccount'>
              <MyAccount />
            </Route>
          </Switch>
        </div>
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )
      }
    </div>
  );
}

export default App;
