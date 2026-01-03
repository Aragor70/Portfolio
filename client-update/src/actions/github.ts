import axios from "axios";

import { GiRepoType } from "../types/Github";

export const getAllRepos = async () => {
    const password = '';
    const options = {
        headers: {
            "Authorization": 'Token ' + password
        }
    }
    
    const repos = await axios.get('https://api.github.com/users/Aragor70/repos', options)
    
    if (!repos?.data?.length) return;
    console.log(repos)
    
    let extended_repos: any[] = [];
    
    await Promise.all(repos?.data?.map(async (element: { name: string }) => {
        try {
            const res1 = await axios.get('https://api.github.com/repos/Aragor70/' + element.name + '/commits?page=1&per_page=100', options)
            const res2 = await axios.get('https://api.github.com/repos/Aragor70/' + element.name + '/commits?page=2&per_page=100', options)
            const res = await res1?.data?.concat(res2?.data)
            console.log(res)
            extended_repos = [...extended_repos, {...element, commits: res}]
        } catch (err) {
            console.log(err.message)
        }
        
    }))
    return extended_repos;
}