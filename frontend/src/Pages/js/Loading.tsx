import { Button, Spinner } from 'react-bootstrap'
import '../scss/loader.scss'
export default function Loading() {
  return (
    <div className='loader'>
      <Button color='#2166BC' disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="term"
          aria-hidden="true"
        />
        Loading...
      </Button>
    </div>
  )
}
