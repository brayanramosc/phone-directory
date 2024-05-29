import { useEffect, useState } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import CustomInput from './components/CustomInput'

function App() {
  const [persons, setPersons] = useState([])
  const [person, setPerson] = useState({ name: '', number: '' })
  const [selectedPerson, setSelectedPerson] = useState(null)

  const fetchData = async () => {
    const personArr = await personService.getAll()
    setPersons(personArr);
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleChangePerson = (e) => setPerson({ ...person, [e.target.name]: e.target.value })

  const handleSubmitPerson = async (e) => {
    e.preventDefault()
    if (!person.name || !person.number) {
      setPerson({ name: '', number: '' })
      alert('Fill all the fields')
      return
    }

    let res
    if (selectedPerson) {
      res = await personService.update(person, selectedPerson.id)
    } else {
      res = await personService.create(person)
    }

    if (res?.error) {
      alert(res.error)
    }
    setPerson({ name: '', number: '' })
    setSelectedPerson(null)
    fetchData()
  }

  const handleClickDelete = async () => {
    if (!selectedPerson) {
      alert('select a person from the list')
      return
    }
    await personService.remove(selectedPerson?.id)
    setPerson({ name: '', number: '' })
    setSelectedPerson(null)
    fetchData()
  }

  const handleClickPerson = (person) => {
    if (selectedPerson) {
      if (selectedPerson.id === person.id) {
        setSelectedPerson(null)
        setPerson({ name: '', number: '' })
        return
      }
    }

    setSelectedPerson(person)
    setPerson({ name: person.name, number: person.number })
  }

  return (
    <div className='p-6 flex flex-col items-center'>
      <h1 className='text-5xl font-semibold mb-10 text-center'>
        Phone directory
      </h1>

      <div className='flex flex-row justify-center gap-5 w-full mb-12'>
        <form onSubmit={handleSubmitPerson} className='w-fit flex flex-row gap-3'>
          <CustomInput name={'name'} value={person.name} placeholder={'Name'} handleChange={handleChangePerson} />
          <CustomInput name={'number'} value={person.number} placeholder={'Number'} handleChange={handleChangePerson} />
          <button type="submit" className='bg-slate-400 rounded-md px-3 text-white'>
            {selectedPerson ? 'Update' : 'Save'}
          </button>
        </form>
        <button type="button" onClick={handleClickDelete} className='bg-red-400 rounded-md px-3 text-white'>
          Remove
        </button>
      </div>

      <ul className='text-center flex flex-col gap-2 w-max mx-auto'>
        {persons.map(person =>
          <Person
            key={person.id}
            person={person}
            handleClick={() => handleClickPerson(person)}
            isSelected={selectedPerson?.id === person.id}
          />
        )}
      </ul>
    </div>
  )
}

export default App
