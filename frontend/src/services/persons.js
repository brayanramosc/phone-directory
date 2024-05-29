const BASE_URL = '/api/persons';

const getAll = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    return data;
}

const create = async (person) => {
    const req = await fetch(
        BASE_URL,
        {
            method: 'POST',
            body: JSON.stringify(person),
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    const res = await req.json()
    return res
}

const update = async (person) => {
    const req = await fetch(
        BASE_URL,
        {
            method: 'PUT',
            body: JSON.stringify(person),
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
}

const remove = async (id) => {
    await fetch(
        BASE_URL + `/${id}`,
        {
            method: 'DELETE'
        }
    )
}

export default { getAll, create, remove, update }
