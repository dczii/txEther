import { all, fork } from 'redux-saga/effects';
import { watchGlobal } from './globalSaga'

export default function* rootSaga(){
    
    yield all([
      fork(watchGlobal)
    ])
}
