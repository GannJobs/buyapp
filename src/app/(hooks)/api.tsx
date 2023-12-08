import axios from "axios";

export function config(){
  const token = localStorage.getItem("token");
  if (!token) {
      throw new Error("Token not found in local storage");
  }

  const config = {
    headers: {
      Authorization: `token ${token}`, // Replace 'token' with your actual token value
      'Content-Type': 'application/json', // Set the content type to JSON
    },
  };
  return config
}

export function apiGET(url: string) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token not found in local storage");
    }

    return axios.get(url, {
        headers: {
            Authorization: `token ${token}`,
        },
    });
}

export function apiPOST(url: string) {
  const token = localStorage.getItem("token");
  if (!token) {
      throw new Error("Token not found in local storage");
  }

  return axios.post(url, null, {
      headers: {
          Authorization: `token ${token}`,
      },
  });
}


export function apiUpdate(url: string, dataToUpdate: any) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found in local storage");
    }
  
    return axios.patch(url, {...dataToUpdate}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
  }