
const baseUrl = "https://grant-guru-be.herokuapp.com/"
export const apiCalls = {
    
    getScholarships (url :string) {
        return (
            fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return new Error("Trouble fetching form-filtered scholarships")
                }
            })
        )
    },
    getSaved (userId: string) {
        return (
            fetch(`${baseUrl}api/v1/users/${userId}/favorites`)
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
            fetch(`${baseUrl}api/v1/users/${userID}/scholarships/${scholarshipID}`, {
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
            fetch(`${baseUrl}api/v1/users/${userID}/scholarships/${scholarshipID}`, {
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