import { all, fork } from 'redux-saga/effects';
import { watchGlobal } from './globalSaga'
import { watchChecker } from './checkerSaga'

export default function* rootSaga(){
    
    yield all([
      fork(watchGlobal),
      fork(watchChecker)
    ])
}
