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
        console.log("insetBook data =", data)
    }
}

async function getAuthors() {
    let { data: authors, error } = await supabase
        .from('author')
        .select(`*`)

    if (error) {
        console.error(error)
    } else {
        console.log("author =", authors)
    }
}

async function insetBook(name, genre, authorId) {
    const { data, error } = await supabase
        .from('book')
        .insert([
            { name: name, genre: genre, author_id: authorId }
        ])

    if (error) {
        console.error(error)
    } else {
        console.log("insetBook data =", data)
    }
}

async function getBooks() {
    let { data: profiles, error } = await supabase
        .from('book')
        .select(`id,name ,genre, Author:author_id ( name,age )`)

    if (error) {
        console.error(error)
    } else {
        console.log("Books =", profiles)
    }
}

async function updateBook(name, id) {
    let { data, error } = await supabase
        .from('book')
        .update({ name: name })
        .match({ id: id })

    if (error) {
        console.error(error)
    } else {
        console.log("updateBook =", data)
    }
}


async function updateAuthor(name, id) {
    let { data, error } = await supabase
        .from('author')
        .update({ name: name })
        .match({ id: id })

    if (error) {
        console.error(error)
    } else {
        console.log("Author =", data)
    }
}

async function deleteBook(id) {
    const { data, error } = await supabase
        .from('book')
        .delete()
        .match({ id: id })

    if (error) {
        console.error(error)
    } else {
        console.log("deleteBook =", data)
    }
}

async function deleteAuthor(id) {
    const { data, error } = await supabase
        .from('author')
        .delete()
        .match({ id: id })

    if (error) {
        console.error(error)
    } else {
        console.log("deleteBook =", data)
    }
}


async function main() {
    let email = 'jeevan@gmail.com'
    let password = '234567890'
    await signUp(email, password)
    await signIn(email, password)

    await insetAuthors(supabase.auth.user().id, "jeevan", 30)
    await getAuthors()
    await insetBook("The Book", "Drama", supabase.auth.user().id)
    await getBooks()

    // await updateBook("New Book", 2)
    // await updateAuthor("Ne", "77fadea7-c635-4ac8-aff5-24a9d21786e6")
    // await deleteBook(4)
    // await deleteAuthor(5)



}

main()