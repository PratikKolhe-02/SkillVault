import Redis from "ioredis"
import "dotenv/config"

const redisUrl = process.env.REDIS_URL


const isSecure = redisUrl.startsWith("rediss://")

const redisConfig = {
    maxRetriesPerRequest: null
}


if (isSecure) {
    redisConfig.tls = {
        rejectUnauthorized: false
    }
} else {
    
    redisConfig.family = 4
}

const redis = new Redis(redisUrl, redisConfig)

redis.once("connect", () => {
    console.log("Redis Connected Successfully")
})

redis.on("error", (err) => {
    if (err.code !== 'ECONNRESET' && err.message !== 'read ECONNRESET') {
        console.log("Redis Connection Error:", err.message)
    }
})

export default redis