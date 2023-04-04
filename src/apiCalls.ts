export const apiCalls = {
    getUser (url: string) {
        return (
            fetch(`${url}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error fetching user data: ${response.statusText}`);
                }
                return response.json();
            })
        )
    },
    getScholarships () {
        return (
            fetch("https://college-fund-mock-data-api.herokuapp.com/scholarships")
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return new Error("Trouble fetching form-filtered scholarships")
                }
            })
        )
    },
    getSaved () {
        return (
            fetch("https://college-fund-mock-data-api.herokuapp.com/favorites")
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return new Error("Trouble fetching saved scholarships")
                }
            })
        )
    },
    addSavedScholarship (userID: string, scholarshipID: string) {
        return (
            fetch(`/api/v1/users/${userID}/scholarships/${scholarshipID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
              })
                .then(response => {
                    if(!response.ok) {
                        return new Error("Trouble adding to saved")
                    }
                    return response.json()
                })
        )
    },
    deleteSavedScholarship (userID: string, scholarshipID: string) {
        return (
            fetch(`/api/v1/users/${userID}/scholarships/${scholarshipID}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Something went wrong')
                  } 
                  return response.json()
                })
        )
    }
}