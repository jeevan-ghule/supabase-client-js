// Use the JS library to create a bucket.

let { supabase } = require('./config')
let { signIn, signUp } = require('./login')
let { decode } = require('base64-arraybuffer')
const fs = require('fs').promises;


async function createBucket(bucketName) {
    const { data, error } = await supabase.storage.createBucket(bucketName)

    if (error) {
        console.error(error)
    } else {
        console.log("createBucket data =", data)
    }
}

async function getBucket(bucketName) {
    const { data, error } = await supabase
        .storage
        .getBucket(bucketName)

    if (error) {
        console.error(error)
    } else {
        console.log("getBucket data =", data)
    }
}

async function uploadFile(bucketName) {


    const contents = await fs.readFile('/Users/jeevanghule/Documents/supabase/supabase-client/supabase/img.jpg', { encoding: 'base64' });
    console.log("contents =", contents)
    const { data, error } = await supabase
        .storage
        .from(bucketName)
        .upload('theMann.jpg', decode(contents), {
            contentType: 'image/jpeg',
            cacheControl: "public, max-age=31536000",
            upsert: true
        })

    if (error) {
        console.error("error", error)
    } else {
        console.log("uploadFile data =", data)
    }
}

async function main() {
    let email = 'g1ghule@gmail.com'
    let password = '234567890'
    // await signUp(email, password)
    await signIn(email, password)

    // set create policies first
    // let bucketName = 'supabase-test-bucket'
    // await createBucket(bucketName)

    // await getBucket(bucketName)


    // await uploadFile(bucketName)
}

main()