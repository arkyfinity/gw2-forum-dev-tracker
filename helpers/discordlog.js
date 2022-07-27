/* eslint-disable prefer-template */
/* eslint-disable quotes */
import axios from 'axios'

export const discordlog = (file, postmessage) => {
    axios({
        method: 'POST',
        url: 'https://discord.com/api/webhooks/794541748793507851/FakL6x7d3Hvi2NZW6abAl4aNt-5iaDER_azF1_xq3X_KwBAZLs-l053ZHbctKpf104q9',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "content": "**" + file + "**\n```bash\n" + postmessage + "\n```"
        }
    })
}

export default discordlog
