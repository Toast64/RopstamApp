import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookie = new Cookies()

const Protected = (props) => {
  let Cmp = props.render;
  let history = useHistory();

  useEffect(() => {
    if (!cookie.get('data')) {
      history.push('/');
    }
  }, [history])

  return (
    <div>
      <Cmp />
    </div>
  )
}

export default Protected
