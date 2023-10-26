const URL = 'http://localhost:3000/api';

//GET all the listed services
async function getServices() {
  const response = await fetch(URL + '/services');
  const services = await response.json();
  if (response.ok) {
    return services.map((x) => ({
      code: x.code,
      label: x.label,
      description: x.description
    }))
  } else {
    throw services;
  }
}

// POST a new Ticket
function createTicket(code) {
  return new Promise((resolve, reject) => {
    fetch(URL + `/services/${code}/queue`, { // call to /api/services/<code>/queue
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        response.json() // json response
          .then((data) => {
            const ticket = {
              id: data.id,
              serviceCode: data.serviceCode,
              creationDate: data.creationDate
            };
            resolve(ticket);
          })
          .catch(() => {
            reject({ error: "Cannot parse server response." });
          });
      } else {
        response.json()
          .then((message) => { reject(message); })
          .catch(() => { reject({ error: "Cannot parse server response." }) });
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

//GET all the listed counters
async function getCounters() {
  const response = await fetch(URL + '/counters');
  const counters = await response.json();
  if (response.ok) {
    return counters.map((c) => ({
      id: c.id,
      available: c.available,
    }))
  } else {
    throw counters;
  }
}

//POST to call next customer
async function callCustomer(counterId) {
  const response = await fetch(URL + `/counters/${counterId}/request-customer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const ticket = await response.json();
  if (response.ok) {
    return {
      id: ticket.id,
      serviceCode: ticket.serviceCode,
      creationDate: ticket.creationDate
    }
  } else {
    throw ticket;
  }
}

const API = {
  createTicket, getServices, getCounters, callCustomer
};
export default API;
