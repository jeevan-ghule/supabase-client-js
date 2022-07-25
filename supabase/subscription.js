let { supabase } = require('./config')
let { signIn, signUp } = require('./login')

async function insetAuthors(id, name, age) {
    const { data, error } = await supabase
        .from('author')
        .insert([
            { id: id, name: name, age: age }
        ])

    if (error) {
        console.error(error)
    } else {
        console.log("inset Author data =", data)
    }
}

async function subscribeAuthorForInsert() {
    const mySubscription = supabase
        .from('author')
        .on('INSERT', payload => {
            console.log('Author Change received!', payload)
        })
        .subscribe()

    console.log('Subscribed', mySubscription)
}


async function subscribeBookForInsert() {
    const mySubscription = supabase
        .from('book')
        .on('INSERT', payload => {
            console.log('Book Change received!', payload)
        })
        .subscribe()

    console.log('Subscribed', mySubscription)
}

async function insetBook(author_id, name, genre) {
    const { data, error } = await supabase
        .from('book')
        .insert([
            { name: name, genre: genre, author_id: author_id }
        ])

    if (error) {
        console.error(error)
    } else {
        console.log("insetBook data =", data)
    }
}

async function main() {
    let email = 'g1ghule@gmail.com'
    let password = '234567890'
    await signUp(email, password)
    await signIn(email, password)
    await subscribeAuthorForInsert()
    await subscribeBookForInsert()

    setTimeout(() => { insetAuthors(supabase.auth.user().id, "jeevan", 30) }, 2000)
    setTimeout(() => { insetBook(supabase.auth.user().id, "jeevan book", 'Drama') },
        4000)

}

main()