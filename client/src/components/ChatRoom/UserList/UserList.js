//стили
import { Accordion, Card, Button, Badge } from 'react-bootstrap'
//индикатор статуса пользователя
import { RiRadioButtonLine } from 'react-icons/ri'

export const UserList = ({ users }) => {
  //преобразуем входные данные в массив
  const usersArr = Object.entries(users);
  // [ ['1', { username: 'Alice', online: false } ] ]
  //получаем массив данных пользователя в котором находим ользователей онлайн
  const activeUsers = Object.values(users)
    // [ {username: 'Alice', online: false}, {username: 'Bob', online: false} ]
    .filter((u) => u.online).length;

  return (
    <Accordion className='mt-4'>
      <Card>
        <Card.Header bg='none'>
          <Accordion.Toggle
            as={Button}
            variant='info'
            eventKey='0'
            style={{ textDecoration: 'none' }}
          >
            Active users{' '}
            <Badge variant='light' className='ml-1'>
              {activeUsers}
            </Badge>
          </Accordion.Toggle>
        </Card.Header>
        {usersArr.map(([userId, obj]) => (
          <Accordion.Collapse eventKey='0' key={userId}>
            <Card.Body>
              <RiRadioButtonLine
                className={`mb-1 ${obj.online ? 'text-success' : 'text-secondary'
                  }`}
                size='0.8em'
              />{' '}
              {obj.username}
            </Card.Body>
          </Accordion.Collapse>
        ))}
      </Card>
    </Accordion>
  )
}
