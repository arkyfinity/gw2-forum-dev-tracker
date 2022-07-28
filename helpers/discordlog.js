/* eslint-disable prefer-template */
/* eslint-disable quotes */
import axios from 'axios'

export const discordlog = (file, postmessage) => {
    axios({
        method: 'POST',
        url: process.env.discordlog,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "content": "**" + file + "**\n```bash\n" + postmessage + "\n```"
        }
    })
}

export default discordlog
