import Redis from "ioredis"
import "dotenv/config"

const redis = new Redis(process.env.REDIS_URL, {
    tls: {
        rejectUnauthorized: false
    },
    maxRetriesPerRequest: null
})

redis.once("connect", () => {
    console.log("Redis Connected Successfully")
})

redis.on("error", (err) => {
    if (err.code !== 'ECONNRESET' && err.message !== 'read ECONNRESET') {
        console.log("Redis Connection Error:", err.message)
    }
})

export default redis