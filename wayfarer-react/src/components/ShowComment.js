import React, { Component } from 'react'
import { Textarea, Modal, Button } from 'react-materialize';

function ShowComment() {
  return (
    <Modal 
      trigger={<button>Comment</button>}
      actions={[<Button flat modal="close" node="button" waves="green">Add Comment</Button>]}
    >
      <Textarea />
    </Modal>
  )
}

export default ShowComment
