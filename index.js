import fs from 'fs'
import Parser from 'rss-parser'
import axios from 'axios'
import { discordlog } from './helpers/discordlog.js'

const parser = new Parser()

const rawData = fs.readFileSync('feed.json')
const siteData = JSON.parse(rawData)

const memberID = process.env.memberID
const token = process.env.token
const discordUrl = process.env.discordUrl

if (!memberID || !token) {
    discordlog('gw2-dev-tracker', 'Invalid ID or token')
    process.exitCode = 1
    throw new Error('Invalid ID or token')
}

if(!discordUrl) {
    discordlog('gw2-dev-tracker', 'Invalid Discord webhook URL')
    process.exitCode = 1
    throw new Error('Invalid Discord webhook URL')
}

const unixifyDate = (date) => {
    if(date)
        return Math.round(new Date(date).getTime() / 1000)
    else
        return ''
}

setInterval(async () => {
    try {
        const feed = await parser.parseURL(`https://en-forum.guildwars2.com/discover/6.xml/?member=${memberID}&key=${token}`)

        if(feed && feed.items) {
            feed.items.forEach((item) => {
                const itemID = item.link

                if(!siteData.itemID) {
                    axios({
                        method: 'POST',
                        url: discordUrl,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {
                            "content": '**Guild Wars 2 Forums - Dev Tracker**',
                            "embeds": [{
                                "title": item.title,
                                "description": item.description,
                                "color": 16711680,
                                "fields": [{
                                    "name": "Date:",
                                    "value": item.pubDate ? "<t:" + unixifyDate(item.pubDate) + ":D>" : ""
                                }]
                            }]
                        }
                    })
                    .catch((error) => {
                        discordlog('gw2-dev-tracker discord error', error)
                    })

                    siteData[itemID] = {
                        'published': true
                    }

                    discordlog('gw2-dev-tracker', 'feed updated')
                }
            })
            fs.writeFileSync('feed.json', JSON.stringify(siteData))
        } else {
            discordlog('gw2-dev-tracker', 'feed empty')
        }
    } catch(error) {
        discordlog('gw2-dev-tracker fetch', error)
    }
}, 900000)
