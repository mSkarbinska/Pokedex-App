import React from 'react'
import {Card, Button} from 'react-bootstrap'

export default function PokemonCard({name, type, img, id}) {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
  
    return (
      <Card className="text-center" style={{ width: '18rem', margin: '1rem'}}>
        <Card.Img variant="top" src={img} style={{ padding:'2rem', width:'18rem', height:'18rem'}} />
        <Card.Body>
        <Card.Title>{capitalizeFirstLetter(name)}</Card.Title>
        <Card.Text>
            {capitalizeFirstLetter(type)}
        </Card.Text>
        <Button variant="primary">More info</Button>
        </Card.Body>
      </Card>

  )
}
